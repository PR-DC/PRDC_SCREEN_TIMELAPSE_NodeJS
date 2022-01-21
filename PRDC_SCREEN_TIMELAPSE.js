/**
 * PRDC_SCREEN_TIMELAPSE - Screen Timelapse video recording
 * Author: Milos Petrasinovic <mpetrasinovic@pr-dc.com>
 * PR-DC, Republic of Serbia
 * info@pr-dc.com
 * 
 * --------------------
 * Copyright (C) 2022 PR-DC <info@pr-dc.com>
 *
 * This file is part of PRDC_SCREEN_TIMELAPSE.
 *
 * PRDC_SCREEN_TIMELAPSE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as 
 * published by the Free Software Foundation, either version 3 of the 
 * License, or (at your option) any later version.
 * 
 * PRDC_SCREEN_TIMELAPSE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with PRDC_SCREEN_TIMELAPSE.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

// Configuration
// --------------------
const dt = 30000;
const prefix = '';

// Main code
// --------------------
const screenshot = require('screenshot-desktop');
const preventSleep = require("node-prevent-sleep");

// Disables sleep
preventSleep.enable();

var loop;
var pause;
var i = 0;
showMessage('--- \x1b[33mPRDC_SCREEN_TIMELAPSE\x1b[0m ---');
showMessage('Screen recording started, press \x1b[31m[CTRL+P]\x1b[0m to pause!');
getScreenshot();
loop = setInterval(getScreenshot, dt);

function getScreenshot() {
  i = i+1;
  screenshot({ filename: 'frames/' + prefix + 'screenshot-' + i + '.jpg' })
      .then((imgPath) => {
    showMessage('New screenshot (number ' + i 
      + ') saved to: \x1b[32m' + imgPath + '\x1b[0m');
  });  
}

// Events
// --------------------

// On keypress
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'p') {
    if(pause) {
      pause = false;
      loop = setInterval(getScreenshot, dt);
      showMessage('Execution resumed, press \x1b[31m[CTRL+P]\x1b[0m to pause!');
    } else {
      pause = true;
      clearInterval(loop);
      showMessage('Execution paused, press \x1b[31m[CTRL+P]\x1b[0m to resume...');
    }
    
  }
});

// Functions
// --------------------

// getTimestamp() function
// Returns current timestamp in format HH:mm:SS.ms
// --------------------
function getTimestamp() {
  var date = new Date();
  var pad = function(num, size) { 
    return ('000' + num).slice(size * -1); 
  };
  var time = parseFloat(date.getTime()/1000).toFixed(3);
  var hours = date.getHours();
  var minutes = Math.floor(time / 60) % 60;
  var seconds = Math.floor(time - minutes * 60);
  var milliseconds = time.slice(-3);

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + 
    pad(seconds, 2) + '.' + pad(milliseconds, 3);
}

// showMessage() function
// Show message
// --------------------
function showMessage(msg) {
  console.log('\x1b[36m['+getTimestamp()+']\x1b[0m ' + msg);
}