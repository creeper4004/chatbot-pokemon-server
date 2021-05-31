const asyncQuestionMeiddleware = require('../../middlewares/question');
const SoldaiController = require('../../controllers/soldai');

const PingController = require('../../controllers/ping');

const ping = require('./ping');
const query = require('./soldai');

module.exports = (app) => {
  ping(app)
  query(app)
}
