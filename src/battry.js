const { exec } = require('shelljs');

function acpi() {
  return new Promise((resolve, reject) => {
    exec('acpi', { silent: true }, (code, output, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else{
        const battery = batteryGenerator(output);
      }
    });
  })
}

/**
 * Transfare acpi output to a javascript object
 * @param {String} acpiOutput 
 */
function batteryGenerator(acpiOutput) {
  const info = acpiOutput.substring(acpiOutput.indexOf(':') + 2).split(', ');
  return {
    name: acpiOutput.substring(0, acpiOutput.indexOf(':')),
    status: info[0],
    remainingPercentage: info[1],
    remainingTime: info[2],
  };
}

module.exports = acpi();