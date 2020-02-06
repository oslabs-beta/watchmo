const { cleanAllFiles, removeProject, dataPaths, checkAndParseFile } = require('./utility/fileHelpers');
const fs = require('fs');

/*
THIS FUNCTION DEPENDS UPON THE FOLLOWING FILE STRUCTURE:
/src
|
-> /commands
|  |
|   -> /less.js
|
-> /watchmoData
   |
   -> /parsedData.json
   -> /snapshots.txt
*/

function less(projectName, remove=false) {
  const { rawDataPath, parsedDataPath, projectPath, projectNamesPath } = dataPaths(projectName);
  let projectNamesArray = checkAndParseFile(projectNamesPath);

  const removeProjectName = () => {
    projectNamesArray = projectNamesArray.filter((el) => (el !== projectName));
    fs.writeFileSync(projectNamesPath, JSON.stringify(projectNamesArray), (err) => console.log(err));
  }

  if (!fs.existsSync(projectPath)) {
    console.log('Project does not exist. ');
  }
  else if (!remove) {
    cleanAllFiles([parsedDataPath, rawDataPath]);
    console.log('FILES CLEAN');
  } else {
    if (projectName === 'default') {
      console.log('Cannot remove default file');
    } else {
      removeProject(projectName);
      removeProjectName();
      console.log(`PROJECT ${projectName} DELETED`);

    }

  }

}

module.exports = {
  less
};
