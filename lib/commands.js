const { read, write } = require('./passwords');

module.exports = {
  get: function get(key) {
    console.log('Called GET', key);
    // Read and log db.json
    try {
      const passwords = read();
      console.log(key, passwords[key]);
    } catch (error) {
      console.error(error);
      console.log('db');
    }
  },
  set: function set(key, value) {
    try {
      console.log('Called SET', key, value);
      // Read db.json
      const passwords = read();
      // Update value by key
      passwords[key] = value;
      // Write db.json
      write(passwords);
      console.log(key, passwords[key]);
    } catch (error) {
      console.error(error);
    }
  },
  unset: function unset(key) {
    console.log('Called UNSET', key);
    // Read db.json
    const passwords = read();
    //Remove value by key
    delete passwords[key];
    // Write db.json
    write(passwords);
    console.log(passwords);
  },
};
