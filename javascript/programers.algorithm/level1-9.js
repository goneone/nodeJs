//문제 https://programmers.co.kr/learn/courses/30/lessons/12931
//문자열 자릿수 더하기
//내풀이

function solution(n)
{
    var stringN= n+"";
    var answer = 0;

    for(var i = 0; i <stringN.length; i++ ) {
       answer +=  parseInt(stringN[i]);

    }

    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    console.log('Hello Javascript')
    return answer;
}
