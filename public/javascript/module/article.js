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
        }
    };
    module.exports={
        "main":function(){
            event.hover3d();
        },
        'init':function(){

        }
    }
});

