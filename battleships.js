var readlineSync = require('readline-sync');
var keypress = require('keypress');
var Ship = require('./ship.js');
var Player = require('./player.js');
var Board = require('./board.js');
var Segment = require('./segment.js');

function play(){
  let player1;
  let player2;
  const ships1 = [];
  const ships2 = [];

  const BOARD_SIZE = readlineSync.questionInt('How big do you want your board(7-10)? ');
  const NUM_SHIPS = readlineSync.questionInt('How many ships do you want(1-5)? ');
  for(let i=0; i<NUM_SHIPS; ++i){
    ships1.push(new Ship(i + 2));
    ships2.push(new Ship(i + 2));
  }

  player1 = new Player("p1", new Board(BOARD_SIZE, ships1), ships1);
  player2 = new Player("p2", new Board(BOARD_SIZE, ships2), ships2);
  ship = new Ship(2);
  console.log(ship);
  // player1.board.printBoard();
  // player2.board.printBoard();
  player1.rotateShip(player1.board.cloneBoard(new Board(BOARD_SIZE)), 0, player1);

}

function placeShips(player){
  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    if (key.name == 'return') {
      process.stdin.pause();
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

}


play();
