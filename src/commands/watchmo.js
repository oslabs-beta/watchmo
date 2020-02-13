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
const { testing } = require('./testing');

//helper functions
const projectPositional = (yargs, optionObject) => {
  yargs.positional('project', {
    describe: 'name of the project. Run `watchmo --view` to view existing projects, and `watchmo configure [project name] --view` to view that project configuration',
    type: 'string',
    default: 'default'
  }).options(optionObject)
}

const options = {
  default: {
    view: {
      alias: 'v',
      describe: 'prints the existing projects',
      type: 'boolean',
    }
  },
  mo: {
    bundle: {
      alias: 'b',
      describe: 'suppresses the parsing method. Used as an optimization for the --open option',
      type: 'boolean',
    },
    open: {
      alias: 'o',
      describe: 'starts the server and opens the browser GUI. Used with `watchmo mo`',
      type: 'boolean',
    },
  },
  less: {
    remove: {
      alias: 'r',
      describe: 'removes categories or queries from the specified config file',
      type: 'boolean',
    },
  },
  configure: {
    endpoint: {
      alias: 'e',
      describe: 'sets the endpoint for the specified project',
      type: 'string'
    },
    category: {
      alias: 'c',
      describe: 'creates the given category for the specified project, or specified a category for other options',
      type: 'string'
    },
    query: {
      alias: 'q',
      describe: 'creates the given query for the specified project in the specified category, or specifies the query for other options. Only used with `-c [categoryName]` or `-c [category name] -r`',
      type: 'string | integer'
    },
    frequency: {
      alias: 'f',
      describe: 'sets the frequency for a specified category in the specified project. Only used with `-c [category name]`',
      type: 'integer',
    },
    remove: {
      alias: 'r',
      describe: 'removes the category or query. Only used with `-c [category name]` or `-c [category name] -q [query index]`',
      type: 'boolean',
    },
    view: {
      alias: 'v',
      describe: 'prints the corresponding project config file',
      type: 'boolean',
    }
  },
}



//Defining the CLI functionality
yargs
  .command('$0', 'welcome to watchmo! Use watchmo -v to view the existing projects', (yargs) => yargs.options(options.default), (argv) => cliDefault(argv.view))
  .command(
    'watch [project]',
    'gathers timing data from the project endpoint at the configured frequency',
    (yargs) => projectPositional(yargs, {}),
    (argv) => watch(argv.project)
  )
  .command(
    'mo [project]',
    'parses snapshot data',
    (yargs) => projectPositional(yargs, options.mo),
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
    (yargs) => projectPositional(yargs, options.less),
    (argv) => less(argv.project, argv.remove)
  )
  .command(
    'configure [project]',
    'creates given project',
    (yargs) => projectPositional(yargs, options.configure),
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
  .command(
    'test',
    'runs tests (powered by Jest)',
    {},
    (argv) => testing()
  )
  .help().argv;
