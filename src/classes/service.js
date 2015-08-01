import crypto from 'crypto';
import request from 'superagent';
import Debug from 'debug';
var debug = Debug('service');

export default class Service {
  constructor(apiUrl, options) {
    this.apiUrl = apiUrl;
    this.version = options.version || '*';
    this.userAgent = options.userAgent || 'DouglasLab API Wrapper';
    this.returnPromise = options.returnPromise || false;
    this.request = request;
    debug('initializing wrapper: url: %s, path: %s, ua %s', this.apiUrl, this.version, this.userAgent);
  }

  _generateAuthorizationHeader(apiKey, apiSecret) {
    var timestamp = parseInt(Date.now() / 1000, 10);
    var hmac = crypto.createHmac('sha1', apiSecret).update(apiKey).digest('hex');
    var token = crypto.createHash('md5').update(hmac + timestamp).digest('hex');
    return `key=${apiKey}, token=${token}, ts=${timestamp}`;
  }

  _request(user, method, path, payload, callback) {
    var agent = this.request(method, this.apiUrl + path).set(this.generateHeaders(user));
    if(payload) {
      agent.send(payload);
    }
    if(this.returnPromise) {
      return new Promise((resolve, reject) => {
        agent.end((err, res) => {
          if(err) {
            reject(res.error);
          }
          else {
            resolve(res.body);
          }
        });
      });
    }
    else {
      agent.end(this.handleResult(callback));
    }
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

  handleResult(cb) {
    return function(err, res) {
      if(err && err.code && err.code.includes('ECONNREFUSED')) {
        console.error(`cannot contact API at ${this.apiUrl}`);
        this.callback(err, {error: true, data: `cannot contact API at ${this.apiUrl}`});
      }
      else {
        this.callback(null, res.body);
      }
    }.bind({callback: cb, apiUrl: this.apiUrl});
  }

  get(user, path, callback) {
    return this._request(user, 'GET', path, null, callback);
  }

  post(user, path, body, callback) {
    return this._request(user, 'POST', path, body, callback);
  }

  put(user, path, body, callback) {
    return this._request(user, 'PUT', path, body, callback);
  }

  del(user, path, callback) {
    return this._request(user, 'DELETE', path, null, callback);
  }
}
