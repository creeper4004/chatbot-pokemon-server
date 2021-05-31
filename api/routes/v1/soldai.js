
const asyncQuestionMiddleware = require('../../middlewares/question');

const SoldaiController = require('../../controllers/soldai');

module.exports = (app) => {
  app.get('/v1/query', asyncQuestionMiddleware, SoldaiController.query);
}
