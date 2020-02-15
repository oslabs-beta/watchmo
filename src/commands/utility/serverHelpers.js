const { exec } = require('child_process');
const opn = require('opn');
const path = require('path');
const PATH_TO_SERVER = path.join(__dirname, '../../server/server.js');
const PORT = '3333';
const chalk = require('chalk');

const openServer = (serverPath = PATH_TO_SERVER, port = PORT) => {
  exec(`node ${serverPath}`);
  opn(`http://localhost:${port}`)
}




module.exports = {
  openServer,
  PORT,
}
