var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

//http:localhost/?id=html 에서 id=html부분을 query String이라고 한다.
//이 쿼리스트링의 값에 따라서 다른 컨텐츠를 보여주는 웹페이지를 만들어 보자
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        //홈을 처리하는 부분
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(template);
        });
      } else {
        //id 값을 선택한 페이지
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>
               <a href="/update?id=${title}">update</a>
               <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
               </form>
               `
            );
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = templateList(filelist);
        //template에서 3번째 인자인 form에대한 설명은 form.html을 참조
        var template = templateHTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        //웹브라우저가 post방식으로 데이터를 전송할때 데이터가 엄청나게 많으면 한번에 처리하다가는
        //프로그램에 무리가 갈수 있음. 그래서 nodejs에서는 post방식으로 전송되는 데이터가 많을 경우.
        //이러한 방법을 씀. 서버쪽에서 수신할때마다 콜백함수를 호출하고 data라는 인자를 통해서 수신한 정보를 주기로
        //약속되어 있음.
          body = body + data;
        //body에다가 callback이 실행될때마다 data를 추가함.
      });
      request.on('end', function(){
        //그렇게 정보가 조각조각 들어오다가 더이상 들어올 데이터가 없으면 end 다음에 들어오는 callback함수를 호출하도록 약속
        //되어 있음.
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            //200은 성공 302는 다른페이지로 리다이렉션시키라는 뜻
            response.end();
          })
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              //사용자가 수정할떄 어떤 파일을 수정할지를 알수 있어야함.
              //만약 사용자가 제목을 수정해버리면 호날두형님이라는 data에 들어있는 파일들을
              //제목을 메시형님이라고 수정해버리면 서버에서 찾을수 없게 되기 때문에.
              //미리 저렇게 안보이게 제목값을 받아놓는거임
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a>
             <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          //예전파일 , 새로운파일, 콜백함수
          //누가 수정에서 파일이름과 내용을 바꾸면 그 파일이름, 내용이 바껴서 저장이 됨.
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          fs.unlink(`data/${id}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);  //파일을 찾을수없다는 에러
      response.end('Not found'); //여기다가 글자 써봐 바로바로 화면에 바로바로바뀜.
    }
});
app.listen(3000);

//모듈이란? 기본적으로 제공하는 기능들을 그룹핑해놓은 그룹들..
