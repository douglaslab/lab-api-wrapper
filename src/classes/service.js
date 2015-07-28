import crypto from 'crypto';
import request from 'superagent';
import Debug from 'debug';
var debug = Debug('service');

export default class Service {
  constructor(apiUrl, options) {
    this.apiUrl = apiUrl;
    this.version = options.version || '*';
    this.userAgent = options.userAgent || 'DouglasLab API Wrapper';
    this.returnPromises = options.returnPromises || false;
    this.request = request;
    debug('initializing wrapper: url: %s, path: %s, ua %s', this.apiUrl, this.version, this.userAgent);
  }

  _generateAuthorizationHeader(apiKey, apiSecret) {
    var timestamp = parseInt(Date.now() / 1000, 10);
    var hmac = crypto.createHmac('sha1', apiSecret).update(apiKey).digest('hex');
    var token = crypto.createHash('md5').update(hmac + timestamp).digest('hex');
    return `key=${apiKey}, token=${token}, ts=${timestamp}`;
  }

  generateHeaders(user) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Version': this.version,
      'User-Agent': this.userAgent
    };
    if(user) {
      headers['X-API-Authorization'] = this._generateAuthorizationHeader(user.apiKey, user.apiSecret);
    }
    return headers;
  }

  handleResult(callback) {
    return function(err, res) {
      if(err) {
        console.error(err.response.error);
      }
      this.callback(res.body);
    }.bind({callback: callback});
  }

  get(user, path, callback) {
    request
      .get(this.apiUrl + path)
      .set(this.generateHeaders(user))
      .end(this.handleResult(callback));
  }

  post(user, path, body, callback) {
    request
      .post(this.apiUrl + path)
      .set(this.generateHeaders(user))
      .send(body)
      .end(this.handleResult(callback));
  }

  put(user, path, body, callback) {
    request
      .put(this.apiUrl + path)
      .set(this.generateHeaders(user))
      .send(body)
      .end(this.handleResult(callback));
  }

  del(user, path, callback) {
    request
      .del(this.apiUrl + path)
      .set(this.generateHeaders(user))
      .end(this.handleResult(callback));
  }
}
