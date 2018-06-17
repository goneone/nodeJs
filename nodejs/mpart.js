var M = {
  v: '열공',
  f: function() {
    console.log(this.v);
  }
}

M.f();

module.exports = M; //이거는 약속. 그냥 그러려니해라.
//우리가 지금 만들고 있는 mpart.js의 여러 기능들 중에 M 객체를
//이 모듈 바깥에서도 사용 할 수 있도록 하겠다.는 의미
