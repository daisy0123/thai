var express = require('express');
var nav = require('./navbar');
var router = express.Router();
var url = require('url');
var api=require('./utils/api');

router.get('/:page',function(req,res){
    var params = url.parse(req.url, true).query;
    var page=req.params.page;
    var path='/search/hotsearch/?';
    var search_word={'page': page};
    api.get(search_word,path).then(function (data) {
        var mess=new Array();
        for(var i=0;i<data.length;i++){
            mess[i]=JSON.parse(data[i]);
        }
        var research = {
            nav: nav.create(req),
            key: 'research',
            point:'research',
            title: "热门搜索",
            hotsearch: mess,
            page: page
        };
        res.render('research/research', research);
    });
});

router.get('/scenic/:scene_name',function(req,res){
    var params = url.parse(req.url, true).query;
    var scene_name=req.params.scene_name;
    var path='/search/search/?';
    var search_word={'search_word':scene_name};
    api.get(search_word,path).then(function (data) {
        var scenic = {
            nav: nav.create(req),
            key: 'scenic',
            point:'research',
            title: "景点详情",
            scenic:data
        };
        res.render('research/scenic', scenic);
    });
});
router.post('/chart',function(req,res) {
    var chartdata = req.body.scene;
    var path = '/search/search/?';
    var search_word = {'search_word': chartdata};
    api.get(search_word, path).then(function (data) {
        res.json(data);
    });
});

router.get('/search/:scene_name',function(req,res){
    var params = url.parse(req.url, true).query;
    var scene_name=req.params.scene_name;
    var path='/search/search/?';
    var search_word={'search_word':scene_name};
    api.get(search_word,path).then(function (data) {
        var scene = {
            nav: nav.create(req),
            key: 'search',
            point:'research',
            title: "景点查询",
            scene:data
        };
        res.render('research/search', scene);
    });
});

router.post('/comment',function(req,res){
    var scene=req.body.scene;
    var offset=req.body.offset;
    var lang=req.body.lang;
    var path='/search/get_comments/?';
    var search_word={'scene':scene,'offset':offset,"lang":lang};
    api.get(search_word,path).then(function (result) {
        var comment={
          data:result,
          lang:lang
        };
        res.json(comment);
    });
});

router.post('/translate/:scene/:index/:lang', function () {
    var scene=req.body.scene;
    var index=req.body.index;
    var lang=req.body.lang;
    var path='/search/get_translate/?';
    var search_word={'scene':scene,'index':index,"lang":lang};
    api.get(search_word,path).then(function (result){
        console.log(result);
        res.json(result);
    });
});

module.exports = router;

