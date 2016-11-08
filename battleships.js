var readlineSync = require('readline-sync');
var Ship = require('./lib/ship.js');
var Player = require('./lib/player.js');
var Board = require('./lib/board.js');
var Segment = require('./lib/segment.js');
var clearConsole = require('./lib/clear_console.js')

function play(){
  //Instantiate player variables and ships array
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
  //Create players (name, board, and ships)
  let name1 = readlineSync.question('Player 1 what is your name? ');
  let name2 = readlineSync.question('Player 2 what is your name? ');
  player1 = new Player(name1, new Board(BOARD_SIZE), ships1);
  player2 = new Player(name2, new Board(BOARD_SIZE), ships2);
  clearConsole();
  console.log("There are " + NUM_SHIPS + " ships to sink.");
  for(let i=0; i<NUM_SHIPS; ++i){
    console.log("Ship " + (i + 1) +": length = " + (i + 2) + " symbol = " + ships1[i].symbol);
  }
  //Set up board
  readlineSync.question(player1.name + "'s turn to place ships on the board. Press 'enter' when ready.");
  player1.placeShips(player1);
  clearConsole();
  console.log("There are " + NUM_SHIPS + " ships to sink.");
  for(let i=0; i<NUM_SHIPS; ++i){
    console.log("Ship " + (i + 1) +": length = " + (i + 2) + " symbol = " + ships1[i].symbol);
  }
  readlineSync.question(player2.name + "'s turn to place ships on the board. Press 'enter' when ready.");
  player2.placeShips(player2);
  clearConsole();
  //Begin guessing
  battle(player1, player2);

}

function battle(player1, player2){
  //Instantiate variables
  let winner = null;
  let currentPlayer = player1;
  let nextPlayer = player2;
  let status;
  let guess;
  while(!winner){
    //Prevent cheating
    readlineSync.question(currentPlayer.name+ "'s turn to fire a guess. Press 'enter' when ready.");
    clearConsole();
    //Print game boards
    console.log("X = hit, O = miss");
    console.log("Your Guesses: ");
    nextPlayer.board.printGuessBoard();
    console.log("Your ships: ")
    currentPlayer.board.printBoard();
    console.log("")
    guess = currentPlayer.getGuess();
    status = nextPlayer.markBoard(guess, nextPlayer.board, nextPlayer.ships);
    clearConsole();
    //Updated guesses + status of guess
    nextPlayer.board.printGuessBoard();
    console.log("That guess " + status);
    if(status === "was a miss!"){
      //Next players turn
      let temp = currentPlayer;
      currentPlayer = nextPlayer;
      nextPlayer = temp;
    }else{
      //check if won
      winner = checkWin(currentPlayer, nextPlayer);
    }
  }
  //Print end results of match
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

play();
