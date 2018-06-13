//자바스크립트에 내장된 함수들.
console.log(Math.round(1.6));

function sum(first, second) { //argument를 받아서 함수안으로 전달해주는 매개체를 parameter라함
 return first+second;
 //리턴을 만나면 함수가 즉시 종료됨
}

console.log(sum(2, 4)); //입력 값들을 argument라 함
