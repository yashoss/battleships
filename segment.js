class ShipSegment{
  constructor(sym, y){
    this.hit = false;
    this.symbol = sym.toString();
    this.pos = [0, y];
  }

  cloneSegment(){
    let clone = new ShipSegment(this.pos[0], this.pos[1]);
    return clone;
  }
}

module.exports = ShipSegment;
