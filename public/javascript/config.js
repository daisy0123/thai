/**
 * RequireJS的配置
 */
requirejs.config({

    baseUrl : '/javascript',

    paths : {
        // 第三方库
        jquery : 'lib/jquery/dist/jquery.min',
        bootstrap : 'http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap',
        echarts : 'http://cdn.bootcss.com/echarts/3.2.3/echarts.min',

        // 工具函数
        api : 'utils/api',
        chart : 'utils/chart',


        // 模块
        'content': 'module/content',
        'index' : 'module/index',
        'scenic' : 'module/scenic',
        'search': 'module/search'

    },

    shim : {
        // 声明 bootstrap 加载前需要加载 jquery
        bootstrap : {
            deps : ['jquery']
        }
    }

});