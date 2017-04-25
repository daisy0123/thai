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
    //var path="/search/search/?search_word="+word;
    //res.json(word);
    var url="http://10.173.41.207:8000/search/search/?search_word="+word;
    api.get(url).then(function (data) {
        console.log(data);
        //res.json(data);
    });
});
router.post('/indexdata', function (req,res,next) {
    var pageName=req.body.pageName;
    api.post(pageName,"post").then(function (data) {
        res.json(data);
    });
});
module.exports = router;
