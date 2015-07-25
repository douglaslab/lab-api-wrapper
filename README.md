# Douglas Lab API wrapper

This module provides a JavaScript wrapper for the [Douglas Lab Inventory Management API](https://github.com/douglaslab/lab-api).

## Building the wrapper

```console
$ git clone https://github.com/douglaslab/lab-api-wrapper.git
$ cd lab-api-wrapper
$ npm i
$ npm run build
```

## Wrapper classes

Currently (version 1.0.0) the wrapper provides 3 classes:

1. `Items` - inventory management.
1. `Users` - users management.
1. `Admin` - log, permissions, and general operations.

Each class accepts 2 parameters at instantiation:

1. `apiUrl` - points to the root of the server serving the URL.
1. `version` - the version of the API we're targeting. Defaults to latest.

The parameters allow us to use different versions and instances of the API with different classes, although that won't be needed until several versions of the API exist.

### Sample usage

1. Create an empty folder.
1. Add a `package.json` file by running `npm init` in the folder and answering the questions.
1. Add the wrapper module:

  ```console
  $ npm i --save lab-api-wrapper
  $ npm i --save async  #see comment below
  ```
4. Create a file called `index.js`:

  ```javascript
  import wrapper from 'lab-api-writer';
  import async from 'async';
  const API_URL = 'https://bionano-api.herokuapp.com';
  const VERSION = '1.0.0';
  var items = new wrapper.Items(API_URL, VERSION);
  var users = new wrapper.Users(API_URL, VERSION);

  var myUser;
  var myItem;

  async.series([
    //authenticate user
    (callback) => {
      users.login('provide_user_email', 'provide_user_password', (result) => {
        myUser = result.data;
        callback();
      });
    },
    //create an item
    (callback) => {
      items.createItem(myUser, {name: 'myItem', length: '5cm'}, (result) => {
        myItem = result.data;
        callback();
      });
    },
    //delete the item
    (callback) => {
      items.deleteItem(myUser, myItem.id, (result) => {
        callback();
      });
    }
  ]);
  ```

1. Run `node index.js`

**PS:** the sample code makes use of the `async` module, to synchronize the various calls - but you can use any alternative (such as promises, Q, generators, etc.).
