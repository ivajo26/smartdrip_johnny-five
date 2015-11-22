var five =  Meteor.npmRequire('johnny-five'),
    board = new five.Board();

function cultivo(mois1,mois2,mois3,mois4,temp){

  this.temp  = new five.Temperature({controller: "LM35",pin: "A4"});
  this.Mois = [];
  this.Temp=0;
  this.mois1.on("change",function() {Mois[0]=this.value;});
  this.mois2.on("change",function() {Mois[1]=this.value;});
  this.mois3.on("change",function() {Mois[2]=this.value;});
  this.mois4.on("change",function() {Mois[3]=this.value;});
  this.temp.on("data",function(){Temp=this.celsius;});

}

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
  board.on("ready", function() {

    //Iniciamos la configuracion del sensor de temperatura y guardamos su valor en variable temporal.
    var Temperature  = new five.Temperature({controller: "LM35",pin: "A4"});
    var Temperature_value;
    Temperature.on("data",function(){Temperature_value=this.celsius;});

    //Iniciamos las configuraciones de los sensores de humedad y guardamos sus lecturas
    var Moistures_pins = ["A0","A1","A2","A3"]
    var Moistures = [];
    var Moistures_values = [];

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

    setInterval(function(){console.log(Moistures_values[0]+","+Moistures_values[1]+","+Moistures_values[2]+","+Moistures_values[3]); },1000);
  });

});
