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
조회 누르고 검색 -> 검색시 옵션 변경후 페이지 바꿈 -> 이전데이터 값이 나와야 하는데 옵션 변경 값이 나옴
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
컬럼 안보이게하는 법
Top.Dom.selectById("HLMADCM002M_TableView2").setColumnsVisible([3,4],false);
---------------------------------------
Jquery를 이용해서 table의 column 컨트롤
공통의 setInnerText참조

var table = Top.dom.selectById("HLMADCM001T47_TableView")
var dom = table.getElement('.body-cell.column_'+11);
//$elem = $(dom)[2]
$(dom)[2].attributes["value"] = "5%";
$(dom)[2].textContent = "5%"; <--이게 화면에 뿌려주는거..

인스턴스 초기화
RLACRTM.reset('ILACRTM018M');
---------------------------------------
1개의 Job이 돌기 위해서 세개의 쓰레드가 돌아감.
배치는 10개 -> 쓰레드는 30개.

파일전송 대량 배치
300번 배치
제우스가 내렸다가 올라 갈 떄는 프로퍼티 파일을 읽고 들어감.
unit = 쓰레드 번호
procnt = 내가 돌릴 갯수
ex~path = 로고를 남길 경로

파일관련은 무조건 SLCMCOM002번 호출해서 구분자로 나뉜다.
Trang_GB = 현재 03만 사용함

302번에서 파일전송전에 한번 쏴서 기기 연결을 체크한다. ->그다음 306호출

MLMTCOM001에서 기기설정로그 - 파일 등 보냈을 때 로그를 저장함

Top랑 Po는 Json형식으로 데이터를 주고받음.

STMCMCOM005는 아웃바운드 공통 (소켓 통신하는거.)
*아웃바운드와 인바운드는 어디를 기준으로 두냐에 따라 다름.
예를들어 기기팀입장에서는 FAPC가 기기에 쏘는거니까 아웃바운드.

대용량 테이블에 쌓고 Json향식으로 SO에 보낼떄 blob으로.
인바운드 - 파일처리, 방범 등이 해당됨 (진행률 올라오는 거) ex)리더기 - wave 전송 진행률 표시

출입기기 실시간 모니터링
기기가 인바운드로 데이터 보냄 -> 인바운드 들어옴 v3->STV3CT001 데이터 패킷타입으로 변환.
어떤 이벤트가 수신 됐는지 판단. ->인바운드 받아서 %가 올라감.

토픽은 서버대 서버, 컨테이너 대 컨테이너 (토픽은 제우스가 지원, 일대다 도 가능)
웹소켓은 HTML이 지원. 서버와 화면 - 서버와 클라이언트가 다이렉트로 붙어있는 동안 통신.
정의 등 복잡한게 많아서 토픽은 지양함 but
대량처리 아웃바운드 - 토픽
        인바운드 - 웹소켓  -> 중공업의 이중화 처리 등의 이유 때문에 바뀜.

단위기기, 운영권한, 제어권한은 트리에 데이터를 다 들고 있음.
------------------------------------------------------------------
두 데이터 중복체크 로직
ex) 1,2,3,4,5,5 이렇게 있을때 5 발견하는 로직
function abc() {
for(var i = 0; i< a.length; i++) {
for(var j = 0; j<i ; j++) {
if(a[i] == a[j]) {
console.log(a[i]);
}
}}}
엑셀 다운로드 관련
------------------------------------------------------------------
1.대용량일경우(10000건이상 다운로드)
다운로드 엑셀버튼 클릭시에 db에서 1만개의 데이터를 가져옴.(서버 및 화면의 부하를 줄이기 위해 1만건만.)

2.db조회시의 조회 값을
Top.Controller.get('HLSCSDM003T14Logic').excelData = JSON.parse(JSON.stringify(repo[instance]));
이런식으로 전역변수 excelData에 받아둠.
그리고 엑셀 다운로드 버튼 클릭시에
commonexcelexport라는 공통 api호출할 때 3번째 인자 값으로 넣어줌.
------------------------------------------------------------------
