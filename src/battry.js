const { exec } = require('shelljs');

function acpi() {
  return new Promise((resolve, reject) => {
    exec('acpi', { silent: true }, (code, output, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else{
        const battery = batteryGenerator(output);

        // Extracting the \n form string
        resolve(i3Object(battery).slice(0, i3Object(battery).indexOf('\\')) + i3Object(battery).slice(i3Object(battery).indexOf('\\') + 2))
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

/**
 * Return an i3 bar json string
 * @param {Object} battery 
 */
function i3Object(battery) {
  const i3Object = {
    name: "battryStatus",
    full_text: `${battery.status} ${battery.remainingPercentage}`,
  };

  if(battery.status === 'Charging')
    i3Object.full_text += ' ' + battery.remainingTime.substring(0, 8);

  const battPer = parseInt(battery.remainingPercentage.substring(0, 2));
  if(battery.status === 'Charging')
    i3Object.background = 'green';
  else if(battPer < 15){
    exec('notify-send -u critical "Connect the charger!!"')
    i3Object.urgent = true;
  }

  return JSON.stringify(i3Object);
}

module.exports = acpi();