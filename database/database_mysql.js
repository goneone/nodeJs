var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '187f5391',
  database : 'o2'
});

conn.connect();


var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    console.log('rows', rows);
    console.log('fields', fields);
  }
});
conn.end();

//쿼리라는 함수의 첫번째 인자로 sql을 전달
//두번째 인자는 함수를 전달 콜백이되서  모든작업이 끝나면 저 함수가 호출이
//되서 에러가 있으면 에러. 데이터들을 rows 배열에 담아 가져온다.
