//콘솔에서의 입력값 받기!
var args = process.argv;
//배열형식으로 데이터를 받음.
//2번째 자리에 내가 입력한 값을 넣음.
console.log(args[2]);

console.log('A');
console.log('B');
if(args[2] === '1') {
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');
