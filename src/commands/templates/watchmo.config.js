const configuration = {
  //this points watchmo to the GQL server to be watched
  endpoint: '',

  //all the queries for watchmo to watch
  queries: [],

  //how often the queries are sent to the server, units of 'frequency'/hr
  //i.e. frequency: 2 sends queries every 30 minutes
  //-1 means the frequency has not been configured
  frequency: -1,
}
