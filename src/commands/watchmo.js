#!/usr/bin/env node
// shebang necessary to interact with command line

//Packages
const yargs = require('yargs');
//CLI functions
const { watch } = require('./watch');
const { cliDefault } = require('./default');
const { mo } = require('./mo');
const { less } = require('./less');
const { configure } = require('./configure');
const { tester } = require('./tester');

//helper functions
const projectPositional = (yargs) => {
  yargs.positional('project', {
    describe: 'name of the project',
    type: 'string',
    default: 'default'
  })
}

//Defining the CLI functionality
yargs
  .alias({
    open: 'o',
    bundle: 'b',
    remove: 'r',
    endpoint: 'e',
    frequency: 'f',
    category: 'c',
    query: 'q',
    mo: 'm',
    view: 'v',
  })
  .command('$0', 'welcome to watchmo!', projectPositional, (argv) => cliDefault(argv.view))
  .command(
    'watch [project]',
    'begins sending queries to the endpoint at the configured frequency',
    projectPositional,
    (argv) => watch(argv.project)
  )
  .command(
    'mo [project]',
    'parses snapshot data and opens up visualizer',
    projectPositional,
    (argv) => {
      mo(
        argv.project,
        argv.open,
        argv.bundle
      )
    }
  )
  .command(
    'less [project]',
    'cleans up data files',
    projectPositional,
    (argv) => less(argv.project, argv.remove)
  )
  .command(
    'test',
    'testing watchmo',
    (argv) => tester()
  )
  .command(
    'configure [project]',
    'configures specified project',
    projectPositional,
    (argv) => configure(
      argv.project,
      argv.endpoint,
      argv.category,
      argv.query,
      argv.frequency,
      argv.remove,
      argv.view,
    )
  )
  .help().argv;
