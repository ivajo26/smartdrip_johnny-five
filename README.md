# IrriDrip

Automated irrigation system drip and monitoring from node js with Raspberry Pi and Arduino.

### Hardware
- Raspberry Pi
  - WiFi USB adapter
- Arduino
  - Soil moisture sensor
  - Solenoid
  - Electric water pump
  - Temperature sensor

### Software dependencies
- Firmata (Arduino)
- Nodejs
  - Meteor (App Platform)
  - Jhonny-five
  - Serial-port

## Getting started

The first thing we need to do is flash an Arduino board with the Firmata protocol. For this "project" we use a Standard Firmata.

In src/sketch.ino is the file ready for upload to the board. To archive this yo can use the ino command line tool.

#### Install the Arduino IDE

Yo can installed with `yum` or `apt-get`.

```bash
$ sudo apt-get install arduino
```

#### Install picocom

The `picocom` command line tool will helps us with serial communication.


```bash
$ wget https://picocom.googlecode.com/files/picocom-1.7.tar.gz
$ tar -xvzf picocom-1.7.tar.gz
$ cd picocom-1.7
$ sudo make
$ sudo make install

```

Once you installed all the dependencies above, install `ino` using `pip` or `easy_install`


```bash
$ pip install ino
```

#### Setting up your board

Edit the file `ino.ini` with the specs of your board and the serial port.

```yaml
[build]
board-model = mega2560

[upload]
board-model = mega2560
serial-port = /dev/ttyACM0

[serial]
serial-port = /dev/ttyACM0

```

#### Installing the Firmata protocol

Build the file in `src/sketch.ino`

```bash
$ ino build
```

Upload

```bash
$ ino upload
```

#### Installing the node modules and run app

Connect the arduino then run:

```bash
$ meteor
```
Create by Ivajo26
