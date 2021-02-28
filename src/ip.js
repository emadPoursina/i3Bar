const { exec } = require('shelljs');

function ipMaker() {
  return new Promise((resolve, reject) => {
    exec('hostname -I', { silent: true }, (code, stdout, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else
        resolve(stdout.trim());
    });
  })
}

module.exports = ipMaker;