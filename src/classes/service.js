'use strict';

import crypto from 'crypto';
import restify from 'restify';

export default class Service {
  constructor(apiUrl, version = '*') {
    this.client = restify.createJsonClient({
      url: apiUrl,
      version: version
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
