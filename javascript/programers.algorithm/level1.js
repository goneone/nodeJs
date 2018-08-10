//문제 https://programmers.co.kr/learn/courses/30/lessons/12903
//가운데 글자 가져오기
//내풀이

function solution(s) {
    var answer = '';
    //1.글자의 길이를 구함.
    if(s.length%2 != 0 ) { //홀수 일 때
       answer = s[s.length/2 -0.5]
    }
    else {  //짝수 일 때
        answer = s[s.length/2-1] + s[s.length/2]
    }

    return answer;
}

//substring을 이용한 두번째 풀이
