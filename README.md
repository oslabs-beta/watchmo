# _watchMo_

Gather data over time from a Graph-Ql endpoint with a single command.

Analyze response times of queries with simple but effective visualizations.

Configure different categories of queries with either CLI or GUI.

Don't watch less, _watchMo_. 

## Getting Started
To get started, install watchmo globally
`npm install -g watchmo`
The easiest way to proceed is to open open up the web visualizer by running 

`watchmo mo -o`

From here, navigate to the config page and add your GraphQL queries and endpoints.
If you want to skip this step, we provided a demo project built in to the package to test that everything works.
Next, run 

`watchmo watch [project name]`

(use demo for the project name if you skipped the configuration step. This configuration is pointed at an [open source GQL Database](https://countries.trevorblades.com/))
Let watchmo gather some data for a minute, then once again run 

`watchmo mo -o` 

and navigate to the dashboard. You should see some data visualizations. Congratulations!

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Yargs](https://github.com/yargs/yargs) - To build the CLI tools

## Contributors

* **Evan Hilton** 
* **Jason Jones**
* **Sarah Song**
* **Spencer Wyman**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
