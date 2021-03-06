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
CultivoClass.prototype.Promedio = function() {
  var suma = this.Moistures[0]+this.Moistures[1]+this.Moistures[2]+this.Moistures[3];
  return suma/4;
}
CultivoClass.prototype.saveDataBase = function(){
    Cultivo.insert({
    createdAt: new Date(),
    Moistures: this.Moistures,
    Temperature: this.Temperature
    });

}
var cul = new CultivoClass();
Meteor.startup(function () {
  console.log('server is ready !');
  Cultivo.remove({});

  board.on("ready", Meteor.bindEnvironment(function() {
    var Valvula = new five.Relay(12);
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
    var jo = 700;
    Meteor.setInterval(function(){
      for(i=0;i<Moistures.length;i++){cul.setMoisture(i,Moistures_values[i]);}
      cul.setTemperature(Temperature_value);
      var lo ="";
      for(i=0;i<cul.tamMoisture();i++){lo+=cul.getMoisture(i)+",";}
      console.log(lo+cul.getTemperature());
      cul.saveDataBase();
      console.log(cul.Promedio());

      if(cul.Promedio()<=300){
        if(!Valvula.isOn){
          Valvula.on();
          Meteor.setTimeout(function() {
            Valvula.off();
          }, 10000);
        }
      }
      },1000);
    }));

});
