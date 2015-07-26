import Service from './service';

export default class Items extends Service {
  constructor(apiUrl, options) {
    super(apiUrl, options);
    this.path = '/items';
  }

  getItemById(user, itemId, callback) {
    return this.get(user, `${this.path}/${itemId}`, callback);
  }

  getItems(user, callback, filter = null) {
    let path = this.path;
    if(filter) {
      path += '?';
      Object.keys(filter).forEach((key) => {
        path += `${key}=${filter[key]}`;
      });
    }
    return this.get(user, path, callback);
  }

  createItem(user, item, callback) {
    return this.post(user, this.path, item, callback);
  }

  updateItem(user, itemId, properties, callback) {
    return this.put(user, `${this.path}/${itemId}`, properties, callback);
  }

  replaceItem(user, itemId, properties, callback) {
    return this.put(user, `${this.path}/${itemId}/true`, properties, callback);
  }

  deleteItem(user, itemId, callback) {
    return this.del(user, `${this.path}/${itemId}`, callback);
  }
}
