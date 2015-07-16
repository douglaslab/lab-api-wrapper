'use strict';

import Service from './service';
import moment from 'moment';
import Debug from 'debug';
var debug = Debug('users');

export default class Users extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/users';
  }

  login(email, password, callback) {
    let options = {
      path: `${this.path}/login`,
      headers: {
        'Authorization': 'Basic ' + (new Buffer(`${email}${password}`)).toString('base64')
      }
    };
    this.client.post(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      debug(result);
      callback(err, result);
    });
  }

  getUsers(user, userId, callback) {
    let options = {
      path: this.path,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      else {
        result = result.data.map((u) => {
          u.created = moment(u.created).format('MM/DD/YYYY hh:mm:ss');
          u.modified = moment(u.modified).format('MM/DD/YYYY hh:mm:ss');
          return u;
        });
        debug(result);
      }
      return callback(err, result);
    });
  }

  getUsrByEmail(user, email, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      return callback(err, result);
    });
  }

  createUser(user, properties, callback) {
    let options = {
      path: this.path,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.post(options, properties, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      return callback(err, result);
    });
  }

  updateUser(user, email, properties, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.put(options, properties, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      return callback(err, result);
    });
  }

  deleteUser(user, email, callback) {
    let options = {
      path: `${this.path}/${email}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.del(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      return callback(err, result);
    });
  }
}
