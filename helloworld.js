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
