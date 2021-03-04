#!/usr/bin/node
/**
 * This script will generate an i3bar
 */


const date = require('./src/date');
const battery = require('./src/battery');
require('./src/click');

console.log('{ "version": 1, "click_events": true }');

console.log("[");

console.log("[],");

async function bargenerator() {
	console.log(
		`[
			${await require('./src/ip')},
			${date()},
			${await battery()},
			{
				"name": "changebackground", 
				"full_text": "😈Change Background"
			}
		],`
	);
}

setInterval(bargenerator, 1000);
