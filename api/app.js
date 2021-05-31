const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const helmet = require('helmet');
const routes = require('./routes/v1');
const debug = require('debug')('soldai:api:server');

const utils = require('./utils')
const response = require('./utils/response');

const app = express();

app.use(cors());

app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);
// routes(app);

app.use((err, req, res, next) => {
  debug(`Error: ${chalk.red(err.message)}`);
  let uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'))
  res.status(400).send(response.error('Internal Problem', 400, uri, err.message));
});

module.exports = app;
