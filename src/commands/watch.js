const fs = require('fs');
const { request } = require('graphql-request');

const buildQueryPromise = (endpoint, query) => new Promise((resolve, reject) => {
  const start = process.hrtime();
  request(endpoint, query)
  .then((response) => {
    const timing = process.hrtime(start);
    resolve({ response, timing });
  })
})

async function watch(endpoint, categories) {
  const timingInfo = {};
  let counter = 0;
  let responseObject;
  for (let cat in categories) {
    for (query of categories[cat].queries) {
      counter = 0;
      responseObject = await buildQueryPromise(endpoint, query);
      console.log('setting timingInfo');
      timingInfo[query] = responseObject;
    }
  }
  console.log(timingInfo);
}


module.exports = { watch };
