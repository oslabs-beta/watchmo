//Helpers
const { DEMARCATION, dataPaths, readParseWriteJSON } = require('./utility/fileHelpers');
const { openServer } = require('./utility/serverHelpers');


//dataString is a string of JSON objects separated by DEMARCATION (a stylized WM right now)
function parseData(dataString) {
  let categoricalResponses = dataString.split(DEMARCATION).filter(str => str);
  const parsed = {};
  categoricalResponses.forEach(catRes => {
    let parsedRes = JSON.parse(catRes);
    let category = parsedRes.category;
    if (!parsed[category]) {
      parsed[category] = {};
    }
    parsedRes.data.forEach(queryData => {
      let { timestamp, query, response, timing } = queryData;
      if (!parsed[category][query]) {
        parsed[category][query] = [{ timestamp, response, timing }];
      } else {
        parsed[category][query].push({ timestamp, response, timing });
      }
    });
  });
  return parsed;
}

function mo(projectName, shouldOpen, noBundle=false) {
  const { rawDataPath, parsedDataPath } = dataPaths(projectName);
  if (!noBundle) { readParseWriteJSON(rawDataPath, parseData, parsedDataPath); }
  if (shouldOpen) { openServer(); }
}

module.exports = { mo };
