import Service from './service';

export default class Users extends Service {
  constructor(apiUrl, options) {
    super(apiUrl, options);
    this.path = '/users';
  }

  login(email, password, callback) {
    this.request
      .post(`${this.apiUrl}${this.path}/login`)
      .set(this.generateHeaders())
      .auth(email, password)
      .end(this.handleResult(callback));
  }

  getUsers(user, callback) {
    return this.get(user, this.path, callback);
  }

  getUserByEmail(user, email, callback) {
    return this.get(user, `${this.path}/${email}`, callback);
  }

  createUser(user, properties, callback) {
    return this.post(user, this.path, properties, callback);
  }

  updateUser(user, email, properties, callback) {
    return this.put(user, `${this.path}/${email}`, properties, callback);
  }

  deleteUser(user, email, callback) {
    return this.del(user, `${this.path}/${email}`, callback);
  }

  getServices(user, email, callback) {
    return this.get(user, `${this.path}/${email}/service`, callback);
  }

  getServiceByName(user, email, serviceName, callback) {
    return this.get(user, `${this.path}/${email}/service/${serviceName}`, callback);
  }

  createService(user, email, serviceProperties, callback) {
    return this.post(user, `${this.path}/${email}/service`, serviceProperties, callback);
  }

  deleteService(user, email, serviceName, callback) {
    return this.del(user, `${this.path}/${email}/service/${serviceName}`, callback);
  }
}
