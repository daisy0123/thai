/*
 * 后台 端获取数据
 */
var Q = require('q');
var request=require('request');
//var http=require('http');

var api = {
    "get": function send(url) {
        var deferred = Q.defer();

        //var options = {
        //    hostname: '10.173.41.207',
        //    port: 8000,
        //    path: path,
        //    method: method,
        //};
        //
        //var req = http.request(options, function (res) {
        //    console.log('STATUS: ' + res.statusCode);
        //    console.log('HEADERS: ' + JSON.stringify(res.headers));
        //    res.setEncoding('utf8');
        //    res.on('data', function (chunk) {
        //        console.log('BODY: ' + chunk);
        //        deferred.resolve(data);
        //    });
        //});
        //
        //req.on('error', function (e) {
        //    console.log('problem with request: ' + e.message);
        //    deferred.reject(e);
        //});
        console.log(url);
        //方式二
        request("http://10.173.41.207:8000/search/search/?search_word=曼谷", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) ;
                deferred.resolve(body);
            }
            console.log(error);
        });
        return deferred.promise;
    },
    "post": function (pageName) {
        var deferred = Q.defer();
        switch(pageName) {
            case 'index':{
                var commendPlace = function(){
                    return {
                        commendPlace : [
                            {"href": "/research/scenic","title":"斯米兰群岛1","src":"/image/index_sea/turtle.jpg","strong":"错过等半年 | 在斯米兰群岛，邂逅大海龟！"},
                            {"href": "/research/scenic","title":"斯米兰群岛2","src":"/image/index_sea/lanmiao.jpg","strong":"错过等半年 | 在斯米兰群岛，邂逅大海龟！"},
                            {"href": "/research/scenic","title":"斯米兰群岛3","src":"/image/index_sea/mangu.jpg","strong":"错过等半年 | 在斯米兰群岛，邂逅大海龟！"},
                            {"href": "/research/scenic","title":"斯米兰群岛4","src":"/image/index_sea/huangdidao.jpg","strong":"错过等半年 | 在斯米兰群岛，邂逅大海龟！"}
                        ]
                    };
                };
                deferred.resolve(commendPlace());
            }
        }
        return deferred.promise;
    }
};

module.exports = api;
