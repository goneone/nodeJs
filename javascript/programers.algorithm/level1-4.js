//문제 https://programmers.co.kr/learn/courses/30/lessons/12948
//핸드폰 번호 가리기
//내풀이

function solution(phone_number) {
    var answer = '';
    var tempStar = '';
    if(phone_number.length >= 4 && phone_number.length <= 20) {
        for(var i=0; i < phone_number.length-4; i++) {
            tempStar += "*";
        }
        answer = tempStar + phone_number.substr(-4);
        return answer;
    }
}
