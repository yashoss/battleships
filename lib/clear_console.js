clearConsole = function(){
  //Moves console view up
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}

module.exports = clearConsole;
