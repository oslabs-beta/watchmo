const fileHelpers = require('../src/commands/utility/fileHelpers');
const { watch } = require('../src/commands/watch');
const { cliDefault } = require('../src/commands/default');
const { mo } = require('../src/commands/mo');
const { less } = require('../src/commands/less');
const { configure } = require('../src/commands/configure');
const fs = require('fs');

jest.mock('fs');
jest.useFakeTimers();
console.log = jest.fn();

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

const mockProjectNames = ['default', 'testProject'];

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

    const projectDirectoryExists = fs.readFileSync(projectPath);
    const configObject = fs.readFileSync(configPath);
    const rawData = fs.readFileSync(rawDataPath);
    const parsedData = fs.readFileSync(parsedDataPath);
    expect(projectDirectoryExists).toBeTruthy();
    expect(configObject).toBeDefined();
    expect(rawData).toBeDefined();
    expect(parsedData).toBeDefined();
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
    const projectNames = ['default', 'testProject', 'secondTestProject'];
    fileHelpers.writeJSON(projectNamesPath, projectNames);
    expect(JSON.stringify(projectNames)).toEqual(fs.readFileSync(projectNamesPath));
  })

  it('can clean multiple files', () => {
    fileHelpers.cleanAllFiles([configPath, rawDataPath, parsedDataPath]);

    const configString = fs.readFileSync(configPath);
    const rawData = fs.readFileSync(rawDataPath);
    const parsedData = fs.readFileSync(parsedDataPath);
    expect(configString).toBe('');
    expect(rawData).toBe('');
    expect(parsedData).toBe('');
  })

  it('can remove a project', () => {
    fileHelpers.removeProject('testProject');

    let projectDirectoryExists = fs.readFileSync(projectPath);
    let configObject = fs.readFileSync(configPath);
    let rawData = fs.readFileSync(rawDataPath);
    let parsedData = fs.readFileSync(parsedDataPath);
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
    expect(projectNames).toEqual(["default", "testProject"]);

    configure('newProject');

    projectNames = JSON.parse(fs.readFileSync(projectNamesPath));
    expect(projectNames).toEqual(["default", "testProject", "newProject"])
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

describe("watchmo mo", () => {

  beforeEach(() => {
    fs.__setMockFiles(MOCK_FILES);
    fs.unlinkSync(parsedDataPath);

    const parsedData = fs.readFileSync(parsedDataPath);
    expect(parsedData).toBeUndefined();
  })

  it('writes data to the correct position', () => {
    mo('testProject', false);
    const parsedData = fs.readFileSync(parsedDataPath);
    expect(parsedData).toBeDefined();
  })

  it('correctly parses the raw data', () => {
    mo('testProject', false);
    const parsedData = JSON.parse(fs.readFileSync(parsedDataPath));
    expect(parsedData).toEqual(mockParsedData);
  })

  it('suppresses parsing with the -b option', () => {
    mo('testProject', false, true);
    const parsedData = fs.readFileSync(parsedDataPath);
    expect(parsedData).toBeUndefined();
  })

  it('does nothing when project does not exist', () => {
    const nonExistentProjectRawPath = fileHelpers.dataPaths('nonExistentProject');
    const nonExistentProjectParsedPath = fileHelpers.dataPaths('nonExistentProject');
    const nonExistentProjectRawData = fs.readFileSync(nonExistentProjectRawPath);
    expect(nonExistentProjectRawData).toBeUndefined();

    mo('nonExistentProject', false);

    const parsedData = fs.readFileSync(nonExistentProjectParsedPath);
    expect(parsedData).toBeUndefined();
  })
})
//
describe("watchmo less", () => {

  beforeEach(() => {
    fs.__setMockFiles(MOCK_FILES);
    const parsedData = fs.readFileSync(parsedDataPath);
    const rawData = fs.readFileSync(rawDataPath);
    const projectNames = fs.readFileSync(projectNamesPath);
    const projectExists = fs.readFile(projectPath);
    expect(projectExists).toBeTruthy();
    expect(parsedData).toBeDefined();
    expect(rawData).toBeDefined();
    expect(projectNames).toBeDefined();
  })

  it("deletes data from correct position", () => {
    less("testProject");
    const parsedData = fs.readFileSync(parsedDataPath);
    const rawData = fs.readFileSync(rawDataPath);
    expect(parsedData).toBe("")
    expect(rawData).toBe("");
  })

  it("removes entire project with the -r option", () => {
    less("testProject", true);
    const parsedData = fs.readFileSync(parsedDataPath);
    const rawData = fs.readFileSync(rawDataPath);
    const projectExists = fs.readFile(projectPath);
    expect(projectExists).toBeUndefined();
    expect(parsedData).toBeUndefined();
    expect(rawData).toBeUndefined();
  })

  it("changes project names list with the -r option", () => {
    less("testProject", true);
    const projectNames = JSON.parse(fs.readFileSync(projectNamesPath));
    expect(projectNames).toEqual(["default"]);
  })

  it("won't delete the default project", () => {
    less("default", true);
    const projectNames = JSON.parse(fs.readFileSync(projectNamesPath));
    expect(projectNames).toEqual(["default", "testProject"]);
  })
})
