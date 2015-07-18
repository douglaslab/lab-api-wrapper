'use strict';

import Service from './service';
import moment from 'moment';
import Debug from 'debug';
var debug = Debug('service:users');

export default class Users extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/users';
  }

  login(email, password, callback) {
    this.client.basicAuth(email, password);
    this.client.post(`${this.path}/login`, {}, (err, req, res, result) => this.handleResult(res.statusCode, err, result, callback));
  }

  getUsers(user, callback) {
    let options = {
      path: this.path,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => {
      if(!err) {
        result.data = result.data.map((u) => {
          u.created = moment(u.created).format('MM/DD/YYYY hh:mm:ss');
          u.modified = moment(u.modified).format('MM/DD/YYYY hh:mm:ss');
          return u;
        });
      }
      debug(result);
      this.handleResult(res.statusCode, err, result, callback);
    });
  }

  getUserByEmail(user, email, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => this.handleResult(res.statusCode, err, result, callback));
  }

  createUser(user, properties, callback) {
    let options = {
      path: this.path,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.post(options, properties, (err, req, res, result) => this.handleResult(res.statusCode, err, result, callback));
  }

  updateUser(user, email, properties, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.put(options, properties, (err, req, res, result) => this.handleResult(res.statusCode, err, result, callback));
  }

  deleteUser(user, email, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.del(options, (err, req, res, result) => this.handleResult(res.statusCode, err, result, callback));
  }
}
