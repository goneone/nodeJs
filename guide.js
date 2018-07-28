cmd 창에서 nodejs 사용법
console.log(1+1);
cd = change directory
dir = 현재 디렉토리에 존재하는 파일들을 보여줌
node - v = nodejs 버전확인
node 파일명 = 실행 <--nodejs에서 파일을 실행하는 법임. ex) node test.js  (먼저 경로 바꿔줘야함~!)
cd 경로 = 경로 바꾸기
-------------------------------------------------------


--------------------------------------------------------
pm2 사용법
pm2는 패키지 매니저임.
소프트웨어를 관리해주는 도구.
콘솔창에서
cd C:\Users\Tmax\Desktop\nodejs 해줘야함
pm2 start app.js <-- 시작
pm2 monit <-- 현재 실행되고 있는 프로그램을 보여줌.
pm2 stop main <-- main.js 종료
pm2 start main.js -- watch <--수정할떄마다 껐다안켜도되게하는거
pm2 log <-- 로그보여줌
pm2 flush <-- log 지움.
--------------------------------------------------------
template Literal 이란?
특수한 문자를 사용함.
syntax/template.js 참고.
문자 끊고 + ' ' 뭐이딴거 없이 그냥 쓸 수 있게됨.
--------------------------------------------------------
모듈이란?
기본적으로 제공하는 기능들을 그룹핑해놓은 그룹들이라고 배웠다.
그러면 main.js에서 맨위에 var fs = require('fs'); 이건 뭘까?
fs 모듈은 filesystem의 약자로 파일 처리와 관련된 모듈이다.
이 모듈에는 메소드가 굉장히 많으니 직접 살펴보세요~! ex) fs.open()
--------------------------------------------------------
node - mysql 사용법
npm install --save node-mysql 설치
C:\Users\012\Documents\GitHub\nodeJs 경로변경
node database/database_mysql.js 실행

cmd 에서 접속
cd \Bitnami\wampstack-7.1.18-1\mysql
dir/w
cd bin
dir/w
mysql.exe
mysql -uroot -p
그담 비번
--------------------------------------------------------
데이터베이스 먼저 생성
cmd창에서 입력
*database는 테이블들을 그룹핑하는 일종의 폴더같은 것이다.
CREATE DATABASE o2 CHARACTER SET utf8 COLLATE utf8_general_ci;
SHOW DATABASES; 로확인
use o2; o2데이터베이스를 사용하겠
mysql에서 테이블 생성
cmd창에서 접속후 다음을 입력
CREATE TABLE topic ( id int(11) NOT NULL AUTO_INCREMENT, title varchar(100) NOT NULL, description text NOT NULL, author varchar(30) NOT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SHOW TABLES; 테이블 보기
insert into topic (title, description,author) values ('test', 'testing', 'testing');
데이터 삽입
--------------------------------------------------------
화면에서 create 클릭시 로직
1.db에서 콤보박스 값을 받아옴
db.query(`Select * from author`, function(error2,authors){
  ~~~~
}
2.db에서 받아온 값을 화면에 뿌려줌
${template.authorSelect(authors)}
3.화면에서 사용자가 값을 입력하고 데이터를 보냄
title,description, author를 create_process로 보냄.
4.create_process는 request.on('data', function(data))
{~~~~} 로 값을 받음. 이때
var body = '';
request.on('data', function(data){
    body = body + data;
    console.log("-----------create_process log------------------");
    console.log(body); //화면에서 입력한 값.
    console.log("-----------create_process log------------------");
});
body에는 title=5&description=444&author=3
이런식으로 데이터가 직렬화되어 저장됨
request.on('end', function(){
    var post = qs.parse(body);
qs는 쿼리스트링이라는 nodejs가 갖고있는 모듈임. (위에선언함)
그 qs의 parse함수에다가 body를 입력해주면
post데이터는 자바스크립트의 객체형식으로 바뀌는거같음.(내추측임..)
데이터는 {title : '5', description : '444', author : '3'} 이렇게 바뀜.
그럼 그 값을 이제 nodejs에서 컨트롤가능하겠지 객체니깐.
db.query(`
  INSERT INTO topic (title, description, created, author_id)
  VALUES(?, ?, NOW(), ?)`,
  [post.title, post.description, post.author],
이렇게 db에 값을 넣고 값이 저장됨.
그담 {Location: `/?id=${result.insertId}`}); 여기로 이동함.
그러면 밑의 로직을 탐.
  else {
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
이렇게 페이지를 그려줌. 끝!
