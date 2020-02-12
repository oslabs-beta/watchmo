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
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof endpoint === 'boolean') {
    console.log("The '--endpoint' option requires a positional argument.");
  } else {
    configObject.endpoint = endpoint;
    writeJSON(configPath, configObject);
  }
}

function changeCategory(projectName, category, remove=false) {
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof category === 'boolean') {
    console.log("The '--category' option requires a positional argument.");
  } else if (remove){
    if (configObject.categories[category] !== undefined) {
      delete configObject.categories[category];
      writeJSON(configPath, configObject);
    } else {
      console.log(`The category ${category} you are trying to remove does not exist`);
    }
  } else {
    if (configObject.categories[category] === undefined) {
      configObject.categories[category] = {
        queries:[],
        frequency: -1,
      };
      writeJSON(configPath, configObject);
    } else {
      console.log(`The category ${category} already exists`);
    }
  }
}

function changeQuery(projectName, category, query, remove=false) {
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof category === 'boolean' || typeof query === 'boolean') {
    console.log("The '--query' '--category' options both require a positional argument.");
  } else if (configObject.categories[category] === undefined){
    console.log(`The category ${category} does not exist`);
  } else if (!remove) {
    configObject.categories[category].queries.push(query);
    writeJSON(configPath, configObject);
  } else if (remove) {
    console.log("The CLI remove functionality for queries is not yet supported. Consider using the browser to remove queries.");
  }
}

function changeFrequency(projectName, frequency) {
  console.log("The CLI frequency functionality is not yet supported. Consider using the browser to change the frequency");
}

function configure(projectName, endpoint, frequency, category, query, remove=false) {
  // not an if-else block so that you can configure endpoint AND category/query all at once if desired
  // default behavior, create project with the given project Name
  if (!endpoint && !category && !frequency) { createProject(projectName); }
  if (endpoint) { changeEndpoint(projectName, endpoint); }
  if (category && !query) { changeCategory(projectName, category, remove); }
  if (category && query) { changeQuery(projectName, category, query, remove); }
  if (category && query && frequency) { changeFrequency(projectName, frequency); }
}


module.exports = {
  configure
}
