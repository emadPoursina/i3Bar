const { exec } = require('shelljs');

function acpi() {
  return new Promise((resolve, reject) => {
    exec('acpi', { silent: true }, (code, output, stderr) => {
      if(code !== 0){
        console.log(stderr);
        reject(code);
      }else{
        const battery = batteryGenerator(output);

				resolve(i3Object(battery));
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
    full_text: `${battery.status} ${battery.remainingPercentage.trim()}`,
  };

  if(battery.status === 'Charging')
    i3Object.full_text += ' ' + battery.remainingTime.substring(0, 8);

  const battPer = parseInt(battery.remainingPercentage.substring(0, battery.remainingPercentage.indexOf('%')));
  if(battery.status === 'Charging'){
		i3Object.color = '#00FF00';
	}else if(battPer < 15){
    exec('notify-send -u critical "Connect the charger!!"')
    i3Object.urgent = true;
  }

  return JSON.stringify(i3Object);
}

module.exports = acpi();
