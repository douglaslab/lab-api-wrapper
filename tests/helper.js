import Users from '../lib/classes/users';
import params from './params';

 var generateRandomUser = function(permissionLevel) {
  let name = 'TEST' + Math.random().toString().slice(2, 11);
  return {
    name: name,
    email: name + '@example.com',
    password: 'blahblah',
    pin: '47103',
    color: '#5f94cc',
    permissionLevel: permissionLevel,
    additional: {comment: 'test user'}
  };
};

var getAdminUserCredentials = function(callback) {
  let users = new Users(params.API_URL, {version: params.VERSION});
  users.login(params.ADMIN_USER, params.ADMIN_PASSWORD, callback);
};

export default {
  API_URL: params.API_URL,
  VERSION: params.VERSION,
  generateRandomUser: generateRandomUser,
  getAdminUserCredentials: getAdminUserCredentials
};
