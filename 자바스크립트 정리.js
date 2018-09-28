자바스크립트 API ---- https://developer.mozilla.org/ko/docs/Web/API
------------------------------------------------------------
문자열 관련 function
split
var a="test"
a.split("t"); ---> 리턴 값 = ["", "es", ""]  ----배열에 쪼갠값을 담아서 return함
a.charAt(2);  ---> 리턴 값 = s --- 2번째 문자를 반환(0부터 시작함.)
a.substring(0,2) --->리턴 값 = te --- 0번째부터 2개 반환.
a.indexOf("t") ---> 리턴 값 =  0 --- 해당 문자에 몇번째인지 반환. 여러개 있으면 맨 앞에꺼 반환함.

--------------------------------------------------------
한 문자 내에 특정 문자열이 몇 번 등장하는지 세는 함수.
.split으로 그 문자열으로 짤라서 배열크기 -1하면됨.
ex)
function countChar(sourceString,targetString) {
return (sourceString.split(targetString).length-1);
}
document.write(countChar("가나다ABC라마 ABC 바사ABC 아자차 ","ABC"));
--------------------------------------------------------
자바스크립트 개신기한점..
var a= "test";
a[0] = t 임...
a는 var로 선언한건데 어째서..?
--------------------------------------------------------
두 데이터 중복체크 로직
ex) 1,2,3,4,5,5 이렇게 있을때 5 발견하는 로직
function abc() {
for(var i = 0; i< a.length; i++) {
for(var j = 0; j<i ; j++) {
if(a[i] == a[j]) {
console.log(a[i]);
}
}}}
엑셀 다운로드 관련
---------------------------------------------------------
function의 스코프
체크 로직 할 때  ex
save : function() {
  this.duplicationCheck(check);

  if(check == false) {
    return;
  }
},

duplicationCheck : function(check) {
  if(값이 5보다 작으면~~)
    check =false;
    return false;
}

duplicationCheck 함수의 return은 그함수만 딱 끝내는거임. 그래서
save function의 경우는 duplicationCheck 함수가 실행되고 그밑에줄이 계속실행 되게됨.
딱 duplicationCheck함수만 실행후 그 밑에 줄 실행 안하고 종료하고 싶다면
if(check == false) { return } 이런식으로 save 함수 로직내에서 return을 해줘야함.

함수의 스코프! 기억할것
----------------------------------------------------------
