/*
 * 后台 端获取数据
 */
var Q = require('q');
var http = require('http');
var querystring = require('querystring');

//全局变量
var hostname = "10.173.40.12";
var port = "8000";
var api = {
    "get": function send(data, path) {
        var deferred = Q.defer();
        var content = querystring.stringify(data);
        var options = {
            hostname: hostname,
            port: port,
            path: path + content,
            method: "get"
        };
        //console.log(options);
        //创建请求
        var req = http.request(options, function (res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS:' + JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            var str = '';
            res.on('data', function (data) {
                str = str + data;
            });
            res.on('end', function () {
                try {
                    console.log('响应结束');
                } catch (e) {
                    console.error(e.message);
                }
                deferred.resolve(JSON.parse(str));
            });
        });
        req.on('error', function (err) {
            console.error(err.message);
            deferred.reject(err);
        });
        req.end();

        return deferred.promise;
    },

    "post": function (path, pageName) {
        var deferred = Q.defer();
        var postData = querystring.stringify(pageName);
        var options = {
            hostname: hostname,
            port: port,
            path: path,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        var req = http.request(options, function (res) {
            console.log('Status:', res.statusCode);
            console.log('headers:', JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            var str = '';
            res.on('data', function (data) {
                str = str + data;
            });
            res.on('end', function () {
                try {
                    console.log('响应结束');
                } catch (e) {
                    console.error(e.message);
                }
                deferred.resolve(JSON.parse(str));
            });
        });
        req.on('error', function (err) {
            console.log(err.message);
            deferred.reject(err);
        });
        req.end();
        return deferred.promise;
    }
};

module.exports = api;
