var nav = function(){
    return {
        nav : [
            {"href": "/", "label": "首页", "key": "index","faImg":"fa-home"},
            {"href": "/research/1", "label": "热门搜索", "key": "research","faImg":"fa-search"},
            {"href": "/article/1", "label": "推荐游记", "key": "article","faImg":"fa-file-text-o"},
            {"href": "/user/login", "label": "登录", "key": "login","faImg":"fa-user-circle"},
            {"href": "/user/register", "label": "注册", "key": "register","faImg":"fa-hand-o-right"}
        ],
        isLogin : false,
        account : ''
    };
};

module.exports = {
    'create' : function(req){
        var data = new nav();
        return data;
    }
};