var express = require('express');
var nav = require('./navbar');
var router = express.Router();

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

router.get('/search',function(req,res){
    var data = {
        nav: nav.create(req),
        key: 'search',
        point:'research',
        title: "景点查询"
    };
    res.render('research/search', data);
});

module.exports = router;

