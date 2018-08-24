2018.08.24
-------------페이징처리-------------
1.동적 페이지네이션 - 페이지 별로 데이터를 나누어 받는 방식 - ex) 네이버 카페 같은건가?
2.정적 페이지네이션 - 전체 데이터를 한 번에 받는 방식.

이번 엑셀 대용량 다운로드는 전체 데이터(최대1만건)를 다 받아와서 그거를 엑셀에 넣는 작업.
엑셀 다운로드 버튼을 눌렀을때 조회버튼의 로직을 타서 전체 데이터를 조회하도록 함.
top API중 엑셀다운로드 공통 API인 Common_ExcelExport(arg0, arg1, arg2)는
arg0 : 테이블 아이디
arg1 : 팝업 여부(팝업에 위치한 테이블만 true, 아니면 false)
arg2 : 조회한 데이터 array
ex) common_ExcelExport('HLACRTM010M_TableView', false, ret.dto.SUB)
ex2)Top에서 JLSMSDM001M (기타기기관리) 1227line


------------해결해야 할것----------
리더기 - LCD배경이미지 하위기기 진행률이 스크롤을 내렸을 때 안보이게 됨.
ex) 40%(00:00:13) 이랬던게 스크롤 내렸다 올리면 40% 이렇게 됨.
원인 - virtual scroll적용으로 스크롤을 내릴때 테이블을 다시 그림.
조치 -
JLMADCM001T47의 381번째 라인 table_option_setting 추가해서
var column_option = {
  "11" : {
    event : {
      onCreated : funtion(index, data, nTd) {

      }
    }
  }
}
onCreated는 스크롤을 내리면 테이블을 다시 그리는데 다시그릴떄 onCreated 타고
그안에 로직수행함. 그래서 테이블 다시 그릴떄 데이터 받아와서 테이블에 그렸는데
테이블의 원래 로우가 아닌 스크롤이 내려간뒤의 로우에 데이터를 그림
이 문제 해결해야함.
--------------------------------------

메소드에서 메소드 호출할 때!
JLSMSDM001M 672번째 줄 참조.
Top.Controller.get("HLSMSDM001MLogic").table_data_binding(1);

ex)
table_option_setting : function {
  Top.Controller.get("HLSMSDM001MLogic").abcdegg();
}
abcdegg : function {}
---------------------------------------
조회 누르고 검색. -> 검색시 옵션 변경후 페이지 바꿈 -> 이전데이터 값이 나와야 하는데 옵션 변경 값이 나옴
해결 방법
JLSMSDM001M 674 Line 참조
조회시에는 searchEquipList 메소드를 타고
searchEquipList : function(event, widget) {
  Top.Controller.get('HLSMSDM001MLogic').table_data_binding(1);
}
페이지 넘길시에는 table_data_binding을 탐.

원인 - 옵션 변경후 페이지를 바꿀떄 table_data_binding에 바로가는데 변수가 다 거기 선언되어있어서
변경한 값을 물고 있음.
조치 - 임시변수를 searchEquipList에 선언함. (조회를 눌렀을떄 값을 물고 있도록)


---------------------------------------

Jquery를 이용해서 table의 column 컨트롤
공통의 setInnerText참조

var table = Top.dom.selectById("HLMADCM001T47_TableView")
var dom = table.getElement('.body-cell.column_'+11);
//$elem = $(dom)[2]
$(dom)[2].attributes["value"] = "5%";
$(dom)[2].textContent = "5%"; <--이게 화면에 뿌려주는거..


**************************************************
주말에 공부해야 할것
모델1, 모델2 차이점
지역변수 ? 그거 클로저.
게시판 기능 1개 추가.
**************************************************
27일 commit해야할것.
 -대용량 엑셀다운 작업한거 커밋.
 -절대로 47 리더기는 커밋하지 말것.
