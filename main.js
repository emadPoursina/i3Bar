const { exec } = require("child_process");
const { finished } = require("stream");
 
const videoPath = "/tmp/x/";

function shell(command) {
	return new Promise((resolve, reject) => {
		exec(command, (err, result) => { resolve(result); reject(new Error(err)); });
	});
}

async function battryGenerator() {
	let battryO = await shell("acpi");
	battryO = battryO.split(",");
	battryO[0] = battryO[0].slice(11);
	battryO[1] = battryO[1].trim().substring(0, battryO[1].indexOf("%"));
	battryO[2] = battryO[2].trim();

	const battry = {
		status: battryO[0],
		percentage: battryO[1],
		remainingTime: battryO[2],
	}

	const final = {
		name: "Battry",
		full_text: `Battry: ${battry.percentage} : ${battry.status}`,
	};

	if(battry.percentage.substring(0, 2) < 15){
		final.urgent = true;
	}else if(battry.status == "Charging") {
		final.color = "#2cfc03";
	}

	return final;
}

console.log('{ "version": 1 }');
console.log("[");
console.log("[],");

setInterval(async () => {
	const battry = await battryGenerator();

	console.log(`[${JSON.stringify(battry)}],`);
}, 1000);
