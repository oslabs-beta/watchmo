const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');

//the characters demarcating the space between different responses in the rawData file
const DEMARCATION = '*W*M*O*';

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

//helper function for saving data to an appropriate path
function saveData(data, savePath) {
  //DEMARCATION is used to demarcate new entries in the textfile
  fs.appendFile(savePath, JSON.stringify(data) + DEMARCATION, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`file saved in ${savePath}`);
    }
  });
}

// This function waits for the query Promise to resolve to the appropriate data for each query.
// This ensures that the timer starting and stopping in the Promise itself is starting and stopping at the appropriate times
// Finally, it saves the data built up from each query and saves it in the the given path as a JSON file.
async function sendQueriesAndSave(endpoint, categoryName, category, dirPath, frequency) {
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
  saveData({ category: categoryName, data: timingInfo }, dirPath);

  // allows for calls to be made at the specified intervals
  setTimeout(
    () => sendQueriesAndSave(endpoint, categoryName, category, dirPath, frequency),
    frequency
  );
}

const checkAndGetConfig = configPath => {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  } else return {};
};

// sets an interval for each category of query (via recursive setTimeout)
// Promises resolve with priority over setInterval, so the timing data isn't affected
// We may want this to be a cron job or something else in the future
function watch(projectName) {
  const dirPath = path.join(__dirname, '../watchmoData/', projectName, 'snapshots.txt');

  const { endpoint, categories } = checkAndGetConfig(path.join(__dirname, '../watchmoData/', projectName, 'config.json'))

  if (endpoint && categories) {
    for (let cat in categories) {
      setTimeout(
        () => sendQueriesAndSave(endpoint, cat, categories[cat], dirPath, categories[cat].frequency),
        categories[cat].frequency
      );
    }
  }
  else {
    console.log(`\nProject ${projectName} is not configured\nRun "watchmo config ${projectName}" to create this project\n`);
  }
}

module.exports = { watch, DEMARCATION };
