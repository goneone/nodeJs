//addEventListener는 이벤트를 등록하는거임. 클릭했을때의 이벤트를.
//function 에 매개변수(evt)를 받을수 있음. 이벤트정보를 받는거임.
var el = document.getElementById("outside");
el.addEventListener("click", function(evt){
 console.log(evt.target);
 console.log(evt.target.nodeName);
}, false);


function random(number) {
  return Math.floor(Math.random()*(number+1));
}



var button = document.querySelector('button');
button.onclick = function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
