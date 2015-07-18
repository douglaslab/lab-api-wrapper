'use strict';

var debug = require('debug')('test:users');
var helper = require('./helper');
var should = require('should');
var wrapper = require('../lib');
var users = new wrapper.Users(helper.API_URL, helper.VERSION);

describe('Users unit tests', () => {
  let adminUser;
  let newUser = helper.generateRandomUser('USER');

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

  it('should Create a new user', (done) => {
    users.createUser(adminUser, newUser, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
      return done();
    });
  });

  it('should Retrieve the created user', (done) => {
    users.getUserByEmail(adminUser, newUser.email, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('email');
      result.data.email.should.equal(newUser.email);
      return done();
    });
  });

  it('should Retrieve all users', (done) => {
    users.getUsers(adminUser, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.filter(item => item.email === newUser.email).should.have.lengthOf(1);
      return done();
    });
  });

  it('should Update the created user', (done) => {
    newUser.name = 'updated user';
    users.updateUser(adminUser, newUser.email, newUser, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('name');
      result.data.name.should.equal(newUser.name);
      return done();
    });
  });

  it('should Delete the created user', (done) => {
    users.deleteUser(adminUser, newUser.email, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      return done();
    });
  });
});
