Sensor = new Mongo.Collection("hola");


Meteor.startup(function () {
  console.log('server is ready !');

  // // Global API configuration
  //   var Api = new Restivus({
  //     useDefaultAuth: true,
  //     prettyJson: true
  //   });
  // Api.addCollection(Sensor);
  // Api.addRoute('prueba', {authRequired: false}, {
  //   get:function () {
  //     return Sensor.find({}).count();
  //   }
  // });
  // // Llamamos libreria e iniicamos la conexcion con el arduino
  // var five =  Meteor.npmRequire('johnny-five'),
  //     board = new five.Board();
  //
  // board.on("ready", function() {
  //   //Iniciamos los sensores
  //   var sensor = new five.Sensor("A0");
  //   // Detectamos los cambios del sensor
  //   sensor.on("change", function() {
  //     console.log(this.value);
  // });
  // });
});
