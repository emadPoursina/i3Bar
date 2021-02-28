const { exec } = require('shelljs');

function ipMaker() {
  return new Promise((resolve, reject) => {
    exec('hostname -I', { silent: true }, (code, stdout, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else
        resolve(i3Object(stdout));
    });
  })
}

/**
 * Return an i3 bar json string
 * @param {String} stdout 
 */
function i3Object(stdout) {
  const i3Object = {
    name: "localIpAddressV4", 
    full_text: "iPv4: " + stdout.trim(),
  };

  return JSON.stringify(i3Object);
}

module.exports = ipMaker();