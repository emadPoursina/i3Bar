#!/usr/bin/node
/**
 * This script will generate an i3bar
 */

const date = require('./src/date');

console.log("{ \"version\": 1 }");

console.log("[");

console.log("[],");

async function barGenerator() {
	console.log(
		`[
			${await require('./src/ip')},
			${date()},
			${await require('./src/battery')},
			${await require('./src/cpu')}
		],`
	);
}

setInterval(barGenerator, 1000);