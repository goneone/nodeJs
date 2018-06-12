var fs = require('fs');
fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);
});

//파일을 읽는 코드임.
