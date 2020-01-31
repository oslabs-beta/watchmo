const fs = require('fs');
const path = require('path');

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

const cleanAllFiles = pathArray => {
  pathArray.forEach(path => {
    fs.writeFile(path, '', err => {
      if (err) {
        console.log(err);
      }
    });
  });
};

function less() {
  const parsedPath = path.join(__dirname, '../watchmoData/parsedData.json');
  const rawPath = path.join(__dirname, '../watchmoData/snapshots.txt');
  cleanAllFiles([parsedPath, rawPath]);
  console.log('FILES CLEAN');
}

module.exports = {
  less
};
