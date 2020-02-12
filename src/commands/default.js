// STILL IN DEVELOPMENT, NOT FOR PRODUCTION
const chalk = require('chalk');

function cliDefault() {
  console.log(chalk.red.bold(`               _       _    ___  ___      `));
  console.log(chalk.yellow.bold(`              | |     | |   |  \\/  |      `));
  console.log(chalk.green.bold(`__      ____ _| |_ ___| |__ | .  . | ___  `));
  console.log(chalk.blue.bold("\\ \\ /\\ / / _` | __/ __| '_ \\| |\\/| |/ _ \\ "));
  console.log(chalk.cyan.bold(` \\ V  V / (_| | || (__| | | | |  | | (_) |`));
  console.log(chalk.magenta.bold(`  \\_/\\_/ \\__,_|\\__\\___|_| |_\\_|  |_/\\___/ `));
  console.log("                              ")
}

module.exports = { cliDefault };
