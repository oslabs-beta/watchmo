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

function createProject(projectName) {
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

function changeEndpoint(projectName, endpoint) {
  console.log("CHANGING ENDPOINT BEEP BOOP", projectName, endpoint);
}

function changeCategory(projectName, category, remove=false) {
  console.log("CHANGING CATEGORY BEEP BOOP", projectName, category);
}

function changeQuery(projectName, category, query, remove=false) {
  console.log("CHANGING QUERY BEEP BOOP", projectName, category, query);
}

function configure(projectName, endpoint, category, query, remove=false) {
  // not an if-else block so that you can configure endpoint AND category/query all at once if desired
  // default behavior, create project with the given project Name
  if (!endpoint && !category) { createProject(projectName); }
  if (endpoint) { changeEndpoint(projectName, endpoint); }
  if (category && !query) { changeCategory(projectName, category, remove); }
  if (category && query) { changeQuery(projectName, category, query, remove); }
}


module.exports = {
  configure
}
