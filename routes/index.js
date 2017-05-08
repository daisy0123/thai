var express = require('express');
var nav = require('./navbar');
var router = express.Router();
var api=require('./utils/api');

router.get('/',function(req,res,next){
    var path="/search/home";
    api.post(path,null).then(function (data) {
        var index = {
            nav: nav.create(req),
            key: 'index',
            point:'index',
            title: "泰好玩首页",
            indexdata:data
        };
        res.render('index', index);
    });
    //api.get({},'/search/test').then(function(data){
    //    //res.render('404',{title:'404 Not Found!'});
    //    //res.redirect('404');
    //}, function (data) {
    //    console.log("no")
    //})
});

router.post('/searchword',function(req,res,next){
    var word = req.body.word;
    var path='/search/search/?';
    var data={'search_word':word};
    api.get(data,path).then(function (data) {
        res.json(data);
    });
});

module.exports = router;
