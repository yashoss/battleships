var Board = require('./board.js');
var keypress = require('keypress');

class Player{

  constructor(name, board, ships){
    this.board = board;
    this.ships = ships;
    this.name = name;

  }

  rotateShip1(boardCopy, ship, player, key){
    if(key.name === 'return') {
      //call moveShip
      process.stdin.pause();
      player.rotateShip(boardCopy, ship.length - 2, player, player.moveShip)
    }else if(key.name === 'v'){
      //make ship vertical
      if(ship.direction === "hor"){
        ship.direction = "vert";
        for(let i=1; i<ship.length; ++i){
          boardCopy.grid[i][0] = boardCopy.grid[0][i];
          boardCopy.grid[0][i] = player.board.grid[0][i];
          ship.segments[i].pos = [i, 0];
        }
        clearConsole();
        boardCopy.printBoard();
      }else{
        //do nothing
      }
    }else if(key.name === 'h'){
      //make ship horizontal
      if(ship.direction === "vert"){
        ship.direction = "hor";
        for(let i=1; i<ship.length; ++i){
          boardCopy.grid[0][i] = boardCopy.grid[i][0];
          boardCopy.grid[i][0] = player.board.grid[i][0];
          ship.segments[i].pos = [0, i];
        }
        clearConsole();
        boardCopy.printBoard();
      }else{
        //do nothing
      }
    }else{
      console.log("Invalid key");
    }
  }

  rotateShip(boardCopy, shipIdx, player, cb){
    if(shipIdx > player.ships.length){
      console.log("next function")
      return null;
    }
    let ship = this.ships[shipIdx];
    clearConsole();
    if(cb === player.rotateShip1){
      for(let j in ship.segments){
        let segment = ship.segments[j];
        let pos = segment.pos;
        boardCopy.grid[0][j] = segment;
      }
      console.log("Pres 'h' to make ship horizontal.");
      console.log("Pres 'v' to make ship vertical.");
      console.log("Pres 'enter' to confirm direction.");
    }else{
      console.log("Use the arrow keys to move your ship.");
      console.log("Press 'enter' to confirm.")
    }
    boardCopy.printBoard();
    keypress(process.stdin);
    process.stdin.on('keypress', function (ch, key) {
      cb(boardCopy, ship, player, key);
    });
      process.stdin.setRawMode(true);
      process.stdin.resume();
  }

  moveShip(boardCopy, ship, player, key){
      // console.log('got "keypress"', key);
      if (key.name === 'return') {
        //check overlap of segments, place ship, update actual board, get next ship
        process.stdin.pause();
        console.log("placed")
        player.board = boardCopy;
        player.board.printBoard();
        player.rotateShip(boardCopy, ship.length - 1, player, player.moveShip)
        return null;
      }else if(key.name === 'right' && ship.segments[ship.length - 1].pos[1] < player.board.size - 1){
        //increment segment right then reprint board
        //replace spaces that were moved with those from original board
        for(let i in ship.segments){
          //start from last segment
          console.log(i);
          let segment = ship.segments[ship.length - i - 1];
          let temp = [segment.pos[0], segment.pos[1]];
          segment.pos[1] += 1;
          boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
          boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
        }
        clearConsole();
        boardCopy.printBoard();
      }else if(key.name === 'left' && ship.segments[0].pos[1] > 0){
        //increment segments left then reprint board
        //replace spaces that were moved with those from original board
        for(let i in ship.segments){
          let segment = ship.segments[i];
          let temp = [segment.pos[0], segment.pos[1]];
          segment.pos[1] -= 1;
          boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
          boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
        }
        clearConsole();
        boardCopy.printBoard();
      }else if(key.name === 'down' && ship.segments[ship.length -1].pos[0] < player.board.size - 1){
        //increment segments down then reprint board
        //replace spaces that were moved with those from original board
        for(let i in ship.segments){
          //start from last segment
          let segment = ship.segments[ship.length - i - 1];
          let temp = [segment.pos[0], segment.pos[1]];
          segment.pos[0] += 1;
          boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
          boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
        }
        clearConsole();
        boardCopy.printBoard();
      }else if(key.name === 'up' && ship.segments[0].pos[0] > 0){
        //increment segments up then reprint board
        //replace spaces that were moved with those from original board
        for(let i in ship.segments){
          //start from last segment
          let segment = ship.segments[i];
          let temp = [segment.pos[0], segment.pos[1]];
          segment.pos[0] -= 1;
          boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
          boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
        }
        clearConsole();
        boardCopy.printBoard();
      }else{
        console.log('These ships are missing that control!')
        //reprint board
      };

  }

