import Debug from 'debug';
import should from 'should';
import helper from './helper';
import wrapper from '../lib';
var debug = Debug('test:users');
var users = new wrapper.Users(helper.API_URL, {version: helper.VERSION});

describe('Users functional tests', () => {
  let adminUser;

  before((done) => {
    helper.getAdminUserCredentials((err, result) => {
      debug(result);
      should.not.exist(err);
      adminUser = result.data;
      done();
    });
  });

  let newUser = helper.generateRandomUser('USER');

  it('should Create a new user', (done) => {
    users.createUser(adminUser, newUser, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
      done();
    });
  });

  it('should Retrieve the created user', (done) => {
    users.getUserByEmail(adminUser, newUser.email, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('email');
      result.data.email.should.equal(newUser.email);
      done();
    });
  });

  it('should login the created user user', (done) => {
    users.login(newUser.email, newUser.password, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
      done();
    });
  });

  it('should Retrieve all users', (done) => {
    users.getUsers(adminUser, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.filter(item => item.email === newUser.email).should.have.lengthOf(1);
      done();
    });
  });

  it('should Update the created user', (done) => {
    newUser.name = 'updated user';
    users.updateUser(adminUser, newUser.email, newUser, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('name');
      result.data.name.should.equal(newUser.name);
      done();
    });
  });

  let newService = {
    serviceName: 'Dropbox',
    token: 'mytoken',
    additional: 'additional info'
  };

  it('should Create a cloud service for user', (done) => {
    users.createService(adminUser, newUser.email, newService, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      done();
    });
  });

  it('should Retrieve cloud service from user', (done) => {
    users.getServiceByName(adminUser, newUser.email, newService.serviceName, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.should.have.lengthOf(1);
      result.data[0].serviceName.should.equal(newService.serviceName);
      done();
    });
  });

  it('should Retrieve all cloud services from user', (done) => {
    users.getServices(adminUser, newUser.email, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data[0].serviceName.should.equal(newService.serviceName);
      done();
    });
  });

  it('should Delete the cloud service from user', (done) => {
    users.deleteService(adminUser, newUser.email, newService.serviceName, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      done();
    });
  });

  it('should Delete the created user', (done) => {
    users.deleteUser(adminUser, newUser.email, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      done();
    });
  });
});
