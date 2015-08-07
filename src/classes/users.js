import Service from './service';

//parser for photo
function binaryParser(res, callback) {
  res.setEncoding('binary');
  res.text = '';
  res.on('data', chunk => {res.text += chunk; });
  res.on('end', () => callback(null, new Buffer(res.text, 'binary')));
}

export default class Users extends Service {
  constructor(apiUrl, options) {
    super(apiUrl, options);
    this.path = '/users';
  }

  login(email, password, callback) {
    let agent = this.request.post(`${this.apiUrl}${this.path}/login`)
      .set(this.generateHeaders())
      .auth(email, password);
    if(this.returnPromise) {
      return new Promise((resolve, reject) => {
        agent.end((err, res) => {
          if(err) {
            reject(res.error);
          }
          else {
            resolve(res.body);
          }
        });
      });
    }
    else {
      agent.end(this.handleResult(callback));
    }
  }

  loginWithSlack(handle, pin, callback) {
    let agent = this.request.post(`${this.apiUrl}${this.path}/loginwithslack`)
      .set(this.generateHeaders())
      .auth(handle, pin);
    if(this.returnPromise) {
      return new Promise((resolve, reject) => {
        agent.end((err, res) => {
          if(err) {
            reject(res.error);
          }
          else {
            resolve(res.body);
          }
        });
      });
    }
    else {
      agent.end(this.handleResult(callback));
    }
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

  activateUser(user, email, callback) {
   return this.put(user, `${this.path}/${email}/active/true`, {}, callback);
  }

  deactivateUser(user, email, callback) {
   return this.put(user, `${this.path}/${email}/active/false`, {}, callback);
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

  getPhoto(user, email, callback) {
    let agent = this.request.get(`${this.apiUrl}${this.path}/${email}/photo`)
      .set(this.generateHeaders(user, {'Accept': 'application/octet-stream'}))
      .buffer(true)
      .parse(binaryParser);
    if(this.returnPromise) {
      return new Promise((resolve, reject) => {
        agent.end((err, res) => {
          if(err) {
            reject(err);
          }
          else {
            resolve(res.body);
          }
        });
      });
    }
    else {
      agent.end((err, res) => {
        if(err) {
            callback(err);
          }
          else {
            callback(null, res.body);
          }
      });
    }
  }

  setPhoto(user, email, filePath, callback) {
   let agent = this.request.put(`${this.apiUrl}${this.path}/${email}/photo`)
      .set(this.generateHeaders(user, {'Content-Type': 'multipart/form-data'}))
      .attach('photo', filePath);
    if(this.returnPromise) {
      return new Promise((resolve, reject) => {
        agent.end((err, res) => {
          if(err) {
            reject(res.error);
          }
          else {
            resolve(res.body);
          }
        });
      });
    }
    else {
      agent.end(this.handleResult(callback));
    }
  }
}
