$(function () {
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
    $(".selection>li").click(function(){
        var liLen = 77;
        var left = $(this).index() * liLen + 1;
        $(".line-slide").animate({left: left + 'px'}, 200);
    });
    $(".backtotop").click(function(){
        $("html,body").animate({scrollTop: 0}, 500);
    });
});
myFocus.set({
    id: 'boxID',
    pattern: 'mF_games_tb',
    time: 3,
    trigger: 'click',
    height: 300,
    txtHeight: 'default'
});