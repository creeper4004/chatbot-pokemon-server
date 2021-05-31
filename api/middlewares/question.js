const chalk = require('chalk');
const axios = require('axios');
const utils = require('../utils');
const config = require('../config/');
const response =require('../utils/response');
const debug = require('debug')('soldai:api:controller:soldai');

const asyncQuestionMiddleware = async (req, res, next) => {
  debug(`QuestionMiddleware: Getting soldai anwser`);
  if(!req.query.question){
    const uri = utils.getURI(req.protocol, req.originalUrl, req.get('host'));
    const message = 'No has hecho ninguna pregunta!';
    return res.send(response.success({ message }, 200, uri));
  }
  const question = req.query.question;
  let path = `?key=${config.apiSoldai.key}&log=1&question=${question}`;
  let soldaiAnwser = null;
  let url = `${config.apiSoldai.url}/${path}`;
  try {
    soldaiAnwser = await axios.get(encodeURI(url));
    if (!soldaiAnwser.data) {
      throw Error('We couldnt get a anwser from soldai D:');
    }
    req.soldaiAnwser = soldaiAnwser.data;
    next();
  } catch (err) {
    debug(`QuestionMiddleware error: ${chalk.red(err.message)}`);
    return next(Error('We couldnt get anwser'));
  }
}

module.exports = asyncQuestionMiddleware;
