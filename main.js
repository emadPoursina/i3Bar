#!/usr/bin/node
/**
 * This script will generate an i3bar
 */

console.log("{ \"version\": 1 }");

console.log("[");

console.log("[],");

async function barGenerator() {
	console.log(
		`[
			${await require('./src/ip')},
			${require('./src/date')},
			${await require('./src/battery')},
			${await require('./src/cpu')}
		],`
	);
}

setInterval(barGenerator, 1000);