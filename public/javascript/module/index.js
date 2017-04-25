define(function (require, exports, module) {
    var api=require('api');
    var $ = require('jquery');

    var event={
        //数据赋值
        'datashow': function () {
            //获取index页面的信息
            var url="/indexdata";
            var data={"pageName":"index"};

            api.send(url,"post",data).then(function (data) {
                var commendPlace=data.commendPlace;
                //热门地点赋值
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
            ////搜索推荐赋值
            var indexCommend=$(".index-commend");
            var indexComLen=indexCommend.length;
            for(var i=0;i<indexComLen;i++){
                indexCommend[i].innerHTML="曼谷"+i;
            }

        },
        'searchdata': function (word) {
            var url="/searchword";
            var data={"word":word};
            api.send(url,"post",data).then(function (data) {
                console.log(data);
                alert(data);
            });
        }
    };

    module.exports={
        //实现
        'main':function(){
            //数据显示
            event.datashow();
            //事件效果
            this.init();
        },
        'init': function () {
           // $(".span-search").click(function () {
                //var searchWord=$(".index-search-text").val();
                event.searchdata("曼谷");
           // });
        }
    };

});
