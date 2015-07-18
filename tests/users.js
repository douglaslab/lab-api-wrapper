'use strict';

import Debug from 'debug';
import helper from './helper';
import should from 'should';
import wrapper from '../lib';
var debug = Debug('test:users');
var users = new wrapper.Users(helper.API_URL, helper.VERSION);

describe('Users functional tests', () => {
  let adminUser;
  before((done) => {
    helper.getAdminUserCredentials((result) => {
      adminUser = result.data;
      done();
    });
  });

  let newUser = helper.generateRandomUser('USER');

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

  it('should login the created user user', (done) => {
    users.login(newUser.email, newUser.password, (err, result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
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
