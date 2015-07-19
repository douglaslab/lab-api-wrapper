import crypto from 'crypto';
import restify from 'restify';
import Debug from 'debug';
var debug = Debug('service:');

export default class Service {
  constructor(apiUrl, version = '*') {
    this.client = restify.createJsonClient({
      url: apiUrl,
      version: version,
      userAgent: 'DouglasLab API Wrapper'
    });
    debug('initializing REST client %s, version %s', apiUrl, version);
  }

  generateAuthorizationHeader(apiKey, apiSecret) {
    var timestamp = parseInt(Date.now() / 1000, 10);
    var hmac = crypto.createHmac('sha1', apiSecret).update(apiKey).digest('hex');
    var token = crypto.createHash('md5').update(hmac + timestamp).digest('hex');
    return `key=${apiKey}, token=${token}, ts=${timestamp}`;
  }

  generateOptions(user, path = this.path) {
    return {
      path: path,
      headers: {'X-API-Authorization': this.generateAuthorizationHeader(user.apiKey, user.apiSecret)}
    };
  }

  handleResult(callback) {
    return function(err, req, res, result) {
      if(err) {
        console.error(req.path, res.statusCode, err);
      }
      else {
        debug('path: %s response: %s err: %s', req.path, res.statusCode, err);
      }
      this.callback(err, result);
    }.bind({callback: callback});
  }
}
