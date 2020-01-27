const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');

//the characters demarcating the space between different responses in the rawData file
const DEMARCATION = '*W*M*O*';

// returns a promise that resolves to the response/timing object to be saved
const buildQueryPromise = (endpoint, query) => new Promise((resolve, reject) => {
  const start = process.hrtime();
  request(endpoint, query)
  .then((response) => {
    const timing = process.hrtime(start);
    resolve({ response, timing });
  }).catch((err) => {
    reject(err);
  })
})

//helper function for saving data to an appropriate path
function saveData(data, savePath) {
  //DEMARCATION is used to demarcate new entries in the textfile
  fs.appendFile(savePath, JSON.stringify(data)+DEMARCATION, (err) => {
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
async function sendQueriesAndSave(endpoint, categoryName, category, dirPath,) {
  const timingInfo = {};
  let responseObject;
  for (query of category.queries) {
    responseObject = await buildQueryPromise(endpoint, query).catch((err) => console.log(err));
    timingInfo[query] = responseObject;
  }
  // this structure is necessary for parsing the saved data later, see 'mo.js', parseDataFileAndSave
  saveData({category: categoryName, data: {timestamp: new Date(), response : timingInfo}}, dirPath);
}

// sets an interval for each category of query
// Promises resolve with priority over setInterval, so the timing data isn't affected
// We may want this to be a cron job or something else in the future
function watch(endpoint, categories, dirPath) {
  for (let cat in categories) {
    setInterval(() => sendQueriesAndSave(endpoint, cat, categories[cat], dirPath,), categories[cat].frequency);
  }
}


module.exports = { watch, DEMARCATION };
