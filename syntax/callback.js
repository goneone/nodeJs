/*function a() {
  console.log('a');
}
*/

//얘는 기능은 똑같지만 이름이 없음 얘가 익명함수.
var a = function () {
  console.log('a');
}

function slowfunc(callback) {
  callback();
}

slowfunc(a);
