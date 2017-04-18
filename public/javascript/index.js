
$(document).ready(function () {
    //模拟数据
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

    var data=commendPlace();
    var commendblock=$(".commend-block");
    var length=commendblock.length;
    var commendImg=$(".commend-img");
    var commendTitle=$(".commend-text-title");
    var commendStrong=$(".commend-strong");
    var commendMore=$(".command-more>span");
    var commendHref=$(".commend-href");
    for(var i=0;i<4;i++){
        commendTitle[i].innerHTML=data.commendPlace[i].title;
        commendImg[i].setAttribute("src",data.commendPlace[i].src);
        commendImg[i].setAttribute("alt",data.commendPlace[i].title);
        commendHref[i].setAttribute("href",data.commendPlace[i].href);
        commendStrong[i].innerHTML=data.commendPlace[i].strong;
        commendMore[i].innerHTML=data.commendPlace[i].title;
    }
});