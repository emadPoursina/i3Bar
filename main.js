#!/usr/bin/node
/**
 * This script will generate an i3bar
 */


const date = require('./src/date');
const battery = require('./src/battery');
const helper = require('./src/Helper');
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
				"full_text": "🌅"
			},
			${helper.simple('📕', 'uniCal')}
		],`
	);
}

setInterval(bargenerator, 1000);
