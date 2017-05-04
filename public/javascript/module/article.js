define(function (require,exports,module) {
    var $=require('jquery');
    var api=require('api');
    var hover3d=require('hover3d');
    var event={
        "hover3d": function () {
            $(".project").hover3d({
                selector: ".project__card",
                shine: true,
            });
        },
        "search": function (word) {
            var url="/article/search/";
            var data={word:word};
            api.send(url,"post",data).then(function (result){
                //console.log(result);
            });
        },
        "redirect": function () {
            $(".project__card").click(function () {
                $img=$(this).children(".project__image");
                var href=$img.attr("href");
                location.href=href;
            });
        }
    };
    module.exports={
        "main":function(){
            event.hover3d();
            event.redirect();
            this.init();
        },
        'init':function(){
            $('.span-search').click(function () {
                var searchword=$('.search-input').val();
                event.search(searchword);
            });
        }
    }
});

