console.log(1+1);
cd = change directory
dir = 현재 디렉토리에 존재하는 파일들을 보여줌
node - v =
node 파일명 = 실행
cd 경로 = 경로 바꾸기

pm2 사용법
pm2는 패키지 매니저임.
소프트웨어를 관리해주는 도구.
콘솔창에서
pm2 start app.js <-- 시작
pm2 monit <-- 현재 실행되고 있는 프로그램을 보여줌.
pm2 stop main <-- main.js 종료
pm2 start main.js -- watch <--수정할떄마다 껐다안켜도되게하는거
pm2 log <-- 로그보여줌


template Literal
특수한 문자를 사용함.
syntax/template.js 참고.
문자 끊고 + ' ' 뭐이딴거 없이 그냥 쓸 수 있게됨.


모듈이란? 기본적으로 제공하는 기능들을 그룹핑해놓은 그룹들이라고 배웠다.
그러면 main.js에서 맨위에 var fs = require('fs'); 이건 뭘까?
fs 모듈은 filesystem의 약자로 파일 처리와 관련된 모듈이다.
이 모듈에는 메소드가 굉장히 많으니 직접 살펴보세요~! ex) fs.open()

API(Application Programming Interface)
