var mysql      = require('mysql'); //mysql 모듈을 사용하겠다. mysql이라는 변수를 통해서~!
var connection = mysql.createConnection({ //mysql의 메소드를 호출  메소드의 인자로 host,user,password,database를 넣음.
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'opentutorials', //만들었었던 db임~!
  port: 3307
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
}); //connection의 query메소드의 첫번쨰 인자로 sql문 두번쨰 인자로 콜백함수를 주면. sql문이 db 서버에전송되서 실행이 끝난다음에
//콜백함수가 호출됨.

connection.end();
