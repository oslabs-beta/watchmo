const fileHelpers = require('../src/commands/utility/fileHelpers');
const { watch } = require('../src/commands/watch');
const { cliDefault } = require('../src/commands/default');
const { mo } = require('../src/commands/mo');
const { less } = require('../src/commands/less');
const { configure } = require('../src/commands/configure');
const fs = require('fs');

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

const mockTemplate = {
  "endpoint": "",
  "categories": {
    "default": {
      "queries": [],
      "frequency": -1
      }
  }
}

const mockProjectNames = ['default'];

const MOCK_FILES = {};
MOCK_FILES[projectPath] = true;
MOCK_FILES[configPath] = JSON.stringify(mockConfig);
MOCK_FILES[rawDataPath] = JSON.stringify(mockRawData)+fileHelpers.DEMARCATION;
MOCK_FILES[parsedDataPath] = JSON.stringify(mockParsedData);
MOCK_FILES[projectNamesPath] = JSON.stringify(mockProjectNames);
MOCK_FILES[templatePath] = JSON.stringify(mockTemplate);


describe('fileHelpers', () => {

  beforeEach(() => {
    fs.__setMockFiles(MOCK_FILES);
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
    const projectNames = ['default', 'testProject'];
    fileHelpers.writeJSON(projectNamesPath, projectNames);
    expect(JSON.stringify(projectNames)).toEqual(fs.readFileSync(projectNamesPath));
  })

  it('can clean multiple files', () => {
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


describe('watchmo configure', () => {

  beforeEach(() => {
    fs.__setMockFiles(MOCK_FILES);
  })

  it('builds new files', () => {
    const newProjectPath = fileHelpers.dataPaths('newProject').projectPath;
    const newConfigPath = fileHelpers.dataPaths('newProject').configPath;
    let newProject = fs.readFileSync(newProjectPath);
    let newConfig = fs.readFileSync(newConfig);
    expect(newProject).toBeUndefined();
    expect(newConfig).toBeUndefined();

    configure('newProject');

    newProject = fs.readFileSync(newProjectPath);
    newConfig = JSON.parse(fs.readFileSync(newConfigPath));
    expect(newProject).toBeTruthy();
    expect(newConfig).toEqual(mockTemplate);
  })

  it('changes project names list', () => {
    let projectNames = JSON.parse(fs.readFileSync(projectNamesPath));
    expect(projectNames).toEqual(["default"]);

    configure('newProject');

    projectNames = JSON.parse(fs.readFileSync(projectNamesPath));
    expect(projectNames).toEqual(["default", "newProject"])
  })

  it('does nothing for existing projects', () => {
    const defaultConfigPath = fileHelpers.dataPaths('default').configPath
    let defaultConfig = fs.readFileSync(defaultConfigPath);
    expect(defaultConfig).toBeUndefined();

    //establishing the default project
    configure('default');

    defaultConfig = fs.readFileSync(defaultConfigPath);

    //configuring again, this should do nothing
    configure('default');

    const afterConfigureConfig = fs.readFileSync(defaultConfigPath);

    expect(defaultConfig).toBe(afterConfigureConfig);
  })
})
