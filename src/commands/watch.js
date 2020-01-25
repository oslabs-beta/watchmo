const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');

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

function saveData(data, savePath) {
  fs.writeFile(savePath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`file saved in ${savePath}`);
    }
  });
}

async function sendQueriesAndSave(endpoint, category, dirPath) {
  const timingInfo = {};
  let responseObject;
  for (query of category.queries) {
    responseObject = await buildQueryPromise(endpoint, query);
    timingInfo[query] = responseObject;
  }
  const timestamp = new Date();
  const savePath = path.join(dirPath, `${timestamp.toString()}.json`);
  console.log(savePath);
  saveData(timingInfo, savePath);
}

function watch(endpoint, categories, dirPath) {
  for (let cat in categories) {
    setInterval(() => sendQueriesAndSave(endpoint, categories[cat], dirPath), categories[cat].frequency);
  }
}


module.exports = { watch };
