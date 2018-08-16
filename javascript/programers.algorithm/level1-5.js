//문제 https://programmers.co.kr/learn/courses/30/lessons/12901
//2016년
//내풀이

function solution(a, b) {
    var answer = '';
    if(a >= 0 &&  a<=12) {
         if((a==1 || a==3 || a==5 || a== 7 || a== 8 || a==10 || a==12) && b<=31) {
            var date= new Date(2016, a-1, b);
            var weekday = date.getDay();
            var Day = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
            answer = Day[weekday];
         }else if((a==4 || a==6 || a==9 || a== 11) && b<=30) {
            var date= new Date(2016, a-1, b);
            var weekday = date.getDay();
            var Day = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
            answer = Day[weekday];
         }else {
            if(b<=29) {
            var date= new Date(2016, a-1, b);
            var weekday = date.getDay();
            var Day = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
            answer = Day[weekday];
            }
         }
    }
    return answer;
}
