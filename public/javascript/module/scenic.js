define(function (require,exports,module) {
    var $=require('jquery');
    var myfocus=require('myfocus');

    var event={
        //顶部导航滚动监听
        "srcollSlide": function () {
            $(".scenic-navbar-ul>li").each(function () {
                $(this).click(function () {
                    $href = $(this).children('a').attr('href');
                    $offsetTop = $($href).offset().top - 60;
                    $("html,body").animate({scrollTop: $offsetTop}, 500);
                    $(".scenic-navbar").addClass('fixed');
                    $(this).siblings().removeClass("active");
                    $(this).addClass("active");
                });
            });
            $(window).scroll(function () {
                $winTop = $(".scenic-navbar").offset().top;
                if ($winTop == 0) {
                    $(".scenic-navbar").removeClass('fixed');
                }
                $height=$("#scenic-intro").offset().top;
                $scroll=$(window).scrollTop();
                console.log($scroll);
                if($scroll>=600){
                    $(".backtotop").show();
                }else{
                    $(".backtotop").hide();
                }
            });
        },
        //回到顶部
        "backToTop": function () {
            $(".backtotop").click(function(){
                $("html,body").animate({scrollTop: 0}, 500);
            });
        },
        //图表分析tag切换
        "chartTag": function () {
            $(".analyse-title>span").each(function () {
                $(this).click(function () {
                    $sectionName = $(this).attr('id');
                    $showPage = $('#' + $sectionName + '-page');
                    $showPage.siblings().hide();
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $showPage.show();
                });
            });
        },
        //评论区导航的样式
        "lineChange":function(){
            $(".selection>li").click(function(){
                var liLen = 77;
                var left = $(this).index() * liLen + 1;
                $(".line-slide").animate({left: left + 'px'}, 200);
            });
        },
        //地图的导入
        "mapIn": function () {
            var map = new BMap.Map("allmap");            // 创建Map实例
            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。
            map.addControl(new BMap.ZoomControl());
        },
        "myFocus":function(){
            myFocus.set({
                id: 'boxID',
                pattern: 'mF_games_tb',
                time: 3,
                trigger: 'click',
                height: 300,
                txtHeight: 'default'
            });
        }
    }
    module.exports={
        "main":function(){
            event.myFocus();
            event.srcollSlide();
            event.backToTop();
            event.chartTag();
            event.lineChange();
            event.mapIn();
        }
    }
});
