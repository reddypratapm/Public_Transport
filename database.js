const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "direction_table",
  password: "1234",
  multipleStatements: true,
  useColumnNames: true
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});


module.exports = mysqlConnection;