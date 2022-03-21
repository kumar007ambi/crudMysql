const { createPool } = require("mysql");
const dotenv = require("dotenv");
const mysql = require("mysql");

//databse setup conection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudsql",
});

//create connection
db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connection SuccessFully");
});

module.exports = db;
