#!/usr/bin/env node
// shebang necessary to interact with command line

//Packages
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');

//CLI functions
const { watch } = require('./watch');
const { cliDefault } = require('./default');
const { mo } = require('./mo');
const { less } = require('./less');

//helper functions
const checkAndGetConfig = configPath => {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  } else return {};
};

//Defining the CLI functionality
yargs
  .alias({
    open: 'o',
    bundle: 'b'
  })
  .config(checkAndGetConfig(path.join(__dirname, '../watchmoData/config.json')))
  .command('$0', 'opens up visualizer in browser', cliDefault)
  .command(
    'watch',
    'begins sending queries to the endpoint at the configured frequency',
    ({ argv }) => {
      watch(argv.endpoint, argv.categories, path.join(__dirname, '../watchmoData/snapshots.txt'));
    }
  )
  .command('mo', 'parses data and opens up visualizer', ({ argv }) => {
    mo(
      path.join(__dirname, '../watchmoData/snapshots.txt'),
      path.join(__dirname, '../watchmoData/parsedData.json'),
      argv.open,
      argv.bundle
    );
  })
  .command('less', 'cleans up raw and parsed data', less)
  .help().argv;
