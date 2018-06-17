//코드를 작성하는 과정에서 코드가 계속 늘어나게되면 그 코드를 정리정돈할 필요성이 생기게 된다.
//함수,배열 등을 정리정돈한게 객체, 객체를 정리한게 모듈임~!

/*var M = {
  v: '열공',
  f: function() {
    console.log(this.v);
  }
}*/

var part = require('./mpart.js')
//part 변수에 mpart.js의 모듈 결과를 담음.
console.log(part);
part.f();
