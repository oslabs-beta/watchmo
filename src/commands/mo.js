//Packages
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const { DEMARCATION } = require('./watch');

// function mo () { //this will run npm run dev, good for development, bad for production
//   const output = execSync('npm run dev', { encoding: 'utf-8' });
// }

//dataString is a string of JSON objects separated by DEMARCATION (a stylized WM right now)
function parseDataFileAndSave(dataString, savePath) {
  let responses = dataString.split(DEMARCATION);
  const parsed = {};
  let jsonResponse;

  // build the parsed object to be saved with the structure the frontend requires
  responses = responses.forEach((response) => {
    jsonResponse = JSON.parse(response);
    console.log(jsonResponse);
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
  // fs.copyFile(`${process.cwd()}/src/server/server.js`, `${process.cwd()}/src/server/test-server.js`, err => {
  //   if (err) console.log(err);
  //   console.log('Watchmo server firing up....listening on port 3333');
  //   let directory = path.join(__dirname, '../server/server.js')
  //   opn('http://localhost:3333/');
  //   const output = execSync(`node ${directory}`, { encoding: 'utf-8' });
  // })
}

module.exports = { mo };
