define(function (require,exports,module) {
    var $=require('jquery');

    var event={
        //下拉显示游记
        "content_show": function () {
            $(".content-list").animate({
                margin:"-550px 0px"
            },1000, function () {
                $(".back-btn").animate({
                    "margin": "-40px 0 0 0"
                },500);
            });
        },
        //回到游记首页
        "backTo": function () {
            $(".content-list").animate({
                margin:"0"
            },1000, function () {
                $(".back-btn").animate({
                    "margin": "0"
                },200);
            });
        },
        //左右按钮滑动
        "leftRightChange": function () {
            var count=$(".con-content>ul").children("li").length+1;
            var allwidth=count * $(".con-content>ul").children("li").width()+1;
            $(".con-content>ul").width(allwidth);
            var page = 1;
            var i = 4;
            $("span.next-btn").click(function() {
                var $parent = $(this).parents("div.content-list");
                var $v_show = $parent.find("div.con-content");
                var v_width = $v_show.width();
                var len = $v_show.find("li").length;
                var page_count = Math.ceil(len / i);
                if (!$v_show.is(":animated")) {
                    if (page == page_count) {
                        $v_show.animate({
                            left: '-50px'
                        }, "slow");
                        page = 1;
                    } else {
                        $v_show.animate({
                            left: '-=' + v_width
                        }, "slow");
                        page++;
                    }
                }
            });
            $("span.prev-btn").click(function() {
                var $parent = $(this).parents("div.content-list");
                var $v_show = $parent.find("div.con-content");
                var v_width = $v_show.width();
                var len = $v_show.find("li").length;
                var page_count = Math.ceil(len / i);
                if (!$v_show.is(":animated")) {
                    if (page == 1) {
                        $v_show.animate({
                            left: '-=' + v_width * (page_count - 1)
                        }, "slow");
                        page = page_count;
                    } else {
                        $v_show.animate({
                            left: '+=' + v_width
                        }, "slow");
                        page--;
                    }
                }
            });
        },
        "ul_width":function(){
            var ul=$(".list-con");
            var li_num=ul.children("li").length;
            var ul_width=(li_num*400)+1;
            ul.width(ul_width);
        }
    };
    module.exports={
        'main': function () {
            event.leftRightChange();
            //事件效果
            this.init();
            event.ul_width();
        },
        'init': function () {
            $(".show-btn").click(event.content_show);
            $(".back-btn").click(event.backTo);
        }
    }
});