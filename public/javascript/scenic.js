$(function(){
    $(".scenic-navbar-ul>li").each(function () {
        $(this).click(function () {
            $href=$(this).children('a').attr('href');
            $offsetTop=$($href).offset().top-60;
            $("html,body").animate({scrollTop:$offsetTop},500);
            $(".scenic-navbar").addClass('fixed');
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    });
    $(window).scroll(function () {
        $winTop=$(".scenic-navbar").offset().top;
        console.log($winTop);
        if($winTop==0){
            $(".scenic-navbar").removeClass('fixed');
        }
    });
});