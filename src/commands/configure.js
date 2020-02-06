const { dataPaths } = require('./utility/fileHelpers');
const fs = require('fs');

/*
Default behavior: builds directory '/watchmoData/[projectName]'
  and copies config file to '/watchmoData/[projectName]/config.json'
*/

function configure(projectName, development=false) {
  const { projectPath, configPath, templatePath, projectNamesPath } = dataPaths(projectName);
  if (!fs.existsSync(projectPath)) {
    fs.mkdir(projectPath, (err) => console.log(err));
    if (!development) {
      fs.copyFileSync(templatePath, configPath);
      console.log(`Project ${projectName} initialized.[DEV NOTE: add helpful configuration advice here]`);
    } else {
      const devConfigPath = dataPaths('default').configPath;
      fs.copyFileSync(devConfigPath, configPath);
      console.log(`Project ${projectName} initialized. SAMPLE CONFIG FILE MADE FROM DEFAULT FOR DEVELEPMENT PURPOSES [DEV NOTE: add helpful configuration advice here]`);
    }
  } else {
    console.log('Project already exists. [DEV NOTE: add helpful configuration advice here]');
  }
}

module.exports = {
  configure
}
