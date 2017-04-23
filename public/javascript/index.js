
$(document).ready(function () {
    var url="/searchword";
    var searchdata;
    //ajax获取数据
    var send= function (url,type,data) {
        $.ajax({
            url: url,
            type: type,
            dataType:"json",
            data:data,
            success: function(data){
                searchdata=data;
                alert(searchdata);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    };
    var data={"word":"曼谷"};
    send(url,"post",data);

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
    //热门地点赋值
    var data=commendPlace();
    var commendBlock=$(".commend-block");
    var length=commendBlock.length;
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
    //推荐游记赋值
    var media_a=$(".media-left a");
    var media_img=$(".media-left img");
    var media_title_a=$(".media-body a")
    var media_title=$(".media-body .media-heading")
    var media_name=$(".media-body .media-name")
    var media_intro=$(".media-body .media-intro")
    for(var i=0;i<4;i++){
        media_img[i].setAttribute("src",data.commendPlace[i].src);
        media_title[i].innerHTML=data.commendPlace[i].title;
    }
});