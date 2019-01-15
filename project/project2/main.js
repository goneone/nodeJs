window.onload = function(){
    var previousButton = document.getElementById('previousButton');
    previousButton.addEventListener('click', function(){
        location.href = "http://www.naver.com";
    })

    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function(){
      validationCheck();


    })

    var deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function(){
        alert('Hello world');
    })

}

var validationCheck = function() {
  if(a!=null && b!=null && c!=null ) {
    //서비스 호출
  } else {
    alert("빈 값이 있으면 안됩니다")
  }
}
