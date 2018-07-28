var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password : 'root',
  database : 'opentutorials',
  port: '3307'
});
db.connect();


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){ //최상위경로라면.
      if(queryData.id === undefined){ //메인페이지라면
        db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(topics); // template.js에 있는 list프로퍼티의 함수
          var html = template.HTML(title, list, //template.html은 웹페이지의 가장 큰틀의 html코드를 만들어줌
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
        db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
         if(error){
           throw error; //에러가 있을 경우 nodejs가 그다음 명령을 실행시키지 않고 applications을 중지시킴.
         }
         db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, topic){
           //원래  `SELECT * FROM topic WHERE id=${queryData.id}` 이렇게 했었는데 보안상의 이유로
           //(`SELECT * FROM topic WHERE id=?`,[queryData.id] 이렇게 코딩할것.
           //위의 방식처럼 배열에 담아서 주게 되면 결과는 같지만 값이 sql문의 물음표에 치환되어 들어갈때 공격의 의도가 있는 코드들은 알아서 세탁해줌.
           if(error2){
             throw error2;
           }
           console.log("-------------topic-----------")
           console.log(topic);
           console.log("-------------topic-----------")
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `
            <h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `,
            ` <a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
                </form>`
          );
          response.writeHead(200);
          response.end(html);
         })
      });
      }
    } else if(pathname === '/create'){

      db.query(`SELECT * FROM topic`, function(error,topics){
        db.query(`SELECT * FROM author`, function(error2,authors){

          var title = 'Create';
          var list = template.list(topics);
          //form 태그란? 사용자의 데이터를 서버에 전송하는 방법.
          //form action="서버로 전송한 데이터를 수신할 url" method="데이터를 전송하는 방법"
          //밑의 html에서 select name=author로 시작하는 부분이 셀렉트 박스 만드는 부분임
          var html = template.HTML(title, list,
            `
             <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                  ${template.authorSelect(authors)}
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
          console.log("-----------create_process log------------------");
          console.log(body); //화면에서 입력한 값.
          console.log("-----------create_process log------------------");
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log("-----------222create_process log------------------");
          console.log(post);
          console.log("-----------2222create_process log------------------");
          db.query(`
            INSERT INTO topic (title, description, created, author_id)
            VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, post.author],
            function(error, result) {
              if(error) {
                throw error;
              }
              response.writeHead(302, {Location: `/?id=${result.insertId}`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();

            }
          )
      });
    } else if(pathname === '/update'){
      db.query('SELECT * FROM topic', function(error, topics){
       if(error){
         throw error;
       }
       db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
         if(error2){
           throw error2;
         }
         var list = template.list(topics);
         var html = template.HTML(topic[0].title, list,
           `
           <form action="/update_process" method="post">
             <input type="hidden" name="id" value="${topic[0].id}">
             <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
             <p>
               <textarea name="description" placeholder="description">${topic[0].description}</textarea>
             </p>
             <p>
               <input type="submit">
             </p>
           </form>
           `,
           `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
         );
         response.writeHead(200);
         response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log(post);
          db.query('UPDATE topic SET title=?, description=?, author_id=1 where id=?', [post.title, post.description, post.id], function(error, result){
              response.writeHead(302, {Location: `/?id=${post.id}`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();
            })
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          //qs는 쿼리스트링이라는 nodejs가 갖고 있는 모듈을 가져오는 것임. ()맨위에 선언했음.
          //그 qs의 parse라는 함수에다가 body를 입력값으로 주면 post 데이터에 정보가 들어가게 됨.
          var post = qs.parse(body);
          db.query('DELETE from topic where id=?', [post.id], function(error, result){
            if(error) {
              throw error;
            }
            response.writeHead(302, {Location: `/`});
            //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
            //create를 한 다음에 그 생성한 페이지로 이동하게끔!
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3003);
