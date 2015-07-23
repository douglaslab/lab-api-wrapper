import Service from './service';
import Debug from 'debug';
var debug = Debug('service:admin');

export default class Users extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version, '/admin');
    debug;
  }

  getApiHealth(callback) {
    this.client.get(`/health`, this.handleResult(callback));
  }

  getAuditLog(user, callback) {
    let options = this.generateOptions(user, `${this.path}/audit`);
    this.client.get(options, this.handleResult(callback));
  }

  getPermissions(user, callback) {
    let options = this.generateOptions(user, `${this.path}/permissions`);
    this.client.get(options, this.handleResult(callback));
  }

  getPermissionByElement(user, element, callback) {
    let options = this.generateOptions(user, `${this.path}/permissions?element=${element}`);
    this.client.get(options, this.handleResult(callback));
  }

  getPermissionByElementAndAction(user, element, action, callback) {
    let options = this.generateOptions(user, `${this.path}/permissions?element=${element}&action=${action}`);
    this.client.get(options, this.handleResult(callback));
  }

  createPermission(user, permission, callback) {
    let options = this.generateOptions(user, `${this.path}/permissions`);
    this.client.post(options, permission, this.handleResult(callback));
  }
}

