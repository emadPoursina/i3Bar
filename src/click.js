const readline = require('readline');
const logFile = require('fs').createWriteStream('/home/emad/NodeTown/i3Bar/log');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});
let flag = false;

rl.on('line', function(line){
  try {
    if(flag) {
      if(line[0] === ',')
        line = line.slice(1);
      const b = JSON.parse(line);
    }else {
      flag = true;
    }
  } catch (error) {
    logFile.write(error.toString());
  }
});