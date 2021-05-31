function success(data, code, url) {
  return {
    request: (new Date()).getTime(),
    url: url,
    data: data,
    code: code,
  }
}

function error(title, status, url, message) {
  return {
    request: (new Date()).getTime(),
    status: status,
    source: url,
    title: title,
    detail: message
  }
}

module.exports = {
  success: success,
  error: error
}
