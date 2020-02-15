const chalk = require('chalk');
const {
  dataPaths,
  checkAndParseFile,
} = require('./utility/fileHelpers');

function cliDefault(view) {
  console.log(chalk.red.bold(`               _       _    ___  ___      `));
  console.log(chalk.yellow.bold(`              | |     | |   |  \\/  |      `));
  console.log(chalk.green.bold(`__      ____ _| |_ ___| |__ | .  . | ___  `));
  console.log(chalk.blue.bold("\\ \\ /\\ / / _` | __/ __| '_ \\| |\\/| |/ _ \\ "));
  console.log(chalk.cyan.bold(` \\ V  V / (_| | || (__| | | | |  | | (_) |`));
  console.log(chalk.magenta.bold(`  \\_/\\_/ \\__,_|\\__\\___|_| |_\\_|  |_/\\___/ `));
  console.log("                              ")
  if (view) {
    const { projectNamesPath } = dataPaths('default');
    const projectNames = checkAndParseFile(projectNamesPath);
    console.log("Current Projects:");
    for (let name of projectNames) {
      console.log(`  ${name}`);
    }
  }
}

module.exports = { cliDefault };
