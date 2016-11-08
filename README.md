#Battleships

Battleships written using JS/Node.js runs in the console.

## Instructions
1. Change to battleships directory
2. run: npm install (or sudo npm install)
3. run: node battleships.js

## Rules

* Two player game of battleships
* Select grid size for your board
  * Smaller grid sizes result in faster games
* # of ships = 1/2 the grid size (rounded down)
* Each player takes turns placing all of their ships on their board
  * There is a buffer screen to ensure the other player cannot see your board, so
  only hit "enter" when ready
* Starting with player one, each player guesses a tile to attack
  * Players can "hit", "miss", "sink", or "win" on any given turns
  * A "hit" or "sink" results in the player taking another turns
* Again be weary of buffer screens that tell you whose turn it is. (Don't want cheaters)
* Players can see the result of their guess on a "guesses board" as well as the condition
of their own ships on their own board
  * On the guesses board:
    * A blank tile = not guessed yet
    * "X" = a hit ship
    * "O" = a missed shot


* The winner is announced once a player has sunk all of their opponents battleships!
And both players' boards are displayed.
