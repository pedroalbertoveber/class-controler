/* importing modules */
const mysql = require("mysql");

const conn = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "class_db",
});

module.exports = conn;
