//Packages
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const opn = require('opn');


// function mo () { //this will run npm run dev, good for development, bad for production
//   const output = execSync('npm run dev', { encoding: 'utf-8' });
// }

function mo() {
  fs.copyFile(`${process.cwd()}/src/server/server.js`, `${process.cwd()}/src/server/test-server.js`, err => {
    if (err) console.log(err);
    console.log('Watchmo server firing up....listening on port 3333');
    let directory = path.join(__dirname, '../server/server.js')
    opn('http://localhost:3333/');
    const output = execSync(`node ${directory}`, { encoding: 'utf-8' });
  })
}

module.exports = { mo };