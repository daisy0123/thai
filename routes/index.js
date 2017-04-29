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
    var path='/search/search/?';
    var data={
        'search_word':word
    };
    api.get(data,path).then(function (data) {
        res.json(data);
    });
});
router.post('/indexdata', function (req,res,next) {
    var pageName=req.body.pageName;
    api.post(pageName).then(function (data) {
        res.json(data);
    });
});
module.exports = router;
