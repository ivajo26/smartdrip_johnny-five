if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    console.log('server is ready !');
    // Llamamos libreria e iniicamos la conexcion con el arduino
    var five =  Meteor.npmRequire('johnny-five'),
        board = new five.Board();

    board.on("ready", function() {
      //Iniciamos los sensores
      var sensor = new five.Sensor("A0");
      // Detectamos los cambios del sensor
      sensor.on("change", function() {
        console.log(this.value);
      });
    });
  });
}
