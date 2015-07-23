import Users from '../lib/classes/users';

const API_URL = 'http://localhost:3000';//'https://bionano-api.herokuapp.com';
const VERSION = '1.0';

 var generateRandomUser = function(permissionLevel) {
  let name = 'TEST' + Math.random().toString().slice(2, 11);
  return {
    name: name,
    email: name + '@example.com',
    password: 'blahblah',
    permissionLevel: permissionLevel,
    school: 'UCSF'
  };
};

var getAdminUserCredentials = function(callback) {
  let users = new Users(API_URL, VERSION);
  users.login('test@ucsf.edu', 'password', (err, result) => callback(result));
};

export default {
  API_URL: API_URL,
  VERSION: VERSION,
  generateRandomUser: generateRandomUser,
  getAdminUserCredentials: getAdminUserCredentials
};
