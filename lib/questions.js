const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForPassword(key) {
  return new Promise((resolve) => {
    readlineInterface.question(`Ènter password of ${key}:`, (password) => {
      resolve(password);
      readlineInterface.close();
    });
  });
}
exports.askForPassword = askForPassword;
