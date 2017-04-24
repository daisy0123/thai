var express = require('express');
var nav = require('./navbar');
var router = express.Router();
var api=require('./utils/api');

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
    var path="/search/search";
    //var url="http://192.168.203.94:8000/search/search?";
    var data={
        "search_word":word
    };
    api.send(path,"get",data).then(function (data) {
        res.json(data);
    });
});

module.exports = router;
