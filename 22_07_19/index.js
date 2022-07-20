var express = require("express")
var app = express()
require('dotenv').config()

var session = require("express-session")
app.use(
    session({
        secret : process.env.session,
        resave : false,
        saveUninitialized : true,
        maxAge : 36000000
    })
)

app.set("views",__dirname+"/views")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname+"/public"))

// klaytn 설정
var Cavaer = require("caver-js")
var CaverExtKAS = require("caver-js-ext-kas")
var caver = new CaverExtKAS()

var keyringContainer = new caver.keyringContainer()
var keyring = keyringContainer.keyring.createFromPrivateKey(process.env.privatekey)
keyringContainer.add(keyring)

var accesskey = process.env.accesskey
var secretaccesskey = process.env.secretaccesskey
var chainId = 1001 //test net, 8217번이 메인넷
caver.initKASAPI(chainId, accesskey, secretaccesskey) // KAS 초기화
var kip7 = new caver.kct.kip7(process.env.token_address)
kip7.setWallet(keyringContainer)   // kip7내의 wallet 설정
// klaytn 설정 끝

// 송급 함수
async function token_trans(address, token){
    var receipt = await kip7.transfer(address, token, { 
        from : keyring.address
    })
    return receipt
}

// 조회 함수
async function balanceOf(address){
    var receipt = await kip7.balanceOf(address, {
        from : keyring.address
    })
    return receipt
}

// mysql 세팅
var mysql = require("mysql2")
var connection = mysql.createConnection({
    host : process.env.host,
    port : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})

app.get("/", function(req, res){
    res.render("main.ejs")
})

app.get("/main", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        res.render("index.ejs")
    }
})

app.post("/signin", function(req, res){
    var id = req.body._id
    var pass = req.body._pass
    console.log(id,pass)
    connection.query(
        `select * from user_list where ID = ? AND password = ?`,
        [id,pass],
        function(err, result){
            if(err){
                console.log(err)
                res.send("SQL Error")
            }else{
                if(result.length > 0){    // 로그인 성공
                    req.session.login = result[0]
                    res.redirect("/main")
                }else{
                    res.redirect("/")
                }
            }
        }
    )
})

app.get("/signup", function(req,res){
    res.render("signup.ejs")
})

app.post("/signup2", function(req, res){
    var id = req.body._id
    var pass = req.body._pass
    var wallet = req.body._wallet
    console.log(id, pass, wallet)
    // mysql data insert
    connection.query(
        `insert into user_list values (?, ?, ?)`,
        [id, pass, wallet],
        function(err){
            if(err){
                console.log(Err)
                res.send("signup insert error")
            }else{
                res.redirect("/")
            }
        }
    )
})

app.get("/add_car", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        res.render("add_car.ejs")
    }
})

app.post("/add_car2", function(req, res){
    var num = req.body._num
    var year = req.body._year
    var type = req.body._type
    console.log(num, year, type)
    // mysql insert
    connection.query(
        `insert into car_list(num, year, type) values (?,?,?)`,
        [num, year, type],
        function(err){
            if(err){
                console.log(err)
                res.send("add_car insert error")
            }else{
                res.redirect("/main")
            }
        }
    )
})

app.get("/list",function(req, res){
    if(!req.session.login){
        res.redirect("/main")
    }else{
        connection.query(
            `select * from car_list`,
            function(err,result){
                if(err){
                    console.log(err)
                    res.send("list select error")
                }else{
                    res.render("car_list.ejs", {
                        list : result
                    })
                }
            }
        )
    }
})

app.get("/trans", function(req, res){
    res.render("trans.ejs")
})

app.post("/trans2", function(req, res){
    var address = req.body._address
    var token = req.body._token
    token_trans(address, token).then(function(receipt){
        console.log(receipt)
        res.redirect("/trans")
    })
})

app.get("/balance", function(req, res){
    var address = "0x03e403de3c08420AC8e828E3be570CbFCA31Bdc0"
    balanceOf(address).then(function(result){
        console.log(result)
        res.send(result)
    })
})

// api통해서 지갑을 생성
app.get("/get_wallet", function(req,res){
    account = async () => {
        res.json(await caver.kas.wallet.createAccount())
    }
    account()
})

var port = 3000
app.listen(port, function(){
    console.log("서버 시작")
})