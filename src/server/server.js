const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dataController = require('./controllers/dataController');

const router = express.Router();
const { PORT } = require('../commands/utility/serverHelpers');

const app = express();
const chalk = require('chalk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../display')));
app.use(express.static(path.join(__dirname, '../watchmoData')));

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

//if you are in the page and you refresh, this will boot you back to the first page.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

//this need to be modified to work with the config updater
app.post('/configDash', dataController.updateConfig, (req, res) => {
  console.log(res.locals.config);
  res.status(200).json();
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(400);
  res.render('error', { error: err });
}

app.listen(PORT);
console.log(chalk.cyan.bold(`app listening on ${PORT}`));

module.exports = {
  app
};
