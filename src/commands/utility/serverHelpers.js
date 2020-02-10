const { exec } = require('child_process');
const opn = require('opn');
const path = require('path');
const PATH_TO_SERVER = path.join(__dirname, '../../server/server.js');
const PORT = '3333';
const chalk = require('chalk');
const openServer = (serverPath = PATH_TO_SERVER, port = PORT) => {
  console.log(chalk.cyan.bold("firing up"));
  exec(`node ${serverPath}`);
  opn(`http://localhost:${port}`)
}
exec(`echo hello`);
console.log(chalk.magenta.bold.underline("sup"));

module.exports = {
  openServer,
  PORT,
}
