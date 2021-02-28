const { exec } = require('shelljs');

function acpi() {
  return new Promise((resolve, reject) => {
    exec('acpi', { silent: true }, (code, output, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else{
      }
    });
  })
}

module.exports = acpi();