'use strict';

import Service from './service';
import Debug from 'debug';
var debug = Debug('admin');

export default class Users extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/admin';
  }

  getApiHealth(callback) {
    this.client.get(`${this.path}/health`, (err, req, res, body) => callback(err, body));
  }

  getLog(user, callback) {
    let options = {
      path: `${this.path}/admin/audit`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      debug(result);
      return callback(err, result);
    });
  }

  getPermissions(user, callback) {
    let options = {
      path: `${this.path}/admin/permissions`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      debug(result);
      return callback(err, result);
    });
  }

  createPermission(user, permission, callback) {
    let options = {
      path: `${this.path}/admin/permissions`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.post(options, permission, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      debug(result);
      return callback(err, result);
    });
  }
}

