'use strict';

module.exports = {
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
  }
};
