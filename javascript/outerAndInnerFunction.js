function a() {
  var title = 'coding everyday';
  function b() {
    alert(title);
  }
}
//여기서 b는 내부함수 a는 외부함수.
//이거를 바꿔보면
function a() {
  var title = 'coding everyday';
  var b = function() {
  alert(title);
  }
}

//내부함수에서 외부함수의 지역변수에 접근가능하다.
//->이것이 클로저
//ex) 위에서 b함수에서 title 변수에 접근 한것처럼!
