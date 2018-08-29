var db = require('./db');
var template = require('./template.js');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
        db.query(`SELECT * FROM author`, function(error2,authors){
          var title = 'author';
          var list = template.list(topics); // template.js에 있는 list프로퍼티의 함수
          var totalCount = authors.length; //총 게시물 수
          var countList =  10;//한 페이지에 출력될 게시물 수
          var totalPage = Math.ceil(totalCount/countList); //3ppage
            if (totalCount % countList > 0) {
              totalPage =Math.ceil(totalPage);
            }
          var html = template.HTML(title, list, //template.html은 웹페이지의 가장 큰틀의 html코드를 만들어줌
            `
              ${template.authorTable(authors)}
            <style>
              table {
                border-collapse:collapse;
              }
              td{
                border: 1px solid black;
              }
            </style>
             <p>
              ${template.paging(totalPage)}
             </p>
            <form action="/author/search_author" method="post">
             <p>
              <input type="text" name="searchAuthorName" placeholder="Search Name!">
             </p>
             <p>
              <input type="submit" value="searchAuthorName">
             </p>
            </form>

            <form action="/author/create_process" method="post">
             <p>
              <input type="text" name="name" placeholder="name">
             </p>
             <p>
              <textarea name="profile" placeholder="description"></textarea>
             </p>
             <p>
              <input type="submit" value="create">
             </p>
            </form>
            `,
            ``
          );
          response.writeHead(200);
          response.end(html);
        });
      });
}

exports.create_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
          console.log("-----------/author/create_process log------------------");
          console.log(body); //화면에서 입력한 값.
          console.log("-----------/author/create_process log------------------");
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log("-----------222/author/create_process log------------------");
          console.log(post);
          console.log("-----------222/author/create_process log------------------");
          db.query(`
            INSERT INTO author (name, profile)
              VALUES(?, ?)`,
            [post.name, post.profile],
            function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/author`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();
            }
          )
      });
}

exports.update = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
        db.query(`SELECT * FROM author`, function(error2,authors){
          var _url = request.url;
          var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
          db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function(error3,author){
            var title = 'author';
            var list = template.list(topics); // template.js에 있는 list프로퍼티의 함수
            var html = template.HTML(title, list, //template.html은 웹페이지의 가장 큰틀의 html코드를 만들어줌

              `
                ${template.authorTable(authors)}
              <style>
                table {
                  border-collapse:collapse;
                }
                td{
                  border: 1px solid black;
                }
              </style>
              <form action="/author/update_process" method="post">
               <p>
                <input type="hidden" name="id" value="${queryData.id}">
               </p>
               <p>
                <input type="text" name="name" value="${sanitizeHtml(author[0].name)}" placeholder="name">
               </p>
               <p>
                <textarea name="profile" placeholder="description">${sanitizeHtml(author[0].profile)}</textarea>
               </p>
               <p>
                <input type="submit" value="update">
               </p>
              </form>
              `,
              ``
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      });
}

exports.update_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
          console.log("-----------/author/update_process log------------------");
          console.log(body); //화면에서 입력한 값.
          console.log("-----------/author/update_process log------------------");
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log("-----------222/author/update_process log------------------");
          console.log(post);
          console.log("-----------222/author/update_process log------------------");
          db.query(`
            UPDATE author SET name=?, profile=? WHERE ID=?`,
            [post.name, post.profile, post.id],
            function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/author`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();
            }
          )
      });
}

exports.delete_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
          console.log("-----------/author/delete_process log------------------");
          console.log(body); //화면에서 입력한 값.
          console.log("-----------/author/delete_process log------------------");
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log("-----------222/author/delete_process log------------------");
          console.log(post);
          console.log("-----------222/author/delete_process log------------------");
          db.query(`
            DELETE from author WHERE id=?`,
            [post.id],
            function(error, result){
              if(error){
                throw error;
            }
              response.writeHead(302, {Location: `/author`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();
            }
          )
      });
}

exports.customizing_delete_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
          console.log("-----------/author/customizing_delete_process log------------------");
          console.log(body);
          console.log("-----------/author/customizing_delete_process log------------------");
      });
      request.on('end', function(){
          var post = qs.parse(body);
          console.log("-----------222/author/customizing_delete_process log------------------");
          console.log(post);
          console.log("-----------222/author/customizing_delete_process log------------------");
          db.query(`DELETE from topic WHERE author_id=?`, [post.id],function(error1, result1){
            if(error1) {
              throw error1;
            }
            db.query(`DELETE from author WHERE id=?`, [post.id], function(error2, result2){
              if(error2){
                throw error2;
              }
              response.writeHead(302, {Location: `/author`});
              //200은 성공, 302는 다른페이지로 리다이렉션시키라는 뜻
              //create를 한 다음에 그 생성한 페이지로 이동하게끔!
              response.end();
            })
          });
        });
      }

//내가만든 검색창..
exports.search_author = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        console.log("-----------search_author log------------------");
        console.log(post);
        console.log("-----------search_author log------------------");
    db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
          db.query(`SELECT * FROM author where name LIKE ?`,['%'+post.searchAuthorName+'%'],function(error2,authors){
            var title = 'author';
            var list = template.list(topics); // template.js에 있는 list프로퍼티의 함수
            var html = template.HTML(title, list, //template.html은 웹페이지의 가장 큰틀의 html코드를 만들어줌
              `
                ${template.authorTable(authors)}
              <style>
                table {
                  border-collapse:collapse;
                }
                td{
                  border: 1px solid black;
                }
              </style>
              <form action="/author/search_author" method="post">
               <p>
                <input type="text" name="searchAuthorName" placeholder="Search Name!">
               </p>
               <p>
                <input type="submit" value="searchAuthorName">
               </p>
              </form>

              <form action="/author/create_process" method="post">
               <p>
                <input type="text" name="name" placeholder="name">
               </p>
               <p>
                <textarea name="profile" placeholder="description"></textarea>
               </p>
               <p>
                <input type="submit" value="create">
               </p>
              </form>
              `,
              ``
            );
            response.writeHead(200);
            response.end(html);
        });
      });
    });
}

/*exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //url을 분석하는 코드.
    db.query(`SELECT * FROM author`, function(error,authors){  //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
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
         var title = topic[0].title;
         var description = topic[0].description;
         var list = template.list(topics);
         var html = template.HTML(title, list,
           //form 태그란? 사용자의 데이터를 서버에 전송하는 방법.
           //form action="서버로 전송한 데이터를 수신할 url" method="데이터를 전송하는 방법"
           //밑의 html에서 select name=author로 시작하는 부분이 셀렉트 박스 만드는 부분임
           `
           <h2>${sanitizeHtml(title)}</h2>
           ${sanitizeHtml(description)}
           <p>by ${sanitizeHtml(topic[0].name)}</p>
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
}*/
