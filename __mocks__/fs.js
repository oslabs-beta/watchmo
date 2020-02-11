const path = require('path')
const fs = jest.genMockFromModule('fs');

let mockFiles = {};

function __setMockFiles(newMockFiles) {
  mockFiles = Object.assign({}, newMockFiles);
}

function readFileSync(mockFilePath) {
  console.log(mockFilePath);
  console.log(mockFiles[mockFilePath]);
  return mockFiles[mockFilePath];
}

function writeFileSync(filePath, data) {
  mockFiles[filePath] = data;
}

function existsSync(filePath) {
  return (mockFiles[filePath] !== undefined);
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;
fs.existsSync = existsSync;

module.exports = fs;
