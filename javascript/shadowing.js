//함수 안에서 밖에서도 선언되었던 같은 이름의 변수를 사용하는 경우.
//함수 밖의 변수는 잠시 가려짐.(shadowing)
function example() {
  var a = 5;
  console.log(a);
}

var a = 8;
example();
console.log("-----------------------------");

function shadowing_example(){
  var = 0;
  console.log("F", val);
  val++;
}
var val= 0;
shadowing_example();
console.log("0", val);
