var MYAPP = {} //전역변수이자 객체임
MYAPP.calculator = { //calculator 속성을 정의
    'left' : null,
    'right' : null
}
MYAPP.coordinate = { //coordinate는 좌표라는뜻임..ㅎ //
    'left' : null, //left와 right 는 위의 calculator와 변수명이 똑같음
    'right' : null
}

MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum(){
    return MYAPP.calculator.left + MYAPP.calculator.right;
}
document.write(sum());

//위에를 밑에코드로 바꿔주게되면!
//MYAPP은 전역변수가 아니라 함수의 지역변수가 됨.
//정의후 바로 호출함. ->이게 바로 익명함수임!
(function() {
var MYAPP = {} //전역변수이자 객체임
MYAPP.calculator = { //calculator 속성을 정의
    'left' : null,
    'right' : null
}
MYAPP.coordinate = { //coordinate는 좌표라는뜻임..ㅎ //
    'left' : null, //left와 right 는 위의 calculator와 변수명이 똑같음
    'right' : null
}

MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum(){
    return MYAPP.calculator.left + MYAPP.calculator.right;
}
document.write(sum());
}())
