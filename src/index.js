'use strict';

import Admin = from './admin';
import Items = from './items';
import Users from './users';

var Gateway = function(apiUrl) {
  this.Admin = new Admin(apiUrl);
  this.Items = new Items(apiUrl);
  this.Users = new Users(apiUrl);
};

module.exports = Gateway;
