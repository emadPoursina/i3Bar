const readline = require('readline');
const logFile = require('fs').createWriteStream('/home/emad/NodeTown/i3Bar/log');
const { exec } = require('child_process');

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
      const { name } = JSON.parse(line);

      switch (name) {
        case 'changebackground':
          exec('find /home/emad/Pictures/Background/ | shuf -n1 | feh --bg-max -f-', { silent: true });
          break;
      }
    }else {
      flag = true;
    }
  } catch (error) {
    logFile.write(error.toString());
  }
});