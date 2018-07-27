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
