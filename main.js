var http = require('http');
var fs = require('fs');
var url = require('url');

//http:localhost/?id=html 에서 id=html부분을 query String이라고 한다.
//이 쿼리스트링의 값에 따라서 다른 컨텐츠를 보여주는 웹페이지를 만들어 보자
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
    var pathname = url.parse(_url, true).pathname;

    console.log(url.parse(_url, true));

    if(pathname === '/') {
      if(queryData.id === undefined) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
          //data디렉토리 밑에있는 파일 읽겠다.
          var title = 'Welcome';
          var description = 'Hello, Node.js'
          var template =`
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      } else {
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
      var title =  queryData.id;
      var template =`
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template);
    });
   }
  }else {
    response.writeHead(404); //파일을 찾을수없다는 에러
    response.end('not found'); //여기다가 글자 써봐 바로바로 화면에 바로바로바뀜.
  }


});
app.listen(3000);

//모듈이란? 기본적으로 제공하는 기능들을 그룹핑해놓은 그룹들..
