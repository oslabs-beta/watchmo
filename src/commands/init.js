#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/*
When run on the command line with the current working directory as the first argument, init should build the necessary file structure:
  /watchmo
  |
  |-> /watchmo.config.js
  |-> /snapshots
*/


function init() {
  const workingFilePath = process.cwd();
  const watchmoFilePath = __dirname;

  // only run if init has not been run already
  if (!fs.existsSync(path.join(workingFilePath, '/watchmo'))) {

    //building the file structure from template
    fs.mkdirSync(path.join(workingFilePath, '/watchmo'));
    fs.mkdirSync(path.join(workingFilePath, '/watchmo/snapshots'))
    fs.copyFile(
      path.join(watchmoFilePath, './templates/watchmo.config.js'),
      path.join(workingFilePath, '/watchmo/watchmo.config.js'),
      (err) => {
        if (err) {
          console.log(err);
          throw(err);
        }
      }
    );
  }
}

module.exports = { init };
