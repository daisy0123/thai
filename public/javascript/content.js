$(document).ready(function () {
    $(".show-btn").click(function () {
        $(".content-list").animate({
            margin:"-550px 0px"
        },1000, function () {
            $(".back-btn").animate({
                "margin": "-45px 0 0 0"
            },500);
            $(".con-title").animate({
                "opacity":"1"
            },500);
        });
    });
    $(".back-btn").click(function () {
        $(".content-list").animate({
            margin:"0"
        },1000, function () {
            $(".back-btn").animate({
                "margin": "0"
            },200);
            $(".con-title").animate({
                "opacity":"0"
            },200);
        });
    });
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
});