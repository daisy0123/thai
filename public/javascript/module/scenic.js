require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});
define(function (require, exports, module) {
    var $ = require('jquery');
    var myfocus = require('myfocus');
    var api = require('api');
    var chart = {
        "bar": function (word, score) {
            var barOption = {
                title: {
                    text: '词语频率显示',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    show: false,
                    data: ['']
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['词语', '词语', '词语', '词语', '词语', '词语', '词语', '词语', '词语', '词语', '词语', '词语']
                    }
                ],
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230]
                    }
                ]
            };
            require(
                [
                    'echarts',
                    'echarts/chart/bar',
                ],
                function (ec) {
                    var barChart = ec.init(document.getElementById('bar-chart-page'));
                    barChart.setOption(barOption);
                }
            );
        },
        "pie": function () {
            var pieOption = {
                title: {
                    text: '中',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告']
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
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
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'}
                        ]
                    }
                ]
            };
            require(
                [
                    'echarts',
                    'echarts/chart/pie'

                ],
                function (ec) {
                    var pieChart = ec.init(document.getElementById('pie1-chart-page'));
                    pieChart.setOption(pieOption);
                    var pieChart = ec.init(document.getElementById('pie2-chart-page'));
                    pieChart.setOption(pieOption);
                    var pieChart = ec.init(document.getElementById('pie3-chart-page'));
                    pieChart.setOption(pieOption);
                }
            );
        }
    };
    var add_comment = {
        "add_com": function (result) {
            var add = "";
            for (var i = 0; i < 5; i++) {
                var star = "";
                for (var j = 0; j < result.comments[i].score; j++) {
                    star = star + "<i aria-hidden='true' class='fa fa-star'></i>";
                }
                add = add + "<div class='col-md-12'> " +
                    "<div class='media media-block comment-show'> " +
                    "<div class='media-left'>" +
                    "<a href='#'><img src='" + result.comments[i].head + "' alt='...' class='media-object media-img'/></a> " +
                    "<p>" + result.comments[i].user_label + "</p><p>" + star + "</p></div> " +
                    "<div class='media-body'> " +
                    "<p>" + result.comments[i].content + "</p> " +
                    "<button type='submit' class='btn btn-default tranlation'>翻译</button> " +
                    "</div> </div> </div>";
            }
            return add;
        }
    };
    var commentfun = {
        "comment": function (lang) {
            var totalheight = 0;
            var main = $(".comment-content");
            var scene = $(".scene_name").html();
            var offset = -1;
            main.html(" ");
            $(window).scroll(function () {
                var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
                totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
                var add = "";
                if (($(document).height()) <= totalheight) {
                    var url = "/research/comment";
                    offset = offset + 1;
                    var data = {scene: scene, offset: offset, lang: lang};
                    api.send(url, "post", data).then(function (result) {
                        var add = add_comment.add_com(result);
                        main.append(add);
                    });
                }
            });
        }
    };
    var event = {
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
                $height = $("#scenic-intro").offset().top;
                $scroll = $(window).scrollTop();
                //console.log($scroll);
                if ($scroll >= 600) {
                    $(".backtotop").show();
                } else {
                    $(".backtotop").hide();
                }
            });
        },
        //回到顶部
        "backToTop": function () {
            $(".backtotop").click(function () {
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
        "lineChange": function () {
            $(this).siblings().removeClass("line_active");
            $(this).addClass("line_active");
            var lang = $(this).attr("id");
            var liLen = 77;
            var left = $(this).index() * liLen + 1;
            $(".line-slide").animate({left: left + 'px'}, 200);
            commentfun.comment(lang);
        },
        //地图的导入
        "mapIn": function () {
            var map = new BMap.Map("allmap");            // 创建Map实例
            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(point, 15);                 // 初始化地图,设置中心点坐标和地图级别。
            map.addControl(new BMap.ZoomControl());
        },
        "myFocus": function () {
            myFocus.set({
                id: 'boxID',
                pattern: 'mF_games_tb',
                time: 3,
                trigger: 'click',
                height: 300,
                txtHeight: 'default'
            });
        },
        "get_chart_data": function () {
            var url = "/research/chart";
            var scene = $(".scene_name").html();
            var data = {scene: scene};
            //api.send(url, "post", data).then(function (result) {
            //    console.log(result);
            //});
            chart.bar(null, null);
            chart.pie();
        }
    };
    module.exports = {
        "main": function () {
            event.myFocus();
            event.srcollSlide();
            event.backToTop();
            event.chartTag();
            event.mapIn();
            commentfun.comment("chi");
            event.get_chart_data();
            this.init();
        },
        'init': function () {
            $(".selection>li").click(event.lineChange);
        }
    }
});
