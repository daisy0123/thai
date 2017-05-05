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
        "bar": function (word, score,id) {
            var barOption = {
                title: {
                    text: '词语评分显示',
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
                        data: word
                    }
                ],
                series: [
                    {
                        name: '评分',
                        type: 'bar',
                        data: score
                    }
                ]
            };
            require(
                [
                    'echarts',
                    'echarts/chart/bar',
                ],
                function (ec) {
                    var barChart = ec.init(document.getElementById(id));
                    barChart.setOption(barOption);
                }
            );
        },
        "pie": function (color,name,data,id) {
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
                    show:false,
                    orient: 'vertical',
                    x: 'left',
                    data: {}
                },
                color:color,
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
                        name: name,
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: data
                    }
                ]
            };
            require(
                [
                    'echarts',
                    'echarts/chart/pie'

                ],
                function (ec) {
                    var pieChart = ec.init(document.getElementById(id));
                    pieChart.setOption(pieOption);
                }
            );
        }
    };

    var self = {
        "add_com": function (result) {
            var add = "";
            for (var i = 0; i < 5; i++) {
                var star = "";var translate="";
                for (var j = 0; j < result.data.comments[i].score; j++) {
                    star = star + "<i aria-hidden='true' class='fa fa-star'></i>";
                }
                if(result.lang=="eng"||result.lang=="thai"){
                    translate="<button class='btn btn-default tranlation' id="+result.data.comments[i].index+">翻译</button> ";
                }
                add = add + "<div class='col-md-12'> " +
                    "<div class='media media-block comment-show'id="+result.lang+"> " +
                    "<div class='media-left'>" +
                    "<a href='#'><img src='" + result.data.comments[i].head + "' alt='...' class='media-object media-img'/></a> " +
                    "<p>" + result.data.comments[i].user_label + "</p><p>" + star + "</p></div> " +
                    "<div class='media-body'> " +
                    "<p>" + result.data.comments[i].content + "</p> " + translate+
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
                        if(result.adj_words){
                            var tag="";
                            for(var i=0;i<result.adj_words.words.length;i++){
                                tag=tag+"<span>"+result.adj_words.words[i]+"["+result.adj_words.values[i]+"]"+"</span>"
                            }
                            $(".comment-tag").append(tag);
                        }
                        if(result){
                            var add = self.add_com(result);
                            main.append(add);
                        }
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
            var url = "/research/chart";
            var scene = $(".scene_name").html();
            var data = {scene: scene};
            api.send(url, "post", data).then(function (result) {
                // 百度地图API功能
                var map = new BMap.Map("allmap");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(result.y,result.x), 11);  // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            });
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
            api.send(url, "post", data).then(function (result) {
                if((result.tag.bar.score.length)>0){
                    chart.bar(result.tag.bar.top_words, result.tag.bar.score,'bar-chart-page');
                }
                if((result.tag.pie.chi.data.length)>0){
                    chart.pie(result.tag.pie.chi.color,"中",result.tag.pie.chi.data,"pie1-chart-page");
                }
                if((result.tag.pie.eng.data.length)>0){
                    chart.pie(result.tag.pie.chi.color,"美",result.tag.pie.eng.data,"pie2-chart-page");
                }
                if((result.tag.pie.thai.data.length)>0) {
                    chart.pie(result.tag.pie.chi.color, "泰", result.tag.pie.thai.data, "pie3-chart-page");
                }
            });
        },
        'translate': function () {
            alert("ok")
        }
    };
    module.exports = {
        "main": function () {
            this.init();
            event.myFocus();
            event.srcollSlide();
            event.backToTop();
            event.chartTag();
            event.mapIn();
            commentfun.comment("chi");
            event.get_chart_data();
        },
        'init': function () {
            $(".selection>li").click(event.lineChange);

        }
    }
});
