/*
 * 后台 端获取数据
 */
var Q = require('q');
var request = require('request');

var api={
    "send" : function send(path,method, data){
        var deferred = Q.defer();


        var options = {
            hostname: 'http://192.168.203.94',
            port: 8000,
            path: path,
            method: method,
        };

        var req = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                deferred.resolve(data);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            deferred.reject(e);
        });

// write data to request body
//        req.write('data\n');
//        req.write('data\n');
        req.end();
        //deferred.resolve(str);
        //deferred.reject(e);
        return deferred.promise;
    }
}

module.exports = api;
