import Service from './service';
import moment from 'moment';
import Debug from 'debug';
var debug = Debug('service:users');

export default class Users extends Service {
  constructor(apiUrl, version = '*') {
    super(apiUrl, version);
    this.path = '/users';
    debug(this.apiUrl, this.path, this.version);
  }

  login(email, password, callback) {
    this.client.basicAuth(email, password);
    this.client.post(`${this.path}/login`, {}, this.handleResult(callback));
  }

  getUsers(user, callback) {
    let options = this.generateOptions(user);
    this.client.get(options, (err, req, res, result) => {
      if(!err) {
        result.data = result.data.map((u) => {
          u.created = moment(u.created).format('MM/DD/YYYY hh:mm:ss');
          u.modified = moment(u.modified).format('MM/DD/YYYY hh:mm:ss');
          return u;
        });
      }
      debug(result);
      this.handleResult(callback)(err, req, res, result);
    });
  }

  getUserByEmail(user, email, callback) {
    let options = this.generateOptions(user, `${this.path}/${email}`);
    this.client.get(options, this.handleResult(callback));
  }

  createUser(user, properties, callback) {
    let options = this.generateOptions(user);
    this.client.post(options, properties, this.handleResult(callback));
  }

  updateUser(user, email, properties, callback) {
    let options = this.generateOptions(user, `${this.path}/${email}`);
    this.client.put(options, properties, this.handleResult(callback));
  }

  deleteUser(user, email, callback) {
    let options = this.generateOptions(user, `${this.path}/${email}`);
    this.client.del(options, this.handleResult(callback));
  }
}
