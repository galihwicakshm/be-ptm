
const mysql = require('mysql2');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_b4ck3ndp3rt4m!na'
});

module.exports = db