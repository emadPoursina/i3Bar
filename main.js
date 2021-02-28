/**
 * This script will generate an i3bar
 */

const { exec } = require("child_process");

function shell(command) {
	return new Promise((resolve, reject) => {
		exec(command, (err, result) => {
			if(err) {
				return reject(new Error(err));
			}
			return resolve(result);
		});
	});
}

console.log("{ \"version\": 1 }");

console.log("[");

console.log("[],");

async function barGenerator() {
	const ip = await shell("hostname -I");
	const date = await shell("date");
	const acpi = await shell("acpi");
	const sizeStorage = await shell("df -H / | awk '{print $4}' | grep G");
	const cpuUsage = await shell("mpstat  | awk '{print $4}' | awk 'NR==4'");
	hourlyReminder();

	console.log(
		`[
			{
				"name": "localIpAddressV4",
				"full_text": "iPv4: ${ip.trim()}"
			},
			{
				"name": "cpuUsage",
				"full_text": "CPU: ${cpuUsage.trim()}"
			},
			{
				"name": "battryStatus",
				"full_text": ": ${acpi.trim()}"
			},
			{
				"name": "sizeStorage",
				"full_text": "SDA: ${sizeStorage.trim()}"
			},
			{
				"name": "time",
				"full_text": "${date.trim()}"
			}
		],`
	);
}

function hourlyReminder(clock) {
	const d = new Date();
	//console.log(d.getMinutes());
	if(d.getMinutes() === '32'&& d.getSeconds() === '20'){
		const d = shell("notify-send -u critical \"Write your job report\"");
	}
}

setInterval(barGenerator, 1000);
