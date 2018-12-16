var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function() {
  console.log(this.responseText);
});

oReq.open("GET", "/ajaxText.js"");
oReq.send();



/*
콜백함수
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
*/
