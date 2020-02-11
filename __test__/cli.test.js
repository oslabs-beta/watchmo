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

// same as mockRawData but the timestamp is for 1 minute later


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

const mockProjectNames = ['default'];

const MOCK_FILES = {};
MOCK_FILES[projectPath] = true;
MOCK_FILES[configPath] = JSON.stringify(mockConfig);
MOCK_FILES[rawDataPath] = JSON.stringify(mockRawData)+fileHelpers.DEMARCATION;
MOCK_FILES[parsedDataPath] = JSON.stringify(mockParsedData);
MOCK_FILES[projectNamesPath] = JSON.stringify(mockProjectNames);


describe('fileHelpers', () => {

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILES);
  })

  it('can check and parse files', () => {
    const configObject = fileHelpers.checkAndParseFile(configPath);
    const projectNames = fileHelpers.checkAndParseFile(projectNamesPath);
    const noFileObject = fileHelpers.checkAndParseFile('fakePath');
    expect(configObject).toEqual(mockConfig);
    expect(projectNames).toEqual(mockProjectNames);
    expect(noFileObject).toEqual({});
  })

  it('can append raw data', () => {
    const fs = require('fs');
    const mockRawData2 = {
      "category":"testingCategory",
      "data":[
        {
          "query":"{ testingName { testingProp }}",
          "response":{"testingName":[{"testingProp":"test prop value"}]},
          "timing":[0,55907518],
          "timestamp":"2020-02-10T18:57:11.463Z"
        }
      ]
    };

    fileHelpers.appendRawData(mockRawData2, rawDataPath);
    const rawDataObject = fs.readFileSync(rawDataPath);
    expect(`${rawDataObject}`).toBe(`${JSON.stringify(mockRawData)}${fileHelpers.DEMARCATION}${JSON.stringify(mockRawData2)}${fileHelpers.DEMARCATION}`);
  })

  it('can write JSON', () => {
    const fs = require('fs');
    const projectNames = ['default', 'testProject'];
    fileHelpers.writeJSON(projectNamesPath, projectNames);
    expect(JSON.stringify(projectNames)).toEqual(fs.readFileSync(projectNamesPath));
  })

  it('can clean multiple files', () => {
    const fs = require('fs');
    let configString = fs.readFileSync(configPath);
    let rawData = fs.readFileSync(rawDataPath);
    let parsedData = fs.readFileSync(parsedDataPath);
    expect(configString).toBeDefined();
    expect(rawData).toBeDefined();
    expect(parsedData).toBeDefined();

    fileHelpers.cleanAllFiles([configPath, rawDataPath, parsedDataPath]);

    configString = fs.readFileSync(configPath);
    rawData = fs.readFileSync(rawDataPath);
    parsedData = fs.readFileSync(parsedDataPath);
    expect(configString).toBe('');
    expect(rawData).toBe('');
    expect(parsedData).toBe('');
  })

  it('can remove a project', () => {
    const fs = require('fs');
    let projectDirectoryExists = fs.readFileSync(projectPath);
    let configObject = fs.readFileSync(configPath);
    let rawData = fs.readFileSync(rawDataPath);
    let parsedData = fs.readFileSync(parsedDataPath);
    expect(projectDirectoryExists).toBeTruthy();
    expect(configObject).toBeDefined();
    expect(rawData).toBeDefined();
    expect(parsedData).toBeDefined();

    fileHelpers.removeProject('testProject');

    projectDirectoryExists = fs.readFileSync(projectPath);
    configObject = fs.readFileSync(configPath);
    rawData = fs.readFileSync(rawDataPath);
    parsedData = fs.readFileSync(parsedDataPath);
    expect(projectDirectoryExists).toBeUndefined;
    expect(configObject).toBeUndefined();
    expect(rawData).toBeUndefined();
    expect(parsedData).toBeUndefined();
  })
})
