import Debug from 'debug';
import should from 'should';
import helper from './helper';
import wrapper from '../lib';
var debug = Debug('test:admin');
var admin = new wrapper.Admin(helper.API_URL, {version: helper.VERSION});

describe('Admin functional tests', function() {
  should;
  let adminUser;

  before((done) => {
    helper.getAdminUserCredentials((result) => {
      debug(result);
      adminUser = result.data;
      return done();
    });
  });

  it('should return API health', (done) => {
    admin.getApiHealth((result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      return done();
    });
  });

  it('should return audit log', (done) => {
    admin.getAuditLog(adminUser, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      done();
    });
  });

  let newPermission = {
    element: 'PERMISSION',
    action: 'UPDATE',
    permissionRequired: 'ADMIN'
  };

  it('should Create a new permission', (done) => {
    admin.createPermission(adminUser, newPermission, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('element');
      result.data.element.should.equal(newPermission.element);
      return done();
    });
  });

  it('should fail to Create an illegal permission', (done) => {
    let permission = {
      element: 'item',
      action: 'delete',
      permissionRequired: 'MANAGER'
    };
    admin.createPermission(adminUser, permission, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      result.should.have.property('data');
      result.data.should.equal('Permission validation failed');
      return done();
    });
  });

  it('should Retrieve all permissions', (done) => {
    admin.getPermissions(adminUser, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      return done();
    });
  });

  it('should Retrieve permission by element', (done) => {
    admin.getPermissionByElement(adminUser, newPermission.element, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.filter(permission => permission.element === newPermission.element && permission.action === newPermission.action).should.have.lengthOf(1);
      return done();
    });
  });

  it('should Retrieve permission by element and action', (done) => {
    admin.getPermissionByElementAndAction(adminUser, newPermission.element, newPermission.action, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.should.have.lengthOf(1);
      return done();
    });
  });
});
