'use strict';
import Users from '../lib/classes/users';

var Helper = {
  API_URL: 'http://localhost:3000',
  VERSION: '1.0',
  generateRandomUser: function(permissionLevel) {
    let name = 'TEST' + Math.random().toString().slice(2, 11);
    return {
      name: name,
      email: name + '@example.com',
      password: 'blahblah',
      permissionLevel: permissionLevel,
      school: 'UCSF'
    };
  },
  getAdminUserCredentials: function(callback) {
    let users = new Users(Helper.API_URL, Helper.VERSION);
    users.login('test@ucsf.edu', 'password', (err, result) => {
      callback(result);
    });
  }
};

export default Helper;
