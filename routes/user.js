var express = require('express');
var nav = require('./navbar');
var router = express.Router();
var api=require('./utils/api')

router.get('/register',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'register',
        point:'register',
        title: "用户注册"
    };
    res.render('user/register', data);
});

router.get('/login',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'login',
        point:'login',
        title: "用户登录"
    };
    res.render('user/login', data);
});

router.post('/register',function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = {account: username, password: password};
    var path = "";
    var pass = new Buffer(password);
    var password = pass.toString('base64');
    //console.log(s);
    // api.post(user,path).then(function (result) {
    //      if(result){}
    // });
    //console.log(user);
    //res.end();
});

router.post('/login',function (req,res) {
    var username=req.body.username;
    var password=req.body.password;
    var user={account:username,password:password};
    var path="";
    //var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
    //var s = b.toString();
    // api.post(user,path).then(function () {
    //
    // });
    //console.log(user);
    //res.end();
});

module.exports = router;

