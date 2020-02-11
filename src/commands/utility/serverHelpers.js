const { exec } = require('child_process');
const opn = require('opn');
const path = require('path');
const PATH_TO_SERVER = path.join(__dirname, '../../server/server.js');
const PORT = '3333';
const chalk = require('chalk');

const openServer = (serverPath = PATH_TO_SERVER, port = PORT) => {
  exec(`node ${serverPath}`);
  opn(`http://localhost:${port}`)
}

console.log(chalk.red.bold(`               _       _    ___  ___      `));
console.log(chalk.yellow.bold(`              | |     | |   |  \\/  |      `));
console.log(chalk.green.bold(`__      ____ _| |_ ___| |__ | .  . | ___  `));
console.log(chalk.blue.bold("\\ \\ /\\ / / _` | __/ __| '_ \\| |\\/| |/ _ \\ "));
console.log(chalk.cyan.bold(` \\ V  V / (_| | || (__| | | | |  | | (_) |`));
console.log(chalk.magenta.bold(`  \\_/\\_/ \\__,_|\\__\\___|_| |_\\_|  |_/\\___/ `));
console.log("                              ")


module.exports = {
  openServer,
  PORT,
}
