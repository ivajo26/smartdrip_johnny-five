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
