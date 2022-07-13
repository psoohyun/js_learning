var express = require("express");
var app = express();

// 서버의 기본 세팅
app.set("views", __dirname + "/views");   // 브라우저에 화면을 만들 파일들은
                                          // __dirname(현재폴더) + "/views"
                                          // 현재폴더에서 하위폴더 views라는 폴더에 파일이 위치
app.set("view engine", "ejs");   // view 파일들을 ejs 엔진을 사용하여 오픈
                                 // ejs : html태크 파일을 열어주는 엔진
app.use(express.json());   // json 형식의 데이터를 사용
app.use(express.urlencoded({extended: false})); 
// post 형식 데이터를 받을때 True 패키지 새로 설치
// flase 형태일때는 추가 패키지 설치 필요 x

// api 구성
// api는 간단하게 음식점에 있는 메뉴판
// 음식점 -> 손님 메뉴 선택 -> 해당하는 음식
// 주소 -> 손님 주소에 접속(요청) -> 해당하는 파일을 보내주는 형식

// localhost:3000/ 접속(요청) 시
app.get("/",function(req,res){   // req : request, res : response
    // res.send("Hello World");    // "Hello World"를 응답 메세지로 보내주겠다.
    res.render("index.ejs");     // index.ejs 파일을 브라우저에 덮어준다.
                                 // index.ejs 파일의 위치는 현재폴더에서 하위폴더는 views 폴더에
});

// localhost:3000/second 접속 시
app.get("/second", function(req, res){
    // res.send("Second Page");
    // index.ejs 데이터를 보낸 부분은 req 안에 존재
    // GET 형식에서는 req.query 라는 부분에 데이터가 존재
    console.log(req.query);
    console.log(req.query.ID)
    console.log(req.query.pass)
    // id 값이 test이고 password값이 1234인 경우 로그인 성공
    // second.ejs 보여준다.
    // 둘중에 하나라도 값이 다르다면 index 페이지로 돌아간다.
    // 조건이 참이면 실행할 코드 거짓이면 실행할 코드
    if (req.query.ID == "test" && req.query.pass == "1234"){
        res.render("second.ejs"); // if 문의 두 조건이 모두 참이면
    }else{   // 조건 중 하나라도 거짓이면 인덱스 페이지 돌아간다.
        // res.render("index.ejs")
        res.redirect("/");   // 설정된 주소로 이동 -> localhost:3000 이동
    }
    // res.render("second.ejs");   // second.ejs 파일을 브라우저에 덮어준다.
});

app.post("/third", function(req, res){
    console.log(req.body);                      // POST 형식 통신 데이터는 body 부분 담겨서 보내준다.
                                                // GET 형식은 url에 데이터를 담아서 보내고 POST 형식은 body에 숨겨서 데이터를 보낸다.
    var input_name = req.body.user_name;    // body안에 user_name 키값이 가지고 있는 value 값을 변수에 삽입
    var input_phone = req.body.user_phone;  // body안에 user_phone 키값이 가지고 있는 value 값을 변수에 삽입
    console.log(input_name, input_phone);   // 변수에 데이터가 잘 들어갔는지 확인
    res.render("third.ejs",
    {
        name: input_name,
        phone : input_phone
    });                // third.ejs 파일을 렌더링
});

var port = 3000;
app.listen(port, function(){
    console.log("서버 시작");
});