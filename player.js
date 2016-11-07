var Board = require('./board.js');
var readlineSync = require('readline-sync');
var alphanumeric = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9}
class Player{

  constructor(name, board, ships){
    this.board = board;
    this.ships = ships;
    this.name = name;

  }

  placeShips(player){
    let board = this.board;
    let boardCopy = board.cloneBoard(new Board(board.size));
    for(let shipIdx = 0; shipIdx < this.ships.length; ++shipIdx ){
      let ship = this.ships[shipIdx];
      for(let j in ship.segments){
        let segment = ship.segments[j];
        let pos = segment.pos;
        boardCopy.grid[0][j] = segment;
      }
      boardCopy.printBoard();
      let coords = player.getCoords(player, ship, boardCopy, "head");
      player.shipOptions(coords, ship, board, boardCopy);
      boardCopy.printBoard();
      let coords = player.getCoords(player, ship, boardCopy, "tail");
    }

  }

  shipOptions(coords, ship, board, boardCopy){
    let up = true;
    let down = true;
    let left = true;
    let right = true;
    for(let i in ship.segments){
      boardCopy[0][i] = board[0][i];
      if(coords[1] + i > boardCopy.size || boardCopy.grid[coords[0]][coords[1] + i] != false){
        right = false;
      }
      if(coords[1] - i < 0 || boardCopy.grid[coords[0]][coords[1] - i] != false){
        left = false;
      }
      if(coords[0] + i > boardCopy.size || boardCopy.grid[coords[0] + i][coords[1]] != false){
        down = false;
      }
      if(coords[0] - i < 0 || boardCopy.grid[coords[0] - i][coords[1]] != false){
        up = false;
      }
    }
    if(right){
      for(let j in ship.segments){
        boardCopy[coords[0]][coords[1] + j] = ship.segments[j]
      }
    }
    if(left){
      for(let j in ship.segments){
        boardCopy[coords[0]][coords[1] - j] = ship.segments[j]
      }
    }
    if(down){
      for(let j in ship.segments){
        boardCopy[coords[0] + j][coords[1]] = ship.segments[j]
      }
    }
    if(up){
      for(let j in ship.segments){
        boardCopy[coords[0] - j][coords[1]] = ship.segments[j]
      }
    }
  }

  getCoords(player, ship, boardCopy, str){
    let inputString = readlineSync.question("Please enter coordinates for the" + str + "of your ship(e.g. A3): ");
    console.log(inputString);
    inputString = inputString.toLowerCase();
    while(!(player.checkInput(inputString, ship)) ){
      inputString = readlineSync.question("Please enter valid coordinates for the" + str + "of your ship(e.g. A3): ").toLowerCase();
    }
    let coords = [Number(inputString[1]), alphanumeric[inputString[0]]];
    return coords;
  }

  checkInput(input, ship, boardCopy){
    let inputCode = input[0].charCodeAt(0);
    if(input.length == 2 && inputCode >= "a".charCodeAt(0) && inputCode <= Math.floor(this.board.size - 1) + "a".charCodeAt(0) ){
      if(Number(input[1]) >= 0 && Number(input[1]) < this.board.size){
        let coords = [Number(input[1]), alphanumeric[input[0]]];
        for(let i in ship.segments){
          if((coords[1] + i > boardCopy.size || boardCopy.grid[coords[0]][coords[1] + i] != false) &&
              (coords[1] - i < 0 || boardCopy.grid[coords[0]][coords[1] - i] != false) &&
                (coords[0] + i > boardCopy.size || boardCopy.grid[coords[0] + i][coords[1]] != false) &&
                  (coords[0] - i < 0 || boardCopy.grid[coords[0] - i][coords[1]] != false)){
                    return false;
                  }
        }
        return true;
      }
    }
    return false;
  }


}

function clearConsole(){
  //Moves console view up
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}

module.exports = Player;
