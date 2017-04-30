var express = require('express');
var nav = require('./navbar');
var url=require('url');
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

router.get('/content/:id',function(req,res){
    var params = url.parse(req.url, true).query;
    var id=req.params.id;
    //var path='/search/search/?';
    var search_word={'id': id};
    //api.get(search_word,path).then(function (data) {
    //    var scenic = {
    //        nav: nav.create(req),
    //        key: 'scenic',
    //        point:'research',
    //        title: "景点详情",
    //        scenic:data
    //    };
    //    res.render('research/scenic', scenic);
    //});
    var data = {
        nav: nav.create(req),
        key: 'content',
        point:'article',
        title: "游记内容"
    };
    res.render('article/content', data);
});

module.exports = router;

