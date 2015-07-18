'use strict';

import Service from './service';
import Debug from 'debug';
var debug = Debug('service:items');

export default class Items extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/items';
  }

  getItem(user, itemId, callback) {
    let options = this.generateOptions(user, `${this.path}/${itemId}`);
    this.client.get(options, this.handleResult);
  }

  getItems(user, callback, filter = null) {
    let path = this.path;
    if(filter) {
      path += '?';
      Object.keys(filter).forEach((key) => {
        path += `${key}=${filter[key]}`;
      });
    }
    let options = this.generateOptions(user, path);
    this.client.get(options, this.handleResult);
  }

  createItem(user, item, callback) {
    let options = this.generateOptions(user);
    debug(options);
    this.client.post(options, item, this.handleResult);
  }

  updateItem(user, itemId, properties, callback, replace = false) {
    let options = this.generateOptions(user, `${this.path}/${itemId}` + (replace ? '/true' : ''));
    this.client.put(options, properties, this.handleResult);
  }

  deleteItem(user, itemId, callback) {
    let options = this.generateOptions(user, `${this.path}/${itemId}`);
    this.client.del(options, this.handleResult);
  }
}
