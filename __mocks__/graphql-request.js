const graphql_request = jest.genMockFromModule('graphql-request');

function request(endpoint, query) {
  return new Promise((resolve, reject) => {
    resolve("Test1");
    reject("Error");
  })
}

graphql_request.request = request;

module.exports = graphql_request
