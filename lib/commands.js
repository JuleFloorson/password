const { read, write, writeDB } = require('./passwords');
const { encrypt, decrypt, hashPassword } = require('./crypto');

module.exports = {
  get: function get(key) {
    console.log('Called GET', key);
    // Read and log db.json
    try {
      const passwords = read();
      const entcryptedPassword = passwords[key];
      const password = decrypt(entcryptedPassword);
      console.log(key, password);
    } catch (error) {
      console.error(error);
      console.log('db');
    }
  },
  set: function set(key, value) {
    try {
      console.log('Called SET', key, value);
      const encryptedValue = encrypt(value);
      // Read db.json
      const passwords = read();
      // Update value by key
      passwords[key] = encryptedValue;
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

  reset: function reset(masterPassword) {
    const db = {
      masterPassword: hashPassword(masterPassword),
      passwords: {},
    };

    writeDB(db);
    console.log('Reseted database with new master password');
  },
};
