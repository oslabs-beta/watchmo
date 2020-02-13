/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dataController = require('./controllers/dataController');
const { PORT } = require('../commands/utility/serverHelpers');

const router = express.Router();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/configDash', dataController.updateConfig, (req, res) => {
  console.log(res.locals.config);
  res.status(200).json();
});

app.use(express.static(path.join(__dirname, '../display')));
app.use(express.static(path.join(__dirname, '../watchmoData')));
app.use(express.static(path.join(__dirname, '../../src/assets')));

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

// if you are in the page and you refresh, this will boot you back to the first page.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

// this need to be modified to work with the config updater
app.post('/configDash', dataController.updateConfig, (req, res) => {
  console.log(res.locals.config);
  res.status(200).json();
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log(err)
  res.sendStatus(500);
}

app.listen(PORT);
console.log(chalk.cyan.bold(`app listening on ${PORT}`));

module.exports = {
  app
};
