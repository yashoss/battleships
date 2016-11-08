var Board = require('./board.js');
var readlineSync = require('readline-sync');
var alphanumeric = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9}
class Player{

  constructor(name, board, ships){
    this.board = board;
    this.ships = ships;
    this.name = name;
    this.guesses = [];
  }

  placeShips(player){
    let board = this.board;
    let boardCopy;
    for(let shipIdx = 0; shipIdx < this.ships.length; ++shipIdx ){
      let ship = this.ships[shipIdx];
      boardCopy = board.cloneBoard(new Board(board.size))
      for(let j in ship.segments){
        let segment = ship.segments[j];
        let pos = segment.pos;
        boardCopy.grid[0][j] = segment;
      }
      clearConsole();
      boardCopy.printBoard();
      let headCoords = player.getCoords(player, ship, boardCopy, "head", board);
      let options = player.shipOptions(headCoords, ship, board, boardCopy);
      console.log("Here are possible orientations of your ship.")
      boardCopy.printBoard();
      let valid = false;
      let tailCoords;
      while(!valid){
        tailCoords = player.getCoords(player, ship, boardCopy, "tail", board);
        for(let i=0; i < options.length; ++i){
          if(tailCoords[0] === options[i][0] && tailCoords[1] === options[i][1]){
            valid = true;
            break;
          }
        }
      }
      player.addShip(ship, board, headCoords, tailCoords);

    }

  }

  addShip(ship, board, headCoords, tailCoords){
    if(headCoords[0] > tailCoords[0]){
      for(let i=0; i<ship.length; ++i){
        board.grid[headCoords[0]-i][headCoords[1]] = ship.segments[i];
      }
    }else if(headCoords[0] < tailCoords[0]){
      for(let i=0; i<ship.length; ++i){
        board.grid[headCoords[0]+i][headCoords[1]] = ship.segments[i];
      }
    }else if(headCoords[1] > tailCoords[1]){
      for(let i=0; i<ship.length; ++i){
        board.grid[headCoords[0]][headCoords[1]-i] = ship.segments[i];
      }
    }else if(headCoords[1] < tailCoords[1]){
      for(let i=0; i<ship.length; ++i){
        board.grid[headCoords[0]][headCoords[1]+i] = ship.segments[i];
      }
    }
  }

  shipOptions(coords, ship, board, boardCopy){
    let up = true;
    let down = true;
    let left = true;
    let right = true;
    for(let i = 0; i < ship.length; ++i){
      boardCopy.grid[0][i] = board.grid[0][i];
    }
    for(let i = 1; i < ship.length; ++i){
      if(coords[1] + i >= boardCopy.size || boardCopy.grid[coords[0]][coords[1] + i] !== false){
        right = false;
      }
      if(coords[1] - i < 0 || boardCopy.grid[coords[0]][coords[1] - i] !== false){
        left = false;
      }
      if(coords[0] + i >= boardCopy.size || boardCopy.grid[coords[0] + i][coords[1]] !== false){
        down = false;
      }
      if(coords[0] - i < 0 || boardCopy.grid[coords[0] - i][coords[1]] !== false){
        up = false;
      }
    }
    let j;
    let valid = [];
    if(right){
      for(j=0; j < ship.length; ++j){
        boardCopy.grid[coords[0]][coords[1] + j] = ship.segments[j];
      }
      valid.push([coords[0], coords[1] + (j-1)]);
    }
    if(left){
      for(j=0; j < ship.length; ++j){
        boardCopy.grid[coords[0]][coords[1] - j] = ship.segments[j];
      }
      valid.push([coords[0], coords[1] - (j-1)]);
    }
    if(down){
      for(j=0; j < ship.length; ++j){
        boardCopy.grid[coords[0] + j][coords[1]] = ship.segments[j];
      }
      valid.push([coords[0] + (j-1), coords[1]]);
    }
    if(up){
      for(j=0; j < ship.length; ++j){
        boardCopy.grid[coords[0] - j][coords[1]] = ship.segments[j];
      }
      valid.push([coords[0] - (j-1), coords[1]]);
    }
    return valid;
  }

  getCoords(player, ship, boardCopy, str, board){
    let inputString = readlineSync.question("Please enter coordinates for the " + str + " of your ship(e.g. A3): ").toLowerCase();
    while(!(player.checkInput(inputString, ship, boardCopy, board)) ){
      inputString = readlineSync.question("Please enter valid coordinates for the " + str + " of your ship(e.g. A3): ").toLowerCase();
    }
    let coords = [Number(inputString[1]), alphanumeric[inputString[0]]];
    return coords;
  }

  checkInput(input, ship, boardCopy, board){
    if(input.length < 2){
      return false;
    }
    let inputCode = input[0].charCodeAt(0);
    if(input.length == 2 && inputCode >= "a".charCodeAt(0) && inputCode <= Math.floor(this.board.size - 1) + "a".charCodeAt(0) ){
      if(Number(input[1]) >= 0 && Number(input[1]) < this.board.size){
        let coords = [Number(input[1]), alphanumeric[input[0]]];
        for(let i=0; i<ship.length; ++i){
          if((coords[1] + i >= board.size || board.grid[coords[0]][coords[1] + i] !== false) &&
              (coords[1] - i < 0 || board.grid[coords[0]][coords[1] - i] !== false) &&
                (coords[0] + i >= board.size || board.grid[coords[0] + i][coords[1]] !== false) &&
                  (coords[0] - i < 0 || board.grid[coords[0] - i][coords[1]] !== false)){
                    return false;
                  }
        }
        return true;
      }
    }
    return false;
  }

  checkGuess(guess){
    if(guess.length < 2){
      return false;
    }
    let guessCode = guess[0].charCodeAt(0);
    let coords = [Number(guess[1]), alphanumeric[guess[0]]];
    //check if already guessed
    for(let i=0; i < this.guesses.length; ++i){
      if(this.guesses[i][0] === coords[0] && this.guesses[i][1] === coords[1]){
        return false;
      }
    }
    //Check if valid guess and return coordinates
    if(guess.length === 2 && guessCode >= "a".charCodeAt(0) && guessCode <= Math.floor(this.board.size - 1) + "a".charCodeAt(0) ){
      if(Number(guess[1]) >= 0 && Number(guess[1]) < this.board.size){
        return coords;
      }
    }
    return false;
  }

  getGuess(){
    let guess = this.checkGuess(readlineSync.question("Enter coordinates to guess: ").toLowerCase());

    while(!guess){
      guess = this.checkGuess(readlineSync.question("Out of bounds or already guessed! Try again: ").toLowerCase());
    }
    this.guesses.push(guess);
    return guess;
  }

  markBoard(coords, board, ships){
    let tile = board.grid[coords[0]][coords[1]];
    if(tile === false){
      tile = true;
      return "was a miss!";
    }else{
      tile.hit = true;
      if(ships[Number(tile.symbol) - 2].checkSunk()){
        return "sunk ship " + tile.symbol + "!";
      }
      return "was a hit!"
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

module.exports = Player;
