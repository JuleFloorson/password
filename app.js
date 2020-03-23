const [command, key, value] = process.argv.slice(2);
const { read, write } = require("./lib/passwords");

function get() {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwords = read();
    console.log(key, passwords[key]);
  } catch (error) {
    console.error(error);
    console.log("db");
  }
}

function set() {
  console.log("Called SET", key, value);

  try {
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
}

function unset() {
  // Read db.json
  const passwords = read();
  //Remove value by key
  delete passwords[key];
  // Write db.json
  write(passwords);
  console.log(passwords);
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else if (command === "unset") {
  unset();
} else {
  console.error("Unkown command");
}
