//생활코딩 nodejs3 - express
var express = require('express')
var app = express() //express는 함수 변수 app에는 application이라는 객체가 담기도록 약속 되어있음.
var fs = require('fs');
var template = require('.lib/template.js')

//app.get('/', (req, res) => res.send('Hello World!')) //첫번째자리는 경로, 두번쨰자리는 콜백함수  //이코드를 밑에꺼로 변경
//get = route, routing -> 길을따라가다가 적당한 곳으로 방향을 잡아줌  기존수업에서는 if문으로 라우팅을 구현했었음.
app.get('/', function(req, res) {
  fs.readdir('./data', function(error, filelist){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.send(html);
  });
});
//app.listen(3005, () => console.log('Example app listening on port 3000!')) //listen메소드가 실행될 때 웹서버가 실행되면서
//3005번 port에 listen이 가게 되고 성공하게되면 console.log를 실행함.


app.listen(3005, function() {
  console.log('Example app listening on port 3000!')
});