  // placeShips(){
  //   let boardCopy = this.board.cloneBoard(new Board(this.board.size));
  //   console.log(boardCopy);
  //   for(let i in this.ships){
  //     let ship = this.ships[i];
  //     for(let j in ship.segments){
  //       let segment = ship.segments[j];
  //       let pos = segment.pos;
  //       boardCopy.grid[pos[0]][pos[1]] = ship.segments[j];
  //     }
  //     // listen for the "keypress" event
  //     boardCopy.printBoard();
  //     boardCopy = function moveShipCB(boardCopy, ship);
  //   }
  // }
  //
  // moveShip(board, ship){
  // let ship = this.ships[shipIdx];
  // clearConsole();
  // console.log("Use the arrow keys to move your ship.");
  // console.log("Press 'enter' to confirm.")
  // boardCopy.printBoard();
  // keypress(process.stdin);
  // process.stdin.on('keypress', function (ch, key) {
  //   // console.log('got "keypress"', key);
  //   if (key.name === 'return') {
  //     //check overlap of segments, place ship, update actual board, get next ship
  //     process.stdin.pause();
  //     console.log("placed")
  //     this.board = boardCopy;
  //     this.board.printBoard();
  //   }else if(key.name === 'right' && ship.segments[ship.length - 1].pos[1] < player.board.size - 1){
  //     //increment segment right then reprint board
  //     //replace spaces that were moved with those from original board
  //     for(let i in ship.segments){
  //       //start from last segment
  //       console.log(i);
  //       let segment = ship.segments[ship.length - i - 1];
  //       let temp = segment.pos;
  //       segment.pos[1] += 1;
  //       boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
  //       boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
  //     }
  //     clearConsole();
  //     boardCopy.printBoard();
  //   }else if(key.name === 'left' && ship.segments[0].pos[1] > 0){
  //     //increment segments left then reprint board
  //     //replace spaces that were moved with those from original board
  //     for(let i in ship.segments){
  //       let segment = ship.segments[i];
  //       let temp = segment.pos;
  //       segment.pos[1] -= 1;
  //       boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
  //       boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
  //     }
  //     clearConsole();
  //     boardCopy.printBoard();
  //   }else if(key.name === 'down' && ship.segments[ship.length -1].pos[0] < player.board.size - 1){
  //     //increment segments down then reprint board
  //     //replace spaces that were moved with those from original board
  //     for(let i in ship.segments){
  //       //start from last segment
  //       let segment = ship.segments[ship.length - i - 1];
  //       let temp = segment.pos;
  //       segment.pos[0] += 1;
  //       boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
  //       boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
  //     }
  //     clearConsole();
  //     boardCopy.printBoard();
  //   }else if(key.name === 'up' && ship.segments[0].pos[0] > 0){
  //     //increment segments up then reprint board
  //     //replace spaces that were moved with those from original board
  //     for(let i in ship.segments){
  //       //start from last segment
  //       let segment = ship.segments[i];
  //       let temp = segment.pos;
  //       segment.pos[0] -= 1;
  //       boardCopy.grid[segment.pos[0]][segment.pos[1]] = segment;
  //       boardCopy.grid[temp[0]][temp[1]] = player.board.grid[temp[0]][temp[1]];
  //     }
  //     clearConsole();
  //     boardCopy.printBoard();
  //   }else{
  //     console.log('These ships are missing that control!')
  //     //reprint board
  //   }});
  //
  // process.stdin.setRawMode(true);
  // process.stdin.resume();
  // }


}

function clearConsole(){
  //Moves console view up
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}

module.exports = Player;
