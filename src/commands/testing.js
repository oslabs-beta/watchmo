const { exec } = require('child_process');
const path = require('path');
const TEST_PATH = path.join(__dirname, '../../../__test__/cli.test.js');

function testing() {
  console.log("TESTING...");
  exec(`npm test`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  })
}

module.exports = {
  testing
};
