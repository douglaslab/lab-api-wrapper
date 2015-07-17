'use strict';

const API_URL = 'http://localhost:3000';
var debug = require('debug')('test:users');
var should = require('should');
var Users = require('../lib').Users;
var users = new Users(API_URL);

var randomUserName = function() {
  return 'TEST' + Math.random().toString().slice(2, 11);
};

var generateRandomUser = function(permissionLevel) {
  let randomUser = {
    name: randomUserName(),
    email: randomUser.name + '@example.com',
    password: 'blahblah',
    permissionLevel: permissionLevel,
    school: 'UCSF'
  };
  return randomUser;
};

describe('Users unit tests', () => {
  let adminUser;
  it('should login admin user', (done) => {
    users.login('test@ucsf.edu', 'password', (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
      adminUser = result.data;
      return done();
    });
  });

  // var newUser = randomUser('ADMIN');
  // it('should create a new user', (done) => {
  //   users.createUser(adminUser, newUser, (err, result) => {

  //   });
  // });

  // it('should Retrieve the created user', (done) => {
  //   let req = httpMocks.createRequest({params: {email: newUser.email}});
  //   let res = httpMocks.createResponse();
  //   users.findByEmail(req, res, () => {
  //     let result = JSON.parse(res._getData());
  //     debug(result);
  //     res.statusCode.should.equal(200);
  //     result.should.have.property('error');
  //     result.error.should.be.false;
  //     result.should.have.property('data');
  //     result.data.should.have.property('email');
  //     result.data.email.should.equal(newUser.email);
  //     return done();
  //   });
  // });

  // it('should Retrieve all users', (done) => {
  //   let req = httpMocks.createRequest();
  //   let res = httpMocks.createResponse();
  //   users.findAll(req, res, () => {
  //     let result = JSON.parse(res._getData());
  //     debug(result);
  //     res.statusCode.should.equal(200);
  //     result.should.have.property('error');
  //     result.error.should.be.false;
  //     result.should.have.property('data');
  //     result.data.should.be.an.instanceOf(Array);
  //     result.data.filter(item => item.email === newUser.email).should.have.lengthOf(1);
  //     return done();
  //   });
  // });

  // it('should Update the created user', (done) => {
  //   newUser.name = 'updated user';
  //   let user = JSON.parse(JSON.stringify(newUser)); //clone newUser so it won't mutate
  //   let req = httpMocks.createRequest({params: {email: newUser.email}, body: user});
  //   let res = httpMocks.createResponse();
  //   users.update(req, res, () => {
  //     let result = JSON.parse(res._getData());
  //     debug(result);
  //     res.statusCode.should.equal(200);
  //     result.should.have.property('error');
  //     result.error.should.be.false;
  //     result.should.have.property('data');
  //     result.data.should.have.property('name');
  //     result.data.name.should.equal(newUser.name);
  //     return done();
  //   });
  // });

  // it('should Delete the created delete', (done) => {
  //   let req = httpMocks.createRequest({params: {email: newUser.email}});
  //   let res = httpMocks.createResponse();
  //   users.delete(req, res, () => {
  //     let result = JSON.parse(res._getData());
  //     debug(result);
  //     res.statusCode.should.equal(200);
  //     result.should.have.property('error');
  //     result.error.should.be.false;
  //     return done();
  //   });
  // });
});
