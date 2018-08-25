//문제 https://programmers.co.kr/learn/courses/30/lessons/12912
//두 정수 사이의 합
//내풀이

function solution(a, b) {
    var answer = 0;
    if(a==b) {
        answer= a;
    } else if(a<b) {
        for( var i = 0 ; i<b-a+1; i++) {
            answer += a+i
        }
    } else {
       for( var i = 0 ; i<a-b+1; i++) {
            answer += b+i
        }
    }
    return answer;
}
