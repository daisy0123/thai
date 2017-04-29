var express = require('express');
var nav = require('./navbar');
var router = express.Router();
var url = require('url');
var api=require('./utils/api');

router.get('/',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'research',
        point:'research',
        title: "热门搜索"
    };
    res.render('research/research', data);
});

router.get('/scenic',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'scenic',
        point:'research',
        title: "景点详情"
    };
    res.render('research/scenic', data);
});

router.get('/search/:scene_name',function(req,res){
    var params = url.parse(req.url, true).query;
    var scene_name=req.params.scene_name;
    var path='/search/search/?';
    var search_word={'search_word':scene_name};
    var data = {
        nav: nav.create(req),
        key: 'search',
        point:'research',
        title: "景点查询",
    };
    api.get(search_word,path).then(function (data) {
        console.log(data);
    });
    res.render('research/search', data);
});

module.exports = router;

