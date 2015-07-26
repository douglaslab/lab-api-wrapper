import Debug from 'debug';
import should from 'should';
import helper from './helper';
import wrapper from '../lib';
var debug = Debug('test:items');
var items = new wrapper.Items(helper.API_URL, helper.VERSION);

describe('Items functional tests', function() {
  should;
  let adminUser;
  let id;

  before((done) => {
    helper.getAdminUserCredentials((result) => {
      adminUser = result.data;
      done();
    });
  });

  let newItem = {
    name: 'balance',
    units: 'metric',
    image: 'balance.png'
  };

  it('should Create a new item', (done) => {
    items.createItem(adminUser, newItem, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('id');
      result.data.should.have.property('properties');
      result.data.properties.name.should.equal(newItem.name);
      id = result.data.id;
      return done();
    });
  });

  it('should fail to create an empty item', (done) => {
    items.createItem(adminUser, {}, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });

  it('should Retrieve the created item', (done) => {
    items.getItemById(adminUser, id, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('id');
      result.data.should.have.property('properties');
      result.data.id.should.equal(id);
      return done();
    });
  });

  it('should fail to Retrieve non-existing item', (done) => {
    items.getItemById(adminUser, '123123123123', (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });

  it('should fail to Retrieve item with illegal id', (done) => {
    items.getItemById(adminUser, 'blahblah', (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });

  it('should Retrieve all items', (done) => {
    items.getItems(adminUser, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.be.an.instanceOf(Array);
      result.data.filter(item => item.id === id).should.have.lengthOf(1);
      return done();
    });
  });

  it('should Update the properties of the created item', (done) => {
    newItem.name = 'updated';
    items.updateItem(adminUser, id, newItem, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('id');
      result.data.should.have.property('properties');
      result.data.properties.should.have.property('name');
      result.data.properties.name.should.equal(newItem.name);
      return done();
    });
  });

  it('should Replace all properties of the created item', (done) => {
    let item = {
      prop1: 'val1',
      prop2: 'val2'
    };
    items.replaceItem(adminUser, id, item, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      result.should.have.property('data');
      result.data.should.have.property('id');
      result.data.should.have.property('properties');
      result.data.properties.prop1.should.equal(item.prop1);
      result.data.properties.prop2.should.equal(item.prop2);
      Object.keys(result.data.properties).length.should.equal(Object.keys(item).length);
      return done();
    });
  });

  it('should fail to Update non-existing item', (done) => {
    newItem.name = 'updated';
    items.updateItem(adminUser, '123123123123', newItem, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });

  it('should fail to Update item with illegal id', (done) => {
    newItem.name = 'updated';
    items.updateItem(adminUser, 'blahblah', newItem, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });

  it('should Delete the created item', (done) => {
    items.deleteItem(adminUser, id, (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.false;
      return done();
    });
  });

  it('should fail to Delete item with illegal id', (done) => {
    items.deleteItem(adminUser, 'blahblah', (result) => {
      debug(result);
      result.should.have.property('error');
      result.error.should.be.true;
      return done();
    });
  });
});
