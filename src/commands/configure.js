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
    console.log(chalk.green.bold(`Project ${projectName} initialized.`));
    addProjectName();
  } else {
    console.log(chalk.yellow.underline.bold('Project already exists.'));
  }
}

function changeEndpoint(projectName, endpoint) {
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof endpoint === 'boolean') {
    console.log(chalk.yellow("The '--endpoint' option requires a positional argument."));
  } else {
    configObject.endpoint = endpoint;
    writeJSON(configPath, configObject);
  }
}

function changeCategory(projectName, category, remove = false) {
  console.log(chalk.blue("IN CHANGE CATEGORY"));
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof category === 'boolean') {
    console.log(chalk.yellow("The '--category' option requires a positional argument."));
  } else if (remove) {
    if (configObject.categories[category] !== undefined) {
      delete configObject.categories[category];
      writeJSON(configPath, configObject);
    } else {
      console.log(chalk.magenta(`The category ${category} you are trying to remove does not exist`));
    }
  } else {
    if (configObject.categories[category] === undefined) {
      configObject.categories[category] = {
        queries: [],
        frequency: -1,
      };
      writeJSON(configPath, configObject);
    } else {
      console.log(chalk.magenta(`The category ${category} already exists`));
    }
  }
}


// If remove is true, the query must be an integer. If false, it is a string
function changeQuery(projectName, category, query, remove = false) {
  console.log(chalk.blue("IN CHANGE QUERY"));
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (typeof category === 'boolean' || typeof query === 'boolean') {
    console.log(chalk.yellow("The '--query' '--category' options both require a positional argument."));
  } else if (configObject.categories[category] === undefined) {
    console.log(chalk.magenta(`The category ${category} does not exist`));
  } else if (!remove) {
    configObject.categories[category].queries.push(query);
    writeJSON(configPath, configObject);
  } else if (remove) {
    if (configObject.categories[category].queries[query] === undefined) {
      console.log(chalk.magenta("\nThe query specified does not exist. Please give an index corresponding to the appropriate query. \nRun 'watchmo configure [project name] --view' to view the configuration and query indices\n"));
    } else {
      configObject.categories[category].queries.splice(query, 1);
      writeJSON(configPath, configObject);
    }
  }
}

function changeFrequency(projectName, category, frequency) {
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  console.log(parseInt(frequency));
  if (!parseInt(frequency)) {
    console.log(chalk.yellow("The --frequency option requires an integer as a positional argument"));
  } else {
    if (parseInt(frequency) <= 0) {
      console.log(chalk.yellow("Please give a positive integer for the frequency."));
    } else {
      configObject.categories[category].frequency = frequency;
      writeJSON(configPath, configObject);
    }
  }
}

function viewConfig(projectName) {
  const { configPath } = dataPaths(projectName);
  const configObject = checkAndParseFile(configPath);
  if (configObject.endpoint === undefined) {
    console.log(chalk.magenta(`\nThe project ${projectName} does not exist. \nRun 'watchmo configure ${projectName}' if you would like to create it.\n`));
    return;
  }
  console.log(chalk.green(`Project: ${projectName}\n`));
  console.log(chalk.green(`Endpoint: ${configObject.endpoint}`));
  console.log(chalk.green('Categories:'));
  for (let category in configObject.categories) {
    console.log(chalk.green(`  ${category}: `));
    console.log(chalk.green(`    queries:`));
    for (let i = 0; i < configObject.categories[category].queries.length; i++) {
      console.log(chalk.green(`      ${i}: ${configObject.categories[category].queries[i]}`));
    }
    console.log(chalk.green(`    frequency:${configObject.categories[category].frequency}`));
  }
  console.log('\n');
}

function configure(projectName, endpoint, category, query = false, frequency = false, remove = false, view = false) {
  // not if-else block to avoid bug with config.json auto deleting
  // default behavior, create project with the given project Name
  if (!endpoint && !category && !frequency && !view) { createProject(projectName); }
  else if (endpoint) { changeEndpoint(projectName, endpoint); }
  else if (category && query === false && frequency === false) { changeCategory(projectName, category, remove); }
  else if (category && query !== false && frequency === false) { changeQuery(projectName, category, query, remove); }
  else if (category && frequency !== false && query === false) { changeFrequency(projectName, category, frequency); }
  else if (view && !endpoint && !category && !frequency) { viewConfig(projectName); }
  else {
    console.log(chalk.red("Not a valid combination of flags. Please configure values one at a time."));
  }
}


module.exports = {
  configure
}
