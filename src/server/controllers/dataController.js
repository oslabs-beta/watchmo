const fs = require('fs');
const path = require('path');

const WMD = path.join(__dirname, '../../watchmoData/config.json');

const dataController = {};

dataController.getConfig = (req, res, next) => {
  res.locals.config = fs.readFile(WMD, (err, data) => {
    if (err) {
      return next(err);
    }
    const config = JSON.parse(data);
    res.locals.config = config;
    return next();
  });
};

module.exports = dataController;
