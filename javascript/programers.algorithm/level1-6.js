//문제 https://programmers.co.kr/learn/courses/30/lessons/12906
//같은 숫자는 싫어
//내풀이
//엄청 헤맸음. 문제를 잘못읽어서...하..

function solution(arr)
{
    var original = []
    for(var i = 0;i < arr.length; i++){
        if(arr[i] !== arr[i+1]){
            original.push(arr[i])
        }
    }
    return original;
}
