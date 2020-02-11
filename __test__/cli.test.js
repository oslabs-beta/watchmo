const fileHelpers = require('../src/commands/utility/fileHelpers');

jest.mock('fs');

const {
  projectPath,
  configPath,
  rawDataPath,
  parsedDataPath,
  templatePath,
  projectNamesPath,
} = fileHelpers.dataPaths('testProject');

const mockConfig = {
  "endpoint": "testEndpoint",
  "categories": {
    "testing": {
      "queries": ["{ testingName { testingProp }}"],
      "frequency": 5000
    }
  }
}

const mockRawData = {
  "category":"testingCategory",
  "data":[
    {
      "query":"{ testingName { testingProp }}",
      "response":{"testingName":[{"testingProp":"test prop value"}]},
      "timing":[0,55907518],
      "timestamp":"2020-02-10T18:56:11.463Z"
    }
  ]
}

const mockParsedData = {
  "testingCategory":{
    "{ testingName { testingProp }}":[
      {
        "timestamp":"2020-02-10T18:56:11.463Z",
        "response":{
          "testingName":[{"testingProp":"test prop value"}]
        },
        "timing":[0,55907518]
      }
    ]
  }
}

const MOCK_FILES = {};
MOCK_FILES[configPath] = JSON.stringify(mockConfig);
MOCK_FILES[rawDataPath] = JSON.stringify(mockRawData);
MOCK_FILES[parsedDataPath] = JSON.stringify(mockParsedData);


describe('fileHelpers', () => {

  beforeEach(() => {
    const fs = require('fs');
    fs.__setMockFiles(MOCK_FILES);
  })

  it('can check and parse files', () => {
    const rawDataObject = fileHelpers.checkAndParseFile(rawDataPath);
    const noFileObject = fileHelpers.checkAndParseFile('fakePath');
    expect(rawDataObject).toEqual(mockRawData);
    expect(noFileObject).toEqual({});
  })
})
