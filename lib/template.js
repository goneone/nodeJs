//코드를 작성하는 과정에서 코드가 계속 늘어나게되면 그 코드를 정리정돈할 필요성이 생기게 된다.
//함수,배열 등을 정리정돈한게 객체, 객체를 정리한게 모듈임~!





//객체에 있는 값 하나하나를 property 라고 한다.
module.exports = {
  //HTML : function , list : function 이게 객체화!인 것임.
   HTML : function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },

  list : function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },
}

//이렇게 할수도 있고
//module.exports = template; //이거는 약속. 그냥 그러려니해라.
//우리가 지금 만들고 있는 mpart.js의 여러 기능들 중에 M 객체를
//이 모듈 바깥에서도 사용 할 수 있도록 하겠다.는 의미
