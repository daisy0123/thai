require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});

 var barOption = {
    title : {
        text: '词语频率显示',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        show:false,
        data:['']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01]
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['词语','词语','词语','词语','词语','词语','词语','词语','词语','词语','词语','词语']
        }
    ],
    series : [
        {
            name:'2011年',
            type:'bar',
            data:[18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970, 131744, 630230]
        }
    ]
};
var pieOption = {
    title : {
        text: '中',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'}
            ]
        }
    ]
};

// 使用
require(
    [
        'echarts',
        'echarts/chart/bar',
        'echarts/chart/pie'

    ],
    function (ec) {
        var barChart = ec.init(document.getElementById('bar-chart-page'));
        barChart.setOption(barOption);
        var pieChart = ec.init(document.getElementById('pie1-chart-page'));
        pieChart.setOption(pieOption);
        var pieChart = ec.init(document.getElementById('pie2-chart-page'));
        pieChart.setOption(pieOption);
        var pieChart = ec.init(document.getElementById('pie3-chart-page'));
        pieChart.setOption(pieOption);
    }
);