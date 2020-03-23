const fs = require("fs");
const [command, key, value] = process.argv.slice(2);

function get() {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwordsJSON = fs.readFileSync("db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    console.log(key, passwords[key]);
  } catch (error) {
    console.error(error);
    console.log("db");
  }
}

function set() {
  console.log("Called SET", key, value);
  // Read db.json
  // Update value by key
  // Write db.json
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else {
  console.error("Unkown command");
}
