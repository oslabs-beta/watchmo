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
    development: 'd',
    remove: 'r'
  })
  .command('$0', 'opens up visualizer in browser', cliDefault)
  .command(
    'watch [project]',
    'begins sending queries to the endpoint at the configured frequency',
    projectPositional,
    (argv) => watch(argv.project)
  )
  .command(
    'mo [project]',
    'parses data and opens up visualizer',
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
    'cleans up raw and parsed data',
    projectPositional,
    (argv) => less(argv.project, argv.remove)
  )
  .command(
    'configure [project]',
    'configures specified project',
    projectPositional,
    (argv) => configure(argv.project, argv.development)
  )
  .command(
    'test [arg]',
    'prints out argv',
    projectPositional,
    (argv) => console.log(argv)
  )
  .help().argv;
