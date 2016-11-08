var ShipSegment = require('./segment.js');

class Ship{
  constructor(length){
      this.length = length;
      this.direction = "hor";
      this.sunk = false;
      this.segments = [];
      for(let i=0; i<this.length; ++i){
        this.segments.push(new ShipSegment(length))
      }
  }

  checkSunk(){
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
