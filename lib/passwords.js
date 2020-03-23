const fs = require("fs");

module.exports = {
  read: function readPasswords() {
    const passwordsJSON = fs.readFileSync("./db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    return passwords;
  },
  write: function writePasswords(newPasswords) {
    fs.writeFileSync("./db.json", JSON.stringify(newPasswords, null, 4));
  },
};
