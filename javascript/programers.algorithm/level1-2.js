//문제 https://programmers.co.kr/learn/courses/30/lessons/12918
//문자열 다루기 기본
도움말

//내풀이

function solution(s) {
    var answer = true;
    var arr=[];
    if(s.length == 4 || s.length == 6 ) { //길이가 4나 6이면.
        for(var i=0; i<s.length; i++) {
            arr[i] = s.substring(i,i+1);
                if(isNaN(Number(arr[i])) == true) {
                return false;
                }else {
                    console.log("a");
                }
            }
    }else { answer = false;
    }
    return true;
}

//굳이 하나하나자르면서 isNaN 할필요없이 전체를다 isNaN 하면됨..;
