/* eslint-disable prefer-template */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const WMD = path.join(__dirname, '../../watchmoData');

const dataController = {};

dataController.getConfig = (req, res, next) => {
  res.locals.config = fs.readFileSync(WMD, (err, data) => {
    if (err) {
      return next(err);
    }
    const config = JSON.parse(data);
    res.locals.config = config;
    return next();
  });
};

dataController.updateConfig = (req, res, next) => {
  res.locals.config = req.body.data;
  const { project } = req.body;
  const configPost = WMD + '/' + project + '/config.json';
  fs.writeFile(configPost, JSON.stringify(res.locals.config), err => {
    if (err) {
      return next(err);
    }
    console.log(chalk.green.bold('file saved!'));
    return next();
  });
};

module.exports = dataController;
