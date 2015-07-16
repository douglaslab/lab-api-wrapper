'use strict';

import Service from './service';
import dbg from 'debug';
var debug = dbg('items');

export default class Items extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/items';
  }

  getItem(user, itemId, callback) {
    let options = {
      path: `${this.path}/${itemId}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, items) => {
      if(err) {
        console.error(err);
      }
      debug(items);
      return callback(err, items);
    });
  }

  getItems(user, callback, filter = null) {
    let path = this.path;
    if(filter) {
      path += '?';
      Object.keys(filter).forEach((key) => {
        path += `${key}=${filter[key]}`;
      });
    }
    let options = {
      path: path,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.get(options, (err, req, res, items) => {
      if(err) {
        console.error(err);
      }
      debug(items);
      return callback(err, items);
    });
  }

  createItem(user, item, callback) {
    let options = {
      path: this.path,
      headers: this.generateAuthorizationHeader(user)
    };
    debug(options);
    this.client.post(options, item, (err, req, res, response, item) => {
      if(err) {
        console.error(err);
      }
      debug(item);
      callback(err, item);
    });
  }

  updateItem(user, id, properties, callback, replace = false) {
    let options = {
      path: `${this.path}/${itemId}` + (replace ? '/true' : ''),
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.put(options, item, (err, req, res, item) => {
      if(err) {
        console.error(err);
      }
      debug(item);
      callback(err, item);
    });
  };

  deleteItem(user, itemId, callback) {
    let options = {
      uri: `${this.path}/${itemId}`,
      headers: this.generateAuthorizationHeader(user)
    };
    this.client.del(options, (err, req, res, result) => {
      if(err) {
        console.error(err);
      }
      debug(result);
      callback(err, result);
    });
  };
};
