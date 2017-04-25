/*
 * 后台 端获取数据
 */
var Q = require('q');
var request = require('request');

var api={
    "send" : function send(url){
        var deferred = Q.defer();

        //方式一
        // var options = {
        //     hostname: 'http://192.168.203.94',
        //     port: 8000,
        //     path: path,
        //     method: method,
        // };
        //
        // var req = http.request(options, function(res) {
        //     console.log('STATUS: ' + res.statusCode);
        //     console.log('HEADERS: ' + JSON.stringify(res.headers));
        //     res.setEncoding('utf8');
        //     res.on('data', function (chunk) {
        //         console.log('BODY: ' + chunk);
        //         deferred.resolve(data);
        //     });
        // });
        //
        // req.on('error', function(e) {
        //     console.log('problem with request: ' + e.message);
        //     deferred.reject(e);
        // });
        //
        // req.end();
        //deferred.resolve(str);
        //deferred.reject(e);
        //方式二
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) ;
                deferred.resolve(body);
            }else if(error){
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }
};

module.exports = api;
