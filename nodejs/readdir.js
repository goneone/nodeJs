//특정 디렉토리의 파일목록을 배열형식으로 받아옴.
var testFolder = 'data';
//data디렉토리
var fs =require('fs');
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})
