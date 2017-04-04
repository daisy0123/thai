var express = require('express');
var nav = require('./navbar');
var router = express.Router();

router.get('/',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'index',
        point:'index',
        title: "泰好玩首页"
    };
    res.render('index', data);
});

module.exports = router;
