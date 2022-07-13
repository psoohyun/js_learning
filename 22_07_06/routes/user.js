// route 설정
var express = require("express")
var router = express.Router()

//mysql 설정
var mysql = require("mysql2")
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "1234",
    database : "blockchain",
})

// login.ejs에서 ID, Password 값을 보내줬을때 api인
// post 형태의 /login api 생성
router.post("/", function(req, res){
    // login.ejs에서 보내준 데이터를 변수 지정
    // 변수의 데이터들을 mysql user_info 테이블에 값이 존재하는지 확인
    // 값이 존재하면 로그인 성공
    // 값이 존재하지 않으면 로그인 실패
    var input_id = req.body._id
    var input_pass = req.body._pass
    // mysql 데이터와 조회
    connection.query(
        `select * from user_info where user_id = ? and user_pass = ?`,
        [input_id, input_pass],
        function(err, result){
            if(err){
                console.log(err)
                res.send("sql Error")
            }else{
                if(result.length>0){
                    console.log("login success")
                    // res.render("main.ejs")///
                    res.redirect("/board")
                }else{
                    console.log("login failed")
                    res.redirect("/")
                }
            }
        }
    )

})

module.exports = router