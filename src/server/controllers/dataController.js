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

dataController.updateConfig = (req, res, next) => {
  // console.log(req);
  res.locals.config = req.body;
  fs.writeFile(WMD, JSON.stringify(req.body), (err, data) => {
    if (err) {
      return next(err);
    }
    console.log(data);
    return next();
  });
};

module.exports = dataController;
