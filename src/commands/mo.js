//Packages
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const { DEMARCATION } = require('./watch');
// const { PORT } = require('../server/server');

// function mo () { //this will run npm run dev, good for development, bad for production
//   const output = exec('npm run dev', { encoding: 'utf-8' });
// }

function saveParsed(parsedData, savePath) {
  fs.writeFile(savePath, JSON.stringify(parsedData), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA BUNDLED');
    }
  });
}

//dataString is a string of JSON objects separated by DEMARCATION (a stylized WM right now)
function parseData(dataString) {
  let categoricalResponses = dataString.split(DEMARCATION).filter(str => str);
  const parsed = {};
  categoricalResponses.forEach(catRes => {
    let parsedRes = JSON.parse(catRes);
    let category = parsedRes.category;
    if (!parsed[category]) {
      parsed[category] = {};
    }
    parsedRes.data.forEach(queryData => {
      let { timestamp, query, response, timing } = queryData;
      if (!parsed[category][query]) {
        parsed[category][query] = [{ timestamp, response, timing }];
      } else {
        parsed[category][query].push({ timestamp, response, timing });
      }
    });
  });
  return parsed;
}

function mo(dataPath, savePath, shouldOpen, noBundle = false) {
  if (!noBundle) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error trying to grab raw Data:', err);
      } else {
        saveParsed(parseData(data), savePath);
      }
    });
  }
  if (shouldOpen) {
    let directory = path.join(__dirname, '../server/server.js');
    exec(`node ${directory}`, { encoding: 'utf-8' });
    opn('http://localhost:3333/');
  }
}

module.exports = { mo };
