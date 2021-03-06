var powerMotorLeft  = brick.motor("M1");
var powerMotorRight = brick.motor("M4");
var motorHandUpDown = brick.motor("M2");
var handServo       = brick.motor("E1");

gamepad.pad.connect(
  function(padId, x, y) {
    if (padId == 1) {
      if (y > 30) {
        motorHandUpDown.setPower((y - 30) * 100 / 70);
      } else if (y < -30) {
        motorHandUpDown.setPower((y + 30) * 100 / 70);
      } else {
        handServo.setPower(x);
      }
    }

    if (padId == 2) {
      powerMotorLeft.setPower(y+x);
      powerMotorRight.setPower(y-x);
    }
  }
)

gamepad.padUp.connect(
  function(padId, x, y) {
    if (padId == 1) {
      motorHandUpDown.powerOff();
      handServo.powerOff();
    } else if (padId == 2) {
      powerMotorLeft.powerOff();
      powerMotorRight.powerOff();
    }
  }
)

gamepad.button.connect(
  function(buttonId, pressed) {
    switch (buttonId) {
      case 1: {
        brick.say("Hello, i am TRIK");
        break;
      }
      case 2: {
        brick.sadSmile();
        script.wait(2000);
        brick.smile();
        break;
      }
      /*
      case 3: {
        print("pew");
      	script.system("/etc/init.d/mjpg-streamer-ov7670.sh stop");
      	script.wait(3000);
      	script.system("/etc/init.d/mjpg-encoder-ov7670.sh stop");
        print("streamer stoped");
	      break;
	    }
      case 4: {
      	script.system("/etc/init.d/mjpg-streamer-ov7670.sh stop");
      	script.wait(3000);
      	script.system("/etc/init.d/mjpg-encoder-ov7670.sh stop");
	script.wait(3000);
        brick.lineSensor().init(true); 
        print("edge line sensor started");
        break;
      }
      */
      case 5: {
        brick.stop(); 
        script.wait(3000);
      	script.system("/etc/init.d/mjpg-streamer-ov7670.sh restart");
      	script.wait(3000);
      	script.system("/etc/init.d/mjpg-streamer-ov7670.sh restart");
      	print("mjpeg streamer started")
        break;
        
      }
      default: break;
    }
  }
)

script.system("/etc/init.d/mjpg-encoder-ov7670.sh restart");
script.wait(3000);
script.system("/etc/init.d/mjpg-streamer-ov7670.sh restart");
script.run();
