const { get, set, unset, reset } = require('./lib/commands');
const { askForPassword, askForMasterPassword } = require('./lib/questions');
const { readMasterPassword } = require('.lib/passwords');
const { verifyHash } = require('./lib/crypto');
const [command, key] = process.argv.slice(2);

async function run() {
  // we need a new command to set a new master password
  //this command will read the password and save the hash in db.json

  const answeredMasterPassword = await askForMasterPassword();

  if (command === 'reset') {
    return reset(answeredMasterPassword);
  }

  const masterPassword = readMasterPassword();

  //masterpassword should be the hash of the original password
  //we need to hash the answered master password too
  // and then we can compare both hashes

  if (!verifyHash(answeredMasterPassword !== masterPassword)) {
    console.error('Fuck off');
    return;
  }

  if (command === 'get') {
    get(key);
  } else if (command === 'set') {
    const password = await askForPassword(key);
    set(key, password);
  } else if (command === 'unset') {
    unset(key);
  } else {
    console.error('Unkown command');
  }
}
run();
