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
