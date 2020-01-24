const fs = require('fs');
const { request } = require('graphql-request');

const buildQueryPromise = (endpoint, query) => new Promise((resolve, reject) => {
  const start = process.hrtime();
  request(endpoint, query)
  .then((response) => {
    const timing = process.hrtime(start);
    resolve({ response, timing});
  })
})

// IN DEVELOPMENT, NOT FOR PRODUCTION
function watch(endpoint, categories) {
  const timingInfo = {};
  const allRequests = [];
  for (let cat in categories) {
    for (query of categories[cat].queries) {
      allRequests.push(buildQueryPromise(endpoint, query));
    }
  }

  //wait until all the requests have been resolved, then ...
  Promise.all(allRequests)
  .then(responses => {
    for (let response of responses) {
      console.log(response.timing)
    }
  })
}


module.exports = { watch };
