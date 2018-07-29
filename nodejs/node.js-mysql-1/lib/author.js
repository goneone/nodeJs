

exports.home = function(request, response){
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
}
