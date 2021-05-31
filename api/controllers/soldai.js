const debug = require('debug')('soldai:api:controller:soldai');
const chalk = require('chalk');
const queryService = require('../services/query');
const utils = require('../utils');
const response = require('../utils/response');

class SOldaiController {
  constructor (socketio) {
    this.socketio = socketio;
  }
  async query (req, res, next) {
    let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'));
    try {
      debug(`Query Soldai: ${chalk.green('query to soldai api')}`) ;
      let message = await queryService.query(req.soldaiAnswer);
    } catch (err){
      debug(`Query soldai controller error: ${chalk.red(err.message)}`);
      res.status(400).send(response.error('Internal error!', 400, uri, err.message));
    }
  }
}

module.exports = new SOldaiController;
