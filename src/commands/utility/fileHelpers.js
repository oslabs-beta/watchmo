const fs = require('fs');
const path = require('path');
const PATH_TO_DATA = '../../watchmoData/';
const chalk = require('chalk');


//the characters demarcating the space between different responses in the rawData file
const DEMARCATION = '*W*M*O*';

//*** HELPER FUNCTIONS ***

const dataPaths = (projectName) => ({
  projectPath: path.join(__dirname, PATH_TO_DATA, projectName),
  configPath: path.join(__dirname, PATH_TO_DATA, projectName, 'config.json'),
  rawDataPath: path.join(__dirname, PATH_TO_DATA, projectName, 'snapshots.txt'),
  parsedDataPath: path.join(__dirname, PATH_TO_DATA, projectName, 'parsedData.json'),
  templatePath: path.join(__dirname, '../templates/config.json'),
  projectNamesPath: path.join(__dirname, PATH_TO_DATA, 'projectNames.json'),
})

const checkAndParseFile = filePath => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  } else return {};
};


//DEMARCATION is used to demarcate new entries in the textfile
const appendRawData = (data, savePath) => {
  fs.appendFile(savePath, JSON.stringify(data) + DEMARCATION, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.green.bold.underline(`file saved in ${savePath}`));
    }
  });
}

function writeJSON(savePath, object) {
  fs.writeFile(savePath, JSON.stringify(object), err => {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.green.bold.underline(`DATA SAVED TO ${savePath}`));
    }
  });
}

function readParseWriteJSON(readPath, parser, writePath) {
  fs.readFile(readPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(chalk.red.bold.underline('Error reading file', err));
    } else {
      writeJSON(writePath, parser(data));
    }
  })
}

//Higher order function for creating functions for performing a file system action on all files in a given array
const actionOnAllFiles = fileAction => (pathArray => {
  pathArray.forEach(path => {
    fileAction(path, err => {
      if (err) {
        console.log(err);
      }
    })
  })
})

const cleanAllFiles = actionOnAllFiles((path, errCb) => fs.writeFileSync(path, '', errCb));

const checkAndRemoveAllFiles = actionOnAllFiles((path, errCb) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path, errCb);
  }
})

const removeProject = projectName => {
  const { projectPath, configPath, rawDataPath, parsedDataPath } = dataPaths(projectName);
  checkAndRemoveAllFiles([configPath, rawDataPath, parsedDataPath]);
  fs.rmdirSync(projectPath);
}




module.exports = {
  checkAndParseFile,
  appendRawData,
  dataPaths,
  removeProject,
  cleanAllFiles,
  writeJSON,
  readParseWriteJSON,
  DEMARCATION,
}
