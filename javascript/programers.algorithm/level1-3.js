//문제 https://programmers.co.kr/learn/courses/30/lessons/12944
//평균 구하기
//내풀이
function solution(arr) {
    var answer = 0;
    var sum = 0;
    if(arr.length >= 1 && arr.length <= 100) {
        for(var i = 0; i< arr.length; i++) {
            if(arr[i] >= -10000 && arr[i] <= 10000) {
               sum += arr[i];
               answer = sum/arr.length;
            }
        }
    }
    return answer;
}
