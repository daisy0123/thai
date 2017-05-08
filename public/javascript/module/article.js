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

            var search_a=$(".search_a");
            var search_img=$(".search_img");
            var search_h2_a=$(".search_h2_a");
            var search_small_a=$(".search_small_a");

            api.send(url,"post",data).then(function (result){
                if(result=="404 NOT FOUND!!"){
                    alert("没有相关游记!!");
                } else if(result){
                    for(var i=0;i<result.length;i++){
                        search_a[i].setAttribute("href","/article/content/"+result[i].id);
                        search_img[i].setAttribute("src",result[i].picture);
                        search_img[i].setAttribute("alt",result[i].title);
                        search_h2_a[i].setAttribute("href","/article/content/"+result[i].id);
                        search_h2_a[i].innerHTML=result[i].title;
                        search_small_a[i].setAttribute("href","/article/content/"+result[i].id);
                        search_small_a[i].innerHTML=result[i].author;
                    }
                    $(".article-con").hide();
                    $(".search-con").show();
                }
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
            $(".search-con").hide();
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

