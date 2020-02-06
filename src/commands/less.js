const { cleanAllFiles, removeProject, dataPaths } = require('./utility/fileHelpers');
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
  const { rawDataPath, parsedDataPath, projectPath } = dataPaths(projectName);
  if (!fs.existsSync(projectPath)) {
    console.log('Project does not exist. ');
  }
  else if (!remove) {
    cleanAllFiles([parsedDataPath, rawDataPath]);
    console.log('FILES CLEAN');
  } else {
    removeProject(projectName);
    console.log(`PROJECT ${projectName} DELETED`);
  }

}

module.exports = {
  less
};
