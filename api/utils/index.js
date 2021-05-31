 const _url = require('url');

function getURI (protocol, originalUrl, host){
  return decodeURIComponent(_url.format({
    protocol: protocol,
    host: host,
    pathname: originalUrl
  }))
}
module.exports = {
  getURI: getURI
}
