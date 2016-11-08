const colors = require('colors');
var clearConsole = require('./clear_console.js');

class Board{
  //initialize size of board
  constructor(s = 10, ships){
    this.size = s;
    this.grid = new Array(this.size);
    this.populateGrid();
  }

  //Create a grid with sizexsize matrix with false values
  populateGrid(){
    for(let i=0; i<this.size; ++i){
      this.grid[i]=new Array(this.size);
    }
    for(let i=0; i<this.size; ++i){
      for(let j=0; j<this.size; ++j){
        this.grid[i][j] = false;
      }
    }
  }

  //Copy the board to prevent mutability of original board
  cloneBoard(newBoard){
    for(let i=0; i<this.size; ++i){
      for(let j=0; j<this.size; ++j){
        if (!this.grid[i][j]){
          newBoard.grid[i][j] = false;
        }else{
          newBoard.grid[i][j] = this.grid[i][j]
        }
      }
    }
    newBoard.ships = this.ships;
    return newBoard;
  }

  //Print current player's board to console
  printBoard(){
    //Prints the top of the grid
    let top = "   |";
    for(let i=0; i<this.size; ++i){
      top += " " + String.fromCharCode("A".charCodeAt(0) + i) + " |";
    }
    console.log(top.bgBlue.underline);

    //Print the rest of the rows of the grid
    //O = miss,  X = hit, # = symbol
    let row;
    for(let i=0; i<this.size; ++i){
      row = " " + i.toString() + " |";
      for(let j=0; j<this.size; ++j){
        if (!this.grid[i][j]){
          row += "   |";
        }else if(this.grid[i][j] === true){
          row += " O |";
        }else if(this.grid[i][j].hit){
          row += " X |";
        }else{
          row += " " + this.grid[i][j].symbol + " |";
        }
      }
      console.log(row.bgBlue.underline);
    }
  }

  //Print the guessed board
  printGuessBoard(){
    let top = "   |";
    for(let i=0; i<this.size; ++i){
      top += " " + String.fromCharCode("A".charCodeAt(0) + i) + " |";
    }
    console.log(top.bgBlue.underline);

    let row;
    for(let i=0; i<this.size; ++i){
      row = " " + i.toString() + " |";
      for(let j=0; j<this.size; ++j){
        if (this.grid[i][j] === true){
          row += " O |";
        }else if(this.grid[i][j].hit){
          row += " X |";
        }else{
          row += "   |";
        }
      }
      console.log(row.bgBlue.underline);
    }

  }


}


module.exports = Board;
