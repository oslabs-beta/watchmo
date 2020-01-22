#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


//make dir if it exists
// if (!fs.existsSync(path.join(process.argv[2], '/watchmo')) {
//   fs.mkdirSync(path.join(process.argv[2], '/watchmo'));
//   fs.appendFileSync(path.join(process.argv[2], '/watchmo/watchmo.config'), 'testing');
// }

// checking if init has already been run
if (!fs.existsSync(path.join(process.argv[2], '/watchmo'))) {
  fs.mkdirSync(path.join(process.argv[2], '/watchmo'));
  fs.copyFile(
    path.join(__dirname, './templates/watchmo.config.js'),
    path.join(process.argv[2], '/watchmo/watchmo.config.js'),
    (err) => {
      if (err) {
        console.log(err);
        console.log(__dirname);
      } else {
        console.log('config file created in new directory "watchmo"');
      }
    }
  );
}
