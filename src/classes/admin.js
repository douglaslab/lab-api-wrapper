import Service from './service';

export default class Users extends Service {
  constructor(apiUrl, options) {
    super(apiUrl, options);
    this.path = '/admin';
  }

  getApiHealth(callback) {
    return this.get(null, `/health`, callback);
  }

  getAuditLog(user, callback) {
    return this.get(user, `${this.path}/audit`, callback);
  }

  getPermissions(user, callback) {
    return this.get(user, `${this.path}/permissions`, callback);
  }

  getPermissionByElement(user, element, callback) {
    return this.get(user, `${this.path}/permissions?element=${element}`, callback);
  }

  getPermissionByElementAndAction(user, element, action, callback) {
    return this.get(user, `${this.path}/permissions?element=${element}&action=${action}`, callback);
  }

  createPermission(user, permission, callback) {
    return this.post(user, `${this.path}/permissions`, permission, callback);
  }
}

