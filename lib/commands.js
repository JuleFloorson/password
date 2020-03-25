const { read, write, writeDB } = require('./passwords');
const { hashPassword, encrypt, decrypt } = require('./crypto');

function get(key, masterPassword) {
  console.log('Called GET', key);
  // Read and log db.json
  try {
    const passwords = read();
    // Log password
    const encryptedPassword = passwords[key];
    const password = decrypt(encryptedPassword, masterPassword);
    console.log(key, password);
  } catch (error) {
    console.error(error);
  }
}

function set(key, value, masterPassword) {
  console.log('Called SET', key, value);
  const encryptedValue = encrypt(value, masterPassword);
  try {
    const passwords = read();
    // Update value by key
    passwords[key] = encryptedValue;
    // Write db.json
    write(passwords);
  } catch (error) {
    console.error(error);
  }
}

function unset(key) {
  console.log('Called UNSET', key);
  try {
    const passwords = read();
    delete passwords[key];
    write(passwords);
  } catch (error) {
    console.error(error);
  }
}

function reset(masterPassword) {
  const db = {
    masterPassword: hashPassword(masterPassword),
    passwords: {},
  };

  writeDB(db);
  console.log('Reseted database with new master password');
}

function changeMasterPassword(newMasterPassword) {
  const passwords = read();
  const passwordKeys = Object.keys(passwords);

  const passwordsDecrypted = {};
  passwordKeys.forEach((passwordKey) => {
    const value = passwords[passwordKey];
    passwordsDecrypted[passwordKey] = decrypt(value);
  });

  const db = {
    masterPassword: hashPassword(newMasterPassword),
    passwords: passwords,
  };
  writeDB(db);

  const passwordsEncrypted = {};
  passwordKeys.forEach(async (passwordKey) => {
    const value = passwordsDecrypted[passwordKey];
    passwordsEncrypted[passwordKey] = encrypt(value);
  });

  write(passwordsEncrypted);
}

exports.get = get;
exports.set = set;
exports.unset = unset;
exports.reset = reset;
exports.changeMasterPassword = changeMasterPassword;
