import _ from "lodash"

function getCountry(req) {
  // test ?xcountry=US
  if (!_.isEmpty(req.query.xcountry))
    return req.query.xcountry;
  // cloudflare
  if (!_.isEmpty(req.headers['CF-IPCountry']))
    return req.headers['CF-IPCountry'];
  return 'XX';
}

function getIP(req) {
  return req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined
}

export default {
  getCountry,
  getIP
}
