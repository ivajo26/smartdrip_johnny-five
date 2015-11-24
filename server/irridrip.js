var five =  Meteor.npmRequire('johnny-five'),
    board = new five.Board();


var CultivoClass = function (){
  this.Moistures = [];
  this.Temperature=0;
}

CultivoClass.prototype.setMoisture = function(pos,value) {this.Moistures[pos]=value;}
CultivoClass.prototype.getMoisture = function(pos) {return this.Moistures[pos];}
CultivoClass.prototype.tamMoisture = function() {return this.Moistures.length;}
CultivoClass.prototype.setTemperature = function (value) {this.Temperature = value;}
CultivoClass.prototype.getTemperature = function(value) {return this.Temperature;}
CultivoClass.prototype.saveDataBase = function(){
    Cultivo.insert({
    createdAt: new Date(),
    Moistures: this.Moistures,
    Temperature: this.Temperature
    });

}

var cul = new CultivoClass();
Cultivo.remove({});
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
  board.on("ready", Meteor.bindEnvironment(function() {

    //Iniciamos la configuracion del sensor de temperatura y guardamos su valor en variable temporal.
    var Temperature  = new five.Temperature({controller: "LM35",pin: "A4"});
    var Temperature_value=0;
    Temperature.on("data",function(){Temperature_value=this.celsius;});

    //Iniciamos las configuraciones de los sensores de humedad y guardamos sus lecturas
    var Moistures_pins = ["A0","A1","A2","A3"]
    var Moistures = [];
    var Moistures_values = [0,0,0,0];

    for(i=0;i<Moistures_pins.length;i++){
      Moistures[i] = new five.Sensor(Moistures_pins[i]);
    }

    Moistures[0].on("change", function(){
        Moistures_values[0]=this.value;
    });
    Moistures[1].on("change", function(){
        Moistures_values[1]=this.value;
    });
    Moistures[2].on("change", function(){
        Moistures_values[2]=this.value;
    });
    Moistures[3].on("change", function(){
        Moistures_values[3]=this.value;
    });

    Meteor.setInterval(function(){
      for(i=0;i<Moistures.length;i++){cul.setMoisture(i,Moistures_values[i]);}
      cul.setTemperature(Temperature_value);
      var lo ="";
      for(i=0;i<cul.tamMoisture();i++){lo+=cul.getMoisture(i)+",";}
      console.log(lo+cul.getTemperature());
      cul.saveDataBase();

      },1000);
    }));

});
