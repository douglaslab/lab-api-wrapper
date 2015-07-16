'use strict';

import crypto from 'crypto';
import JsonClient from 'restify';

export default class Service {
  constructor(apiUrl, version = '*') {
    this.client = new JsonClient({
      url: apiUrl,
      version: version,
      gzip: {}
    });
  }

  generateAuthorizationHeader(user) {
    var timestamp = parseInt(Date.now() / 1000, 10);
    var hmac = crypto.createHmac('sha1', user.apiSecret).update(user.apiKey).digest('hex');
    var token = crypto.createHash('md5').update(hmac + timestamp).digest('hex');
    return {
      'X-API-Authorization': `key=${user.apiKey}, token=${token}, ts=${timestamp}`
    };
  }
}
