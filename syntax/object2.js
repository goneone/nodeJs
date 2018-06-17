//자바스크립트에서는 배열과 객체 모두 데이터를 담는 그릇이다.

//함수는 값이다! 함수를 변수에 넣을 수 있음.

//익명함수를 f변수에 담음
var f = function() {
  console.log(1+1);
  console.log(2+3);
}
//f(); //f 함수를 실행함.

var f2 = function() {
  console.log("a");
  console.log("b");
}

console.log("--------------------------------");
var a = [f];
a[0](); //배열의 원소로서  함수가 존재
console.log("--------------------------------");
var o = {
  func : f,
  func2 : f2
} //객체의 프로퍼티(원소)로서 함수가 존재 // 객체에 함수를 담을 수 있다~

o.func();
o.func2();
