
const PingController = require('../../controllers/ping');

module.exports = app => {
  app.get('/v1/ping', PingController.pong);
}
