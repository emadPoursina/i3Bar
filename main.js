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
			${require('./src/date')}
		],`
	);
}

setInterval(barGenerator, 1000);