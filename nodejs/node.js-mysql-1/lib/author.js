var db = require('./db');
var template = require('./template.js');
var qs = require('querystring');

exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){ //여기서 function은 쿼리문이 실행된후에 실행될 콜백 함수임
        db.query(`SELECT * FROM author`, function(error2,authors){
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
              <form action="create_author_process" method="post">
               <p>
                <input type="text" name="name" placeholder="name">
               </p>
               <p>
                <textarea name="profile" placeholder="description"></textarea>
               </p>
               <p>
                <input type="submit">
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

exports.create_author_process = function(request, response){
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
