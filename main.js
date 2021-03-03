#!/usr/bin/node
/**
 * This script will generate an i3bar
 */

const date = require('./src/date');

console.log('{ "version": 1, "click_events": true }');

console.log("[");

console.log("[],");

async function barGenerator() {
	console.log(
		`[
			${await require('./src/ip')},
			${date()},
			${await require('./src/battery')}
		],`
	);
}

setInterval(barGenerator, 1000);
