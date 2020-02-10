const { dataPaths, checkAndParseFile, appendRawData } = require('./utility/fileHelpers');
const { request } = require('graphql-request');
const chalk = require('chalk');

// returns a promise that resolves to the response/timing object to be saved
const buildQueryPromise = (endpoint, query) =>
  new Promise((resolve, reject) => {
    const start = process.hrtime();
    request(endpoint, query)
      .then(response => {
        const timing = process.hrtime(start);
        resolve({ response, timing });
      })
      .catch(err => {
        reject(err);
      });
  });

// This function waits for the query Promise to resolve to the appropriate data for each query.
// This ensures that the timer starting and stopping in the Promise itself is starting and stopping at the appropriate times
// Finally, it saves the data built up from each query and saves it in the the given path as a JSON file.
async function sendQueriesAndSave(endpoint, categoryName, category, rawDataPath, frequency) {
  const timingInfo = [];
  let responseObject;

  for (let i = 0; i < category.queries.length; i += 1) {
    let query = category.queries[i];
    let { response, timing } = await buildQueryPromise(endpoint, query).catch(err =>
      console.log(err)
    );
    responseObject = { query, response, timing, timestamp: new Date() };
    timingInfo.push(responseObject);
  }
  // this structure is necessary for parsing the saved data later, see 'mo.js', parseDataFileAndSave
  // saveData({ category: categoryName, data: timingInfo }, rawDataPath);
  appendRawData({ category: categoryName, data: timingInfo }, rawDataPath)

  // allows for calls to be made at the specified intervals
  setTimeout(
    () => sendQueriesAndSave(endpoint, categoryName, category, rawDataPath, frequency),
    frequency
  );
}

// sets an interval for each category of query (via recursive setTimeout)
// Promises resolve with priority over setInterval, so the timing data isn't affected
// We may want this to be a cron job or something else in the future
function watch(projectName) {
  const { rawDataPath, configPath } = dataPaths(projectName);
  const { endpoint, categories } = checkAndParseFile(configPath);

  if (endpoint && categories) {
    for (let cat in categories) {
      setTimeout(
        () => sendQueriesAndSave(endpoint, cat, categories[cat], rawDataPath, categories[cat].frequency),
        categories[cat].frequency
      );
    }
  }
  else {
    console.log(chalk.cyan.bold(`\nProject ${projectName} is not configured\nRun "watchmo configure ${projectName}" to create this project\n`));
  }
}

module.exports = { watch };
