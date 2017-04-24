/*
 * node 端获取数据
 */

define(function (require, exports, module) {
    var $=require('jquery');
    module.exports ={
        //ajax请求
        'send':function(url,type,data){
            var deferred = $.Deferred();
            $.ajax({
                url: url,
                type: type,
                data: data,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (e) {
                    deferred.reject(e);
                }
            });
            return deferred.promise();
        }

    };
});