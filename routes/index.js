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

router.post('/searchword',function(req,res,next){
    var word = req.body.word;
    res.send(word);
    //var url="http://10.173.41.106:8080/search/search";
    //res.send("get",url,"曼谷");
});

module.exports = router;
