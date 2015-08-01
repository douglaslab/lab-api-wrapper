import Debug from 'debug';
import should from 'should';
import helper from './helper';
import wrapper from '../lib';
var debug = Debug('test:admin');
var admin = new wrapper.Admin(helper.API_URL, {version: helper.VERSION, returnPromise: true});

describe('Admin functional tests with Promises', function() {
  should;
  let adminUser;

  before((done) => {
    helper.getAdminUserCredentials((err, result) => {
      debug(result);
      should.not.exist(err);
      adminUser = result.data;
      done();
    });
  });

  it('should return API health', (done) => {
    admin.getApiHealth()
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        return done();
      })
      .catch(err => done(err));
  });

  it('should return audit log', (done) => {
    admin.getAuditLog(adminUser)
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        done();
      })
      .catch(err => done(err));
  });

  let newPermission = {
    element: 'PERMISSION',
    action: 'UPDATE',
    permissionRequired: 'ADMIN'
  };

  it('should Create a new permission', (done) => {
    admin.createPermission(adminUser, newPermission)
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        result.data.should.have.property('element');
        result.data.element.should.equal(newPermission.element);
        done();
      })
     .catch(err => done(err));
  });

  it('should fail to Create an illegal permission', (done) => {
    let permission = {
      element: 'item',
      action: 'delete',
      permissionRequired: 'MANAGER'
    };
    admin.createPermission(adminUser, permission)
      .then(result => {
        debug(result);
        done(new Error('should have failed validation!'));
      })
     .catch(err => {
        debug(err);
        done();
      });
  });

  it('should Retrieve all permissions', (done) => {
    admin.getPermissions(adminUser)
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        result.data.should.be.an.instanceOf(Array);
        done();
      })
     .catch(err => done(err));
  });

  it('should Retrieve permission by element', (done) => {
    admin.getPermissionByElement(adminUser, newPermission.element)
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        result.data.should.be.an.instanceOf(Array);
        result.data.filter(permission => permission.element === newPermission.element && permission.action === newPermission.action).should.have.lengthOf(1);
        done();
      })
     .catch(err => done(err));
  });

  it('should Retrieve permission by element and action', (done) => {
    admin.getPermissionByElementAndAction(adminUser, newPermission.element, newPermission.action)
      .then(result => {
        debug(result);
        result.should.have.property('error');
        result.error.should.be.false;
        result.should.have.property('data');
        result.data.should.be.an.instanceOf(Array);
        result.data.should.have.lengthOf(1);
        done();
      })
     .catch(err => done(err));
  });
});
