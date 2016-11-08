var readlineSync = require('readline-sync');
var Ship = require('./lib/ship.js');
var Player = require('./lib/player.js');
var Board = require('./lib/board.js');
var Segment = require('./lib/segment.js');

function play(){
  let player1;
  let player2;
  const ships1 = [];
  const ships2 = [];
  //Get board size from user and validate
  var BOARD_SIZE = readlineSync.questionInt('How big do you want your board(4-10)? ');
  while(!(BOARD_SIZE >= 4 && BOARD_SIZE <= 10)  ){
    console.log("Please enter a number between 4 and 10.")
    BOARD_SIZE = readlineSync.questionInt('How big do you want your board(4-10)? ');
  }
  //Create ships
  const NUM_SHIPS = Math.floor(BOARD_SIZE/2);
  for(let i=0; i<NUM_SHIPS; ++i){
    ships1.push(new Ship(i + 2));
    ships2.push(new Ship(i + 2));
  }
  //Create players (name, board, array or ships)
  let name1 = readlineSync.question('Player 1 what is your name? ');
  let name2 = readlineSync.question('Player 2 what is your name? ');
  player1 = new Player(name1, new Board(BOARD_SIZE), ships1);
  player2 = new Player("p2", new Board(BOARD_SIZE), ships2);
  clearConsole();
  console.log("There are " + NUM_SHIPS + " ships to sink.");
  //Set up board
  readlineSync.question(player1.name + "'s turn to place ships on the board. Press 'enter' when ready.");
  player1.placeShips(player1);
  clearConsole();
  console.log("There are " + NUM_SHIPS + " ships to sink.");
  readlineSync.question(player2.name + "'s turn to place ships on the board. Press 'enter' when ready.");
  player2.placeShips(player2);
  clearConsole();
  //Begin guessing
  battle(player1, player2);

}

function battle(player1, player2){
  let winner = null;
  let currentPlayer = player1;
  let nextPlayer = player2;
  let status;
  let guess;
  while(!winner){
    readlineSync.question(currentPlayer.name+ "'s turn to fire a guess. Press 'enter' when ready.");
    clearConsole();
    console.log("X = hit, O = miss");
    console.log("Your Guesses: ");
    nextPlayer.board.printGuessBoard();
    console.log("Your ships: ")
    currentPlayer.board.printBoard();
    console.log("")
    guess = currentPlayer.getGuess();
    status = nextPlayer.markBoard(guess, nextPlayer.board, nextPlayer.ships);
    clearConsole();
    nextPlayer.board.printGuessBoard();
    console.log("That guess " + status);
    if(status === "was a miss!"){
      //Next players turn
      let temp = currentPlayer;
      currentPlayer = nextPlayer;
      nextPlayer = temp;
    }else{
      winner = checkWin(currentPlayer, nextPlayer);
    }
  }
  console.log("Final Boards:");
  console.log(player1.name + "'s ships");
  player1.board.printBoard();
  console.log(player2.name + "'s ships");
  player2.board.printBoard();
  console.log("Congratulations " + winner.name + " you won!")
}

function checkWin(currentPlayer, nextPlayer){
  for(let i=0; i<nextPlayer.ships.length; ++i){
    if(!nextPlayer.ships[i].sunk){
      return null;
    }
  }
  return currentPlayer;
}

function clearConsole(){
  //Moves console view up
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}


play();
