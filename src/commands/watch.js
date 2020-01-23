const fs = require('fs');
const { request } = require('graphql-request');

// const timeTrackWrapper = (queryCallback) => () => {
//   const start = process.hrtime();
//   queryCallback()
//   .then(response => {
//   const timing = process.hrtime(start);
//   return { response, timing };
//   })
// }

// IN DEVELOPMENT, NOT FOR PRODUCTION
function watch(endpoint, categories) {
  for (let cat in categories) {
    for (query of categories[cat].queries) {
      request(endpoint, query)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
    }
  }
}

module.exports = { watch };
