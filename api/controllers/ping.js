const debug = require('debug')('soldai:api:controller:ping');
const chalk = require('chalk');

class PingController{
  async ppng(req, res, next) {
    debug(`Ping: ${chalk.green('Checking api health')}`);
    res.send({ message: 'pong' });
  }
}

module.exports = new PingController();
