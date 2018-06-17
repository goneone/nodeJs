var members = ['egoing', 'k8805', 'hoya' ];
console.log(members[1]); //k8805

var i = 0;
for (var i = 0; i < members.length; i++) {
  console.log('1번 배열', members[i]);
}

var roles = {
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya',
 }
 console.log(roles.designer);

//객체를 반복문 쓰는 법
//객체는 키와 밸류형식으로 되어있음.
for(var orange in roles) {
  console.log('2번 배열 =>', orange, '2번 배열의 값 =>', roles[orange]);
}
