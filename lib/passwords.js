const fs = require('fs');

function readDB() {
  const dbJSON = fs.readFileSync('./db.json', 'utf8');
  const db = JSON.parse(dbJSON);
  return db;
}

function writeDB(db) {
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 4));
}

function readPasswords() {
  const db = readDB();
  return db.passwords;
}

function writePasswords(newPasswords) {
  const db = readDB();
  db.passwords = newPasswords;
  writeDB(db);
}

function readMasterPassword() {
  const db = readDB();
  return db.masterPassword;
}

exports.read = readPasswords;
exports.write = writePasswords;
exports.readDB = readDB;
exports.writeDB = writeDB;
exports.readMasterPassword = readMasterPassword;
