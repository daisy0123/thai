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
        "bar": function (word, score, id) {
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
        "pie": function (color, name, data, id) {
            var pieOption = {
                title: {
                    text: name,
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    x: 'left',
                    data: {}
                },
                color: color,
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
                var star = "";
                var translate = "";
                for (var j = 0; j < result.data.comments[i].score; j++) {
                    star = star + "<i aria-hidden='true' class='fa fa-star'></i>";
                }
                if (result.lang == "eng" || result.lang == "thai") {
                    translate = "<button class='btn btn-default tranlation' id=" + result.data.comments[i].index + ">翻译</button> ";
                }
                add = add + "<div class='col-md-12'> " +
                    "<div class='media media-block comment-show'id=" + result.lang + "> " +
                    "<div class='media-left'>" +
                    "<a href='#'><img src='" + result.data.comments[i].head + "' alt='...' class='media-object media-img'/></a> " +
                    "<p>" + result.data.comments[i].user_label + "</p><p>" + star + "</p></div> " +
                    "<div class='media-body'> " +
                    "<p class='p-com'>" + result.data.comments[i].content + "</p> " + translate +
                    "</div> </div> </div>";
            }
            return add;
        }
    };
    var commentfun = {
        "comment": function (lang) {
            var totalheight = 0;
            var chi_com = $(".chi-com");
            var eng_com = $(".eng-com");
            var thai_com = $(".thai-com");
            var chi_tag=$(".chi-tag");
            var eng_tag=$(".eng-tag");
            var thai_tag=$('.thai-tag');
            var scene = $(".scene_name").html();
            var offset = 0;
            chi_com.html(" ");
            chi_tag.html(" ");
            eng_com.html(" ");
            eng_tag.html(" ");
            thai_com.html(" ");
            thai_tag.html(" ");
            $(window).scroll(function () {
                var srollPos = $(window).scrollTop();
                totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
                var add = "";
                if (($(document).height()) <= totalheight) {
                    var url = "/research/comment";
                    var data = {scene: scene, offset: offset, lang: lang};
                    api.send(url, "post", data).then(function (result) {
                        if(result=="404 NOT FOUND!!"){
                            alert("暂无此类评论！");
                        }else{
                            if (result.data.comments) {
                                var add = self.add_com(result);
                                var tag = "";
                                if(result.data.adj_words=="暂无标签"){
                                    tag="暂无标签"
                                }else{
                                    if( result.data.adj_words){
                                        for (var i = 0; i < result.data.adj_words.words.length; i++) {
                                            tag = tag + "<span>" + result.data.adj_words.words[i] + "[" + result.data.adj_words.values[i] + "]" + "</span>"
                                        }
                                    }
                                }
                                if (result.lang == "chi") {
                                    chi_tag.append(tag);
                                    chi_com.append(add);
                                } else if (result.lang == "eng") {
                                    eng_tag.append(tag);
                                    eng_com.append(add);
                                } else if (result.lang == "thai") {
                                    thai_tag.append(tag);
                                    thai_com.append(add);
                                }
                                offset = offset + 1;
                                event.translate();
                            }else {
                                if($(".com-com").html()==" "){
                                    $(".com-com").append('你已经看完所有评论！');
                                }
                            }
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
            var lang_page = lang + "-page";
            var liLen = 77;
            var left = $(this).index() * liLen + 1;
            $(".line-slide").animate({left: left + 'px'}, 200);
            $(".span-more").hide(1000);
            $("." + lang_page).siblings().hide();
            $("." + lang_page).show();
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
                map.centerAndZoom(new BMap.Point(result.y, result.x), 11);  // 初始化地图,设置中心点坐标和地图级别
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
                if(result=="404 NOT FOUND!!"){
                    $(".chart-show").append("暂无信息");
                }else{
                    if(result.tag.bar){
                        if ((result.tag.bar.score.length) > 0) {
                            chart.bar(result.tag.bar.top_words, result.tag.bar.score, 'bar-chart-page');
                        }
                    }
                    if(result.tag.pie){
                        if ((result.tag.pie.chi.data.length) > 0) {
                            chart.pie(result.tag.pie.chi.color, "中", result.tag.pie.chi.data, "pie1-chart-page");
                        }
                        if ((result.tag.pie.eng.data.length) > 0) {
                            chart.pie(result.tag.pie.eng.color, "美", result.tag.pie.eng.data, "pie2-chart-page");
                        }
                        if ((result.tag.pie.thai.data.length) > 0) {
                            chart.pie(result.tag.pie.thai.color, "泰", result.tag.pie.thai.data, "pie3-chart-page");
                        }
                    }
                }
            });
        },
        'translate': function () {
            var scene = $(".scene_name").html();
            $(".tranlation").click(function () {
                var index = $(this).attr("id");
                var parent = $(this).parents(".comment-show");
                var lang = parent.attr("id");
                var url = "/research/translate";
                var init = parent.find(".p-com").html();
                var data = {scene: scene, index: index, lang: lang};
                api.send(url, "post", data).then(function (result) {
                    if(result=="404 NOT FOUND!!"){
                        alert("暂无此评论的翻译！");
                    }else{
                        if(lang=="eng"){
                            parent.find(".p-com").append("<p>中文翻译："+result.content.chi+"</p>");
                        }else if(lang=="thai"){
                            parent.find(".p-com").append("<p>中文翻译："+result.content.chi+"</p><p>英文翻译："+result.content.eng+"</p>");
                        }
                    }
                });
            });
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
            event.get_chart_data();
        },
        'init': function () {
            $(".selection>li").click(event.lineChange);
            $(".chi-page").hide();
            $(".thai-page").hide();
            $(".eng-page").hide();
        }
    }
});
