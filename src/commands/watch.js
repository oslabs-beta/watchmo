const fs = require('fs');


const timeTrackWrapper = (queryCallback) => () => {
  const start = process.hrtime();
  queryCallback()
  .then(response => {
  const timing = process.hrtime(start);
  return { response, timing };
  })
}

function watch(endpoint, categories) {

  console.log('endpoint', endpoint);
  console.log('categories', categories);
  console.log('time', Date.now());

}

module.exports = { watch };
