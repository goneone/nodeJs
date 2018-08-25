//문제 https://programmers.co.kr/learn/courses/30/lessons/12916?language=javascript
//문자열 내 p와 y의 개수
//내풀이

function solution(s){
    var lowercaseS = s.toLowerCase()
    //문자열에서 p or y의 개수를 구하는 function
    function split(lowercaseS, value) {
          lowercaseS.split(value);
          return lowercaseS.split(value).length-1;
        }
    //p와 y가 문자열에 없으면 true 리턴
    if(lowercaseS.indexOf("p")== -1 && lowercaseS.indexOf("y")== -1 ) {
       return true;
    } else {
        var valueP = split(lowercaseS, "p")
        var valueY = split(lowercaseS, "y")

        if (valueP == valueY ) { return true; }
        else { return false; }
    }
}
