const debug = require('debug')('soldai:api:configuration');
const chalk = require('chalk');

let conf ;
debug(`Configuration API-SoldAI: ${chalk.magenta('getting configs')}`);

const configurations = {
  production: {
    apiSoldai: {
      key: process.env.SOLDAI_KEY,
      url: process.env.SOLDAI_URL
    },
    pokeApi: {
      url: process.env.POKE_URL
    },
    server: {
      port: process.env.PORT || 8080
    }
  },
  testing: {
    apiSoldai: {
      key: process.env.SOLDAI_KEY || '06087177902b2c99bc6f76cc6b59cec006964c80',
      url: process.env.SOLDAI_URL || 'http://beta.soldai.com/bill-cipher/askquestion',
      logging: s => debug(s)
    },
    pokeApi: {
      url: process.env.POKE_URL || 'https://pokeapi.co/api/v2/'
    },
    server: {
      port: process.env.PORT || 3000
    }
  },
  developing: {
    apiSoldai: {
      key: process.env.SOLDAI_KEY || '06087177902b2c99bc6f76cc6b59cec006964c80',
      url: process.env.SOLDAI_URL || 'http://beta.soldai.com/bill-cipher/askquestion'
    },
    pokeApi: {
      url: process.env.POKE_URL || 'https://pokeapi.co/api/v2/'
    },
    server: {
      port: process.env.PORT || 3000
    }
  }
}

switch (process.env.NODE_ENV) {
  case 'production':
    conf = configurations['production'];
    break;
  case 'developing':
    conf = configurations['developing'];
    break;
  default:
    conf = configurations['testing']
}

module.exports = conf;
