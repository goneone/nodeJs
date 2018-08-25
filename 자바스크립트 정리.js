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
