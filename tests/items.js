'use strict';

import Debug from 'debug';
import helper from './helper';
import should from 'should';
import wrapper from '../lib';
var debug = Debug('test:items');
var items = new wrapper.Items(helper.API_URL, helper.VERSION);


describe('Items functional tests', function() {
  let adminUser;
  before((done) => {
    helper.getAdminUserCredentials((result) => {
      adminUser = result.data;
      done();
    });
  });

  let newItem = {

  };

  it('should create an item', (done) => {
    done();
  });
});
