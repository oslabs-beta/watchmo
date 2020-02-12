const {
  dataPaths,
  checkAndParseFile,
  writeJSON,
} = require('./utility/fileHelpers');
const fs = require('fs');
const chalk = require('chalk');

/*
Default behavior: builds directory '/watchmoData/[projectName]'
  and copies config file to '/watchmoData/[projectName]/config.json'
*/

function configure(projectName) {
  const { projectPath, configPath, templatePath, projectNamesPath } = dataPaths(projectName);
  const projectNamesArray = checkAndParseFile(projectNamesPath);

  const addProjectName = () => {
    projectNamesArray.push(projectName);
    writeJSON(projectNamesPath, projectNamesArray);
  }

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, (err) => console.log(err));
    fs.copyFileSync(templatePath, configPath);
    console.log(`Project ${projectName} initialized.`);
    addProjectName();
  } else {
    console.log(chalk.yellow.underline.bold('Project already exists.'));
  }
}

module.exports = {
  configure
}
