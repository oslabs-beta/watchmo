#!/usr/bin/env node
// shebang necessary to interact with command line


//Packages
const fs = require('fs');
const argv = require('yargs');
const path = require('path');

//CLI functions
const { init } = require('./init');
const { watch } = require('./watch');
const { cliDefault } = require('./default');
const { mo } = require('./mo');


//helper functions
const checkAndGetConfig = (configPath) => {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath))
  }
  else return {};
}

argv
  .config(checkAndGetConfig(path.join(process.cwd(), '/watchmo/config.json')))
  .command('$0', 'opens up visualizer in browser', cliDefault)
  .command('init', 'creates configuration files for watchmo', init)
  .command('watch', 'begins sending queries to the endpoint at the configured frequency', ({ argv }) => {
    watch(argv.endpoint, argv.categories)
  })
  .command('mo', 'who knows?', mo)
  .command('test', 'Ehhhh', (argv) => console.log(argv.argv))
  .help()
  .argv
