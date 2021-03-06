1.자바 Mysql 연동시에 고생한...2018/09/01

1-1
현상
과장님이 주신 과제프로젝트(kt)에서 클라이언트가 보낸 내용을 바이트로 바꿔서 소켓을 통해 서버가 읽고
db에 해당 내용을 파싱하는 과정을 진행 중에 발생함.
mysql-connector-java-8.0.12.jar 드라이버 버전
이클립스는 oxyzen
mysql은 8.0

해당 오류
Exception in thread "main" java.sql.SQLException:
The server time zone value '´???¹?±¹ ???Ø½?' is unrecognized or represents more than one time zone.
You must configure either the server or JDBC driver (via the serverTimezone configuration property)
to use a more specifc time zone value if you want to utilize time zone support.

이유
서버 표준 시간대 값 'KST'이 인식되지 않거나 둘 이상의 표준 시간대를 인식한 경우 이다.
mysql-connector-java 버전 5.1.X 이후 버전부터 KST 타임존을 인식하지 못하는 이슈가 있다.
이 경우 MySQL 서버에서 타임존 설정을 하거나 다음과 같이 표준 시간대 값을 serverTimezone을 이용하여 JDBC 드라이버 URL을 구성해야한다.

해결책
conn = DriverManager.getConnection("jdbc:mysql://localhost:3307/opentutorials?" , "root", "root"); -> 밑으 코드로 변경
conn = DriverManager.getConnection("jdbc:mysql://localhost:3307/opentutorials?characterEncoding=UTF-8&serverTimezone=UTC" , "root", "root");
JDBC URL에 위와 같이 파라미터를 추가하면 끝.

1-2
현상, 오류
mysql-connector-java 버전 6.xx로 변경하면 com.mysql.jdbc.Driver가 Deprecated 됐다고 경고메시지가 뜸

이유
버전바뀌면서 serverTimezone파라미터가 필수가 돼서 빼먹으면 DB연결이 되지않음

해결책
com.mysql.jdbc.Driver를 com.mysql.cj.jdbc.Driver로 변경
기본적으로 DB연결시 jdbc:mysql://{ip주소}:{port번호}/{databaseName} 식으로 url을 설정해서  연결했었는데
jdbc:mysql://{ip주소}:{port번호}/{databaseName}?serverTimezone=UTC
위와같이 serverTimezone 파라미터를 꼭 넣어주어야 한다.

docs링크
https://dev.mysql.com/doc/relnotes/connector-j/6.0/en/news-6-0-6.html
