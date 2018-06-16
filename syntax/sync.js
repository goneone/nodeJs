//동기와 비동기의 차이.
var fs = require('fs');
//fs모듈을 불러와서 fs변수라는 이름을 붙임.

//readFileSync
/*console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
//읽고자하는 파일의 이름을 넣음.
console.log(result);
console.log('C');
*/

//비동기 방식
//readfile은 비동기방식 readfileSync는 동기방식임.
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result) {
//함수를 세번쨰 인자로 주면. nodeJs가 sample.txt 파일을 읽는 작업이 끝나면
//nodejs가 저 함수를 실행시킴. 첫번쨰인자에는 에러를 인자로 제공하고 두번쨰 파라미터에는
//파일의 내용은 인자로서 공급해주도록 약속되어 있음.


//callback함수란?
//위에 코드를 보면 nodeJs에게 야 니가 갖고있는 readfile로 파일읽어와 작업 끝난다음에
//내가너한테 전달한 3번째 인자인 함수를 실행시켜
// nodeJs는 파일을 읽은 다음에 함수를 호출함.
//이게 callback. 나중에 전화해.  파일을 읽은 다음에 호출하는 것을 통해서 나를 불러라~ 
 console.log(result);
});
console.log('C');
