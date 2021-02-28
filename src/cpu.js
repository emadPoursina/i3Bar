const { exec } = require('shelljs');

function cpuMaker() {
  return new Promise((resolve, reject) => {
    exec("df -H / | awk '{print $4}' | grep G", { silent: true }, (code, stdout, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else
        resolve(i3Object(stdout.trim()));
    });
  })
}

/**
 * Return an i3 bar json string
 * @param {String} stdout 
 */
function i3Object(stdout) {
  const i3Object = {
    name: "cupUsage", 
    full_text: "CPU: " + stdout
  };

  return JSON.stringify(i3Object);
}

module.exports = cpuMaker();