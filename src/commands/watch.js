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

async function watch(endpoint, categories, dirPath) {
  const timingInfo = {};
  let counter = 0;
  let responseObject;
  for (let cat in categories) {
    for (query of categories[cat].queries) {
      counter = 0;
      responseObject = await buildQueryPromise(endpoint, query);
      timingInfo[query] = responseObject;
    }
  }
  const timestamp = new Date();
  const savePath = path.join(dirPath, `${timestamp.toString()}.json`);
  console.log(savePath);
  saveData(timingInfo, savePath);
}


module.exports = { watch };
