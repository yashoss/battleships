const colors = require('colors');

class Board{
  //initialize size of board
  constructor(s = 10, ships){
    this.size = s;
    this.ships = ships;
    this.grid = new Array(this.size);
    this.populateGrid();
  }

  populateGrid(){
    for(let i=0; i<this.size; ++i){
      this.grid[i]=new Array(this.size);
    }
    for(let i=0; i<this.size; ++i){
      for(let j=0; j<this.size; ++j){
        this.grid[i][j] = null;
      }
    }
  }

  cloneBoard(newBoard){
    for(let i=0; i<this.size; ++i){
      for(let j=0; j<this.size; ++j){
        if (this.grid[i][j] === null){
          newBoard.grid[i][j] = null;
        }else{
          newBoard.grid[i][j] = this.grid[i][j].cloneSegment()
        }
      }
    }
    newBoard.ships = this.ships;
    return newBoard;
  }

  //Print board to console
  printBoard(){
    //Prints the top of the grid
    let top = "   |";
    for(let i=0; i<this.size; ++i){
      top += " " + String.fromCharCode("A".charCodeAt(0) + i) + " |";
    }
    console.log(top.bgBlue.underline);

    //Print the rest of the rows of the grid
    let row;
    for(let i=0; i<this.size; ++i){
      row = " " + i.toString() + " |";
      for(let j=0; j<this.size; ++j){
        if (this.grid[i][j] === null){
          row += "   |";
        }else if(this.grid[i][j].hit){
          row += " X |";
        }else{
          row += " " + this.grid[i][j].symbol + " |";
        }
      }
      console.log(row.bgBlue.underline);
    }
  }


}

function clearConsole(){
  //Moves console view up
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}

module.exports = Board;
// board = new Board(10);
// clearConsole();
// board.printBoard();
// console.log("\n");
// board.printBoard();
