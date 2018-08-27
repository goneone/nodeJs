//문제 https://programmers.co.kr/learn/courses/30/lessons/12933?language=javascript
//정수 내림차순으로 배치하기
//내풀이
function solution(n) {
    var answer ="";
    var stringN = n +"";
    var emptyArray =[];
    for (var z =0; z < stringN.length; z++) {
      emptyArray.push(stringN[z]);
    }
    for (var i = 0; i < emptyArray.length-1; i++) {
      for (var j = 0; j < emptyArray.length-1; j++) {
        if (emptyArray[j] > emptyArray[j+1]) {
          var temp;
          temp = emptyArray[j+1];
          emptyArray[j+1] = emptyArray[j];
          emptyArray[j] = temp;
        }
      }
    }
    for (var k= 0; k < emptyArray.length; k++ )  {
      answer += emptyArray[k]
    }
    answer = Number(answer);
    return answer;
}
