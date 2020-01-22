#!/usr/bin/env node
// shebang necessary to interact with command line
const { init } = require('./init');
const { watch } = require('./watch');
const { cliDefault } = require('./default')

require('yargs')
  .command('$0', 'opens up visualizer in browser', cliDefault)
  .command('init', 'creates configuration files for watchmo', init)
  .command('watch', 'begins sending queries to the endpoint at the configured frequency', watch)
  .help()
  .argv
