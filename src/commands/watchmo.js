#!/usr/bin/env node
// shebang necessary to interact with command line

//Packages
const fs = require('fs');
const argv = require('yargs');
const path = require('path');

//CLI functions
const { watch } = require('./watch');
const { cliDefault } = require('./default');
const { mo } = require('./mo');

//helper functions
const checkAndGetConfig = configPath => {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  } else return {};
};


//Defining the CLI functionality
argv
  .config(checkAndGetConfig(path.join(__dirname, '../watchmoData/config.json')))
  .command('$0', 'opens up visualizer in browser', cliDefault)
  .command(
    'watch',
    'begins sending queries to the endpoint at the configured frequency',
    ({ argv }) => {
      watch(argv.endpoint, argv.categories, path.join(__dirname, '../watchmoData/snapshots'));
    }
  )
  .command('mo', 'who knows?', mo)
  .help().argv;
