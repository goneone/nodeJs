var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js'); //요건 내가 만든 모듈
var path = require('path'); // 보안상의 문제때문에 데이터가 들어오고 나가는 모든경로의 path를 바꿔줘야함.(원래의경로를 숨겨 준다고 보면 됨)
//http:localhost/?id=html 에서 id=html부분을 query String이라고 한다.
//이 쿼리스트링의 값에 따라서 다른 컨텐츠를 보여주는 웹페이지를 만들어 보자
var sanitizeHtml = require('sanitize-html');//보안문제떄문에 받은 npm..Json방식으로 바꿔주는 것 같음

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        //홈을 처리하는 부분
        //디렉토리에 있는 아이템(파일,디렉토리 등)의 이름들을 리턴해준다.
        fs.readdir('./data', function(error, filelist){
          var title = '환영합니다';
          var description = '당신을 환영합니다';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            // 눌렀을 때 /create로 이동
            `<a href="/create">create</a>
            <a href="/insert">insert</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
        //id 값을 선택한 페이지
        //누구를 수정할껀지에 대한 정보를 쿼리스트링을 통해서 전달한다
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            //sanitized = 살균하다는 뜻 ㅋㅋ
            var list = template.list(filelist);
            var html = template.HTML(title, list,
             `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a>
               <a href="/update?id=${sanitizedTitle}">update</a>
               <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
               </form>
               `
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        //template에서 3번째 인자인 form에대한 설명은 form.html을 참조
        //placeholder는 사용자가 뭘입력하는게 좋은지 가이드해주는 속성임.
        //form 태그란? 사용자의 데이터를 서버에 전송하는 방법!
        //form action="서버로 전송한 데이터를 수신할 url" method=":데이터를 전송하는 방법">
        var html = template.HTML(title, list, `
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
        response.end(html);
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
          console.log(post)
          //qs는 쿼리스트링이라는 nodejs가 갖고있는 모듈을 가져오는 것임. ()맨위에 선언했음)
          //그 qs의 parse라는 함수에다가 body를 입력값으로 주면 post 데이터에 정보가 들어가게됨.
          var title = post.title;
          var description = post.description;
          //fs.writefile은 파일(우리가 클라이언트로 부터 받은 데이터)을 저장하는 방법임
          //writefile('해당파일', 파일에쓸내용, utf8, function(err))
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            //200은 성공 302는 다른페이지로 리다이렉션시키라는 뜻
            //create를 한다음에 그 생성한 페이지로 이동하게끔 !
            response.end();
          })
      });

    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
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
          response.end(html);
        });
      });
      //post 방식으로 들어온 값을 받음.
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
          //fs.rename(예전파일 , 새로운파일, 콜백함수)
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
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else if(pathname === '/insert'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - insert';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/insert_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><input type="text" name="description" placeholder="description"></p>
          <p><input type="text" name="author" placeholder="author"></p>
          <p>
            <input type = "submit">
          </p>
        `, '');
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname === '/insert_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
        //body에다가 callback이 실행될때마다 data를 추가함.
      });
      //input 변수에다가 화면에서 값들을 받음.
      request.on('end', function(){
          var post = qs.parse(body);
          var input1 = post['title'];
          var input2 = post['description'];
          var input3 = post['author'];
          var mysql      = require('mysql');
          var conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '187f5391',
            database : 'o2'
          });
          conn.connect();
          var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
          var params = [input1, input2, input3];
          var description2 = "데이터가 입력되었습니다" + input1 + " " + input2 + " " + input3;
          var description3 = `
            <p><h1>데이터가 입력되었습니다</h1></p>
            제목 : ${input1}
            설명 : ${input2}
            저자 : ${input3}
          `
          //쿼리실행
          conn.query(sql, params, function(err, rows, fields){
              if(err) {
              console.log(err);
            } else {
              ////response.writeHead(302, {Location: `/?id=insertSuccessPage`}); //이거 주석처리하면 success가화면에뜸.
              //response.end('success'); //여기다가 글자 써봐 바로바로 화면에 바로바로바뀜.
              console.log(rows);
            }
          });
          fs.writeFile(`data/test3`, description3, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=test3`});
              response.end('success');
          });
          //console.log(post['title'])
           //이런방식으로 데이터 읽어와야함~!
          //qs는 쿼리스트링이라는 nodejs가 갖고있는 모듈을 가져오는 것임. ()맨위에 선언했음)
          //그 qs의 parse라는 함수에다가 body를 입력값으로 주면 post 데이터에 정보가 들어가게됨.
        });
      } else if(pathname === '/select'){
        fs.readdir('./data', function(error, filelist){
          var title = 'WEB - select';
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
            <form action="/select_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><input type="text" name="description" placeholder="description"></p>
            <p><input type="text" name="author" placeholder="author"></p>
            <p>
              <input type = "submit">
            </p>
          `, '');
          response.writeHead(200);
          response.end(html);
        });
      } else if(pathname === '/select_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
          //body에다가 callback이 실행될때마다 data를 추가함.
        });
        //input 변수에다가 화면에서 값들을 받음.
        request.on('end', function(){
            var post = qs.parse(body);
            var input1 = post['title'];
            var input2 = post['description'];
            var input3 = post['author'];
            var mysql      = require('mysql');
            var conn = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '187f5391',
              database : 'o2'
            });
            conn.connect();
            var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
            var params = [input1, input2, input3];
            var description2 = "데이터가 입력되었습니다" + input1 + " " + input2 + " " + input3;
            var description3 = `
              <p>데이터가 입력되었습니다</p>
              <p>제목 : ${input1}</p>
              <p>설명 : ${input2}</p>
              <p>저자 : ${input3}</p>
            `
            //쿼리실행
            conn.query(sql, params, function(err, rows, fields){
                if(err) {
                console.log(err);
              } else {
                ////response.writeHead(302, {Location: `/?id=insertSuccessPage`}); //이거 주석처리하면 success가화면에뜸.
                //response.end('success'); //여기다가 글자 써봐 바로바로 화면에 바로바로바뀜.
                console.log(rows);
              }
            });
            fs.writeFile(`data/test3`, description3, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=test3`});
                response.end('success');
            });
            //console.log(post['title'])
             //이런방식으로 데이터 읽어와야함~!
            //qs는 쿼리스트링이라는 nodejs가 갖고있는 모듈을 가져오는 것임. ()맨위에 선언했음)
            //그 qs의 parse라는 함수에다가 body를 입력값으로 주면 post 데이터에 정보가 들어가게됨.
          });
      } else {
        response.writeHead(404);  //파일을 찾을수없다는 에러
        response.end('Not found'); //여기다가 글자 써봐 바로바로 화면에 바로바로바뀜.
    }
});
app.listen(3000);

//모듈이란? 기본적으로 제공하는 기능들을 그룹핑해놓은 그룹들..
//test
