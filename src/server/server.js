const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const PORT = 3333;

app.use(express.static(path.join(__dirname, '../display')));

app.use(bodyParser.json());

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

app.get('/config', (req, res) => {
  res.json(path.join(__dirname, '../watchmoData/config.json'))
})

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
console.log(`app listening on ${PORT}`);

module.exports = app;
