var ShipSegment = require('./segment.js');

class Ship{
  constructor(length){
      this.length = length;
      this.direction = "hor";
      this.sunk = false;
      this.segments = [];
      this.symbol = "";
      for(let i=0; i<this.length; ++i){
        this.symbol += length.toString();
        this.segments.push(new ShipSegment(length))
      }
  }

  checkSunk(){
    //All segments hit?
    for(let i=0; i<this.length; ++i){
      if(this.segments[i].hit === false){
        return false;
      }
    }
    this.sunk = true;
    return true;
  }

}

module.exports = Ship;
