const { exec } = require('child_process');

function tester() {
  exec('npm test', (err, stdout, stderr) => console.log(stderr));
}

module.exports = {
  tester
};