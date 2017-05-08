define(function (require,exports,module) {
    var $=require('jquery');
    var api=require('api');

    var event={
        'searchdata': function (word) {
            var url="../../../searchword";
            var data={word:word};
            api.send(url,"post",data).then(function (result){
                if(result=="404 NOT FOUND!!"){
                    alert("没有该景点");
                }else if(result.id){
                    location.href="../../../research/scenic/"+result.scene_name;
                }else{
                    location.href="../../../research/search/"+result.scene_name;
                }
            });
        }
    }
    module.exports={
        "main":function(){
            this.init();
        },
        'init':function(){
            $(".span-search").click(function () {
                var searchWord=$(".search-input").val();
                $(".search-input").val(null);
                event.searchdata(searchWord);
            });
        }
    }
});
