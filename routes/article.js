var express = require('express');
var nav = require('./navbar');
var router = express.Router();

router.get('/',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'article',
        point:'article',
        title: "推荐游记"
    };
    res.render('article/article', data);
});

router.get('/content',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'content',
        point:'article',
        title: "游记内容"
    };
    res.render('article/content', data);
});

module.exports = router;

