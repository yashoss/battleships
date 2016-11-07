var readlineSync = require('readline-sync');
var Ship = require('./ship.js');
var Player = require('./player.js');
var Board = require('./board.js');
var Segment = require('./segment.js');

function play(){
  let player1;
  let player2;
  const ships1 = [];
  const ships2 = [];

  var BOARD_SIZE = readlineSync.questionInt('How big do you want your board(4-10)? ');
  while(!(BOARD_SIZE >= 4 && BOARD_SIZE <= 10)  ){
    console.log("Please enter a number between 4 and 10.")
    BOARD_SIZE = readlineSync.questionInt('How big do you want your board(4-10)? ');
  }
  const NUM_SHIPS = Math.floor(BOARD_SIZE/2);
  for(let i=0; i<NUM_SHIPS; ++i){
    ships1.push(new Ship(i + 2));
    ships2.push(new Ship(i + 2));
  }

  player1 = new Player("p1", new Board(BOARD_SIZE, ships1), ships1);
  player2 = new Player("p2", new Board(BOARD_SIZE, ships2), ships2);
  readlineSync.question(player1.name + "'s turn to place ships on the board. Press 'enter' when ready.");
  player1.placeShips(player1);

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
