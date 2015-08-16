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

  it('should Create a user', (done) => {
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
    users.updateUser(adminUser, newUser.email, {name: newUser.name}, (err, result) => {
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
    serviceName: 'Slack',
    handle: 'jimmyTheKnife222',
    token: 'mytoken',
    additional: {info: 'additional info'}
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

  it('should login with Slack handle and PIN', (done) => {
    users.loginWithSlack(newService.handle, newUser.pin, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('email');
      result.data.email.should.equal(newUser.email);
      return done();
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

  it('should Upload user photo', (done) => {
    users.setPhoto(adminUser, newUser.email, __dirname + '/logo.png', (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      done();
    });
  });

  it('should Get user photo', (done) => {
    users.getPhoto(adminUser, newUser.email, (err, result) => {
      should.not.exist(err);
      should.exist(result.length);
      done(err);
    });
  });

  it('should Deactivate user', (done) => {
    users.deactivateUser(adminUser, newUser.email, (err, result) => {
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.includes('deactivate').should.be.true;
      done(err);
    });
  });

  it('should Activate user', (done) => {
    users.activateUser(adminUser, newUser.email, (err, result) => {
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.includes('activate').should.be.true;
      done(err);
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

  it('should Create a new user (no validation) and delete it', (done) => {
    users.createNewUser(newUser, (err, result) => {
      debug(result);
      should.not.exist(err);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('apiKey');
      result.data.should.have.property('apiSecret');
      users.deleteUser(adminUser, newUser.email, () => done());
    });
  });
});
