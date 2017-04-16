var express = require('express');
var nav = require('./navbar');
var router = express.Router();

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

module.exports = router;

