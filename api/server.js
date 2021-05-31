const app = require('./app');
const http = require('http');
const chalk = require('chalk');
const debug = require('debug')('soldai:api:server');

const config = require('./config');
const server = http.Server(app);

const environment = process.env.NODE_ENV;

server.listen(config.server.port, () => {
  debug(`Server runngin in port: ${chalk.cyan(config.server.port)}`);
  if(environment !== 'production' &&
     environment !== 'developing' &&
     environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
});
