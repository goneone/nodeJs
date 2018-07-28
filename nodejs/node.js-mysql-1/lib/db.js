var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password : 'root',
  database : 'opentutorials',
  port: '3307'
});
db.connect();

//외부에서 db.js를 쓸수 있도록 export시켜야함.
module.exports = db;
