/*
 * 后台 端获取数据
 */
var Q = require('q');
var http=require('http');
var querystring = require('querystring');

//全局变量
var hostname="10.173.40.121";
var port="8000";
var api = {
    "get": function send(data,path) {
       var deferred = Q.defer();
        //发送Get请求
        var data=data;
        var content=querystring.stringify(data);
        var options={
            hostname:hostname,
            port:port,
            path:path + content,
            method:'GET'
        }
        //创建请求
        var req=http.request(options,function(res){
            console.log('STATUS:'+res.statusCode);
            //console.log('HEADERS:'+JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            res.on('data',function(body){
                deferred.resolve(body);
            });
            res.on('end',function(){
                console.log('响应结束');
            });
        });
        req.on('error',function(err){
            deferred.reject(err);
        });
        req.end();
        return deferred.promise;
    },
    "post": function (pageName) {
        var deferred = Q.defer();
        //var postData=querystring.stringify(pageName);
        //var options={
        //    hostname:hostname,
        //    port:port,
        //    path:path,
        //    method:'POST',
        //    header:{
        //        //'Content-Type':'application/x-www-form-urlencoded',
        //        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        //        'Content-Length':Buffer.byteLength(postData)
        //    }
        //}
        //var req=http.request(options, function(res) {
        //    console.log('Status:',res.statusCode);
        //    console.log('headers:',JSON.stringify(res.headers));
        //    res.setEncoding('utf-8');
        //    res.on('data',function(body){
        //        deferred.resolve(body);
        //    });
        //    res.on('end',function(){
        //        console.log('响应结束');
        //    });
        //});
        //req.on('error',function(err){
        //    deferred.reject(err);
        //});
        //
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
