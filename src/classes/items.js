import Service from './service';
import Debug from 'debug';
var debug = Debug('service:items');

export default class Items extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version, '/items');
  }

  getItemById(user, itemId, callback) {
    let options = this.generateOptions(user, `${this.path}/${itemId}`);
    this.client.get(options, this.handleResult(callback));
  }

  getItems(user, callback, filter = null) {
    let path = this.path;
    if(filter) {
      path += '?';
      Object.keys(filter).forEach((key) => {
        path += `${key}=${filter[key]}`;
      });
    }
    debug(filter);
    let options = this.generateOptions(user, path);
    this.client.get(options, this.handleResult(callback));
  }

  createItem(user, item, callback) {
    let options = this.generateOptions(user);
    this.client.post(options, item, this.handleResult(callback));
  }

  updateItem(user, itemId, properties, callback, replace = false) {
    let options = this.generateOptions(user, `${this.path}/${itemId}` + (replace ? '/true' : ''));
    this.client.put(options, properties, this.handleResult(callback));
  }

  deleteItem(user, itemId, callback) {
    let options = this.generateOptions(user, `${this.path}/${itemId}`);
    this.client.del(options, this.handleResult(callback));
  }
}
