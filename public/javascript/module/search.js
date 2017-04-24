define(function (require,exports,module) {
    var $ = require('jquery');
    var event={
        'myFocus': function () {
            myFocus.set({
                id: 'boxID',
                pattern: 'mF_games_tb',
                time: 3,
                trigger: 'click',
                height: 300,
                txtHeight: 'default'
            });
        }
    };

    module.exports={
        'main': function () {
            event.myFocus();
        }
    }
});

