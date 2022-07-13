var express = require("express")
var router = express.Router()

// api 구성
// localhost:3000/contract 기본 url
router.get("/", function(req,res){
    if(req.session.login){
        res.render("main.ejs")
    }else{
        res.redirect("/login")
    }
    // res.render("main.ejs")
})

module.exports = router