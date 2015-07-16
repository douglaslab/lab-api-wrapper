'use strict';

import Admin from './classes/admin';
import Items from './classes/items';
import Users from './classes/users';

var Gateway = function(apiUrl) {
  this.Admin = new Admin(apiUrl);
  this.Items = new Items(apiUrl);
  this.Users = new Users(apiUrl);
};

module.exports = Gateway;
