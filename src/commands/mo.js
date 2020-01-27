//Packages
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const { DEMARCATION } = require('./watch');
const { PORT } = require('../server/server');

// function mo () { //this will run npm run dev, good for development, bad for production
//   const output = exec('npm run dev', { encoding: 'utf-8' });
// }

//dataString is a string of JSON objects separated by DEMARCATION (a stylized WM right now)
function parseDataFileAndSave(dataString, savePath) {
  // splits the responses, excluding empty strings
  let responses = dataString.split(DEMARCATION).filter(str => str);
  const parsed = {};
  let jsonResponse;

  // build the parsed object to be saved with the structure the frontend requires
  responses.forEach((response) => {
    jsonResponse = JSON.parse(response);
    if (!parsed[jsonResponse.category]) {
      parsed[jsonResponse.category] = [jsonResponse.data];
    } else {
      parsed[jsonResponse.category].push(jsonResponse.data);
    }
  })

  fs.writeFile(savePath, JSON.stringify(parsed), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA BUNDLED');
    }
  })
}

function mo(dataPath, savePath) {

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error trying to grab raw Data:', err);
    } else {
      parseDataFileAndSave(data, savePath);
    }
  })
  const directory = path.join(__dirname, '../server/server.js');
  exec(`node ${directory}`, { encoding: 'utf-8'});
  opn(`http://localhost:${PORT}`);
}

module.exports = { mo };
