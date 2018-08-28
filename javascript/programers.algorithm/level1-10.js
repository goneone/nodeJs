//문제 https://programmers.co.kr/learn/courses/30/lessons/12933?language=javascript
//정수 오름차순으로 배치하기
//내풀이
//버블정렬로 풀었음 -> 근데 이건느림.. ->다른 방법
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

//정수 내림차순으로 배치하기
function solution(n) {
  var answer ="";
  n = n+"";
  var arrayN = []; //인자로 들어온 n을 배열으로 바꿈.
  for (var i = 0; i < n.length; i++) {
    arrayN.push(n[i]);
  }
  for (var j = 0; j < arrayN.length; j++) {
    for (var k = 0; k < arrayN.length; k++) {
      if(arrayN[k] < arrayN[k+1]) {
        var temp;
        temp = arrayN[k+1];
        arrayN[k+1] = arrayN[k];
        arrayN[k] = temp;
      }
    }
  }
  console.log(arrayN)
  for (var m= 0; m < arrayN.length; m++ )  {
    answer += arrayN[m]
  }
  answer = Number(answer);
  return answer;
}
