# _watchMo_

Gather data over time from a Graph-Ql endpoint with a single command.

Analyze response times of queries with simple but effective visualizations.

Configure different categories of queries with either CLI or GUI.

**_The more you watch the more you know, watchMo watch, watchMo mo!_**

## Getting Started
To get access to the watchmo CLI, install watchmo globally:

`npm install -g watchmo`

To start, run:

`watchmo --view`

This should print to the terminal a logo and the project names 'default, demo'. If you want to run further tests, see the testing section below.

The easiest way to get familiar with this tool is to use our built in demo project, which gathers data from an [open source GQL Database](https://countries.trevorblades.com/).

To visualize the configuration for this project, run

`watchmo configure demo --view`

This configuration will work as is, but feel free to reconfigure this however you would like. The `watchmo configure --help` command provides information on how to do this.

To begin gathering data, run:

`watchmo watch demo`

Let watchmo gather some data for a minute or two, then run

`watchmo mo demo --open`

and navigate to the demo project dashboard. Congratulations, you've successfully gathered and visualized GQL timing data!

Once you want to start your own project, run:

`watchmo configure [project name]`

If you get stuck, run `watchmo --help` or `watchmo command --help` To see what you can do.

Happy watching!

## Testing

Watchmo comes pre-built with a testing suite to ensure everything is up and running correctly. Once you have installed watchmo, go ahead and run this testing suite with

`watchmo test`

If there are any problems, feel free to write up an issue.

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Yargs](https://github.com/yargs/yargs) - To build the CLI tools
* [Jest](https://jestjs.io/) - To build a testing suite

## Contributors

* **Evan Hilton** - [GitHub](https://github.com/EH1537)
* **Jason Jones** - [GitHub](https://github.com/JsonRoyJones)
* **Sarah Song** - [GitHub](https://github.com/zavagezong)
* **Spencer Wyman** - [GitHub](https://github.com/spencerWyman)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
