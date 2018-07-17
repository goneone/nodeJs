//클로져의 private variable에 대한 설명이다.
//왜 쓰는 것인가?
//밑의 코드에서 title이라는 변수는 get_title이라는 메소드와
//set_title만 접근 할 수 있게되면 어떤 장점이 생기냐면.
//title 변수를 아무나 수정할 수 없기 떄문에
//다른 사람이 외부에서 어떤 의미로 사용하건간에 function factory_moive에 영향을 주지 않음.
//또 ghost.set_title('공각기동대'); 것처럼 title값을 변경 할 때
//변수의 값을 수정할때는 set_title을 통해서만 수정할 수 있고.
//변수의 값을 가져올때는 get_title을 통해서만 가져올수 있게 바꾼다던가할수있음
//데이터가 더 안전하게 저장되고 수정될수 있게 되는거임!.
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
            if(typeof _title === 'String') {
              title = _title
            } else {
              alert('문자열이 아님!')
            }

        }
    }
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');

alert(ghost.get_title());
alert(matrix.get_title());

ghost.set_title('공각기동대');

alert(ghost.get_title());
alert(matrix.get_title());
