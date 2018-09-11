
$(document).ready(function() {
	var height = $(window).height();
	var width = $(window).width();
	$("#bingtu").height(height / 2);
	$("#bingtu").width(width);
	$("#zhuxing").height(height / 2);
	$("#zhuxing").width(width);
	
	$('.zhu').click(function() {
		$('.zhu').addClass('focus');
		$('.bing').removeClass('focus');
		$('#bingtu').hide();
		$('#zhuxing').show();
	});
	$('.bing').click(function() {
		$('.bing').addClass('focus');
		$('.zhu').removeClass('focus');
		$('#bingtu').show();
		$('#zhuxing').hide();
	});
	$('.zhu').click();
	$.get("http://192.168.0.100:8001/process/service/fstest1/power", function(data, status) {
		var powerlist = data.data;
		showPie(powerlist);
		showColumnar(powerlist);
	});
});

function showPie(powerlist) {
	var piedata = [];
	for (var i = 0; i < powerlist.length; i++) {
		var pie = {};
		pie.value = powerlist[i].elec;
		pie.name = powerlist[i].location;
		piedata.push(pie);
	}

	var myChart = echarts.init(document.getElementById('bingtu'));
	var option = {
		backgroundColor : '#FFFFFF',
		textStyle : {
			color : 'rgba(255, 97, 0, 0.8)'
		},
		series : [{
			name : '电量使用',
			type : 'pie',
			radius : ['20%', '60%'],
			data : piedata,
			roseType : 'angle',
			itemStyle : {
				emphasis : {
					shadowBlur : 200,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			},
			label : {
				normal : {
					textStyle : {
						color : 'rgba(255, 97, 0, 0.8)'
					}
				}
			},
			labelLine : {
				normal : {
					lineStyle : {
						color : 'rgba(255, 97, 0, 0.8)'
					}
				}
			}

		}]
	}

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function showColumnar(powerlist) {
	var valuedata = [];
	var namedata = [];
	for (var i = 0; i < powerlist.length; i++) {
		valuedata.push(powerlist[i].elec);
		namedata.push(powerlist[i].location);
	}
	// 基于准备好的dom，初始化echarts实例
	var zhuxing = echarts.init(document.getElementById('zhuxing'));
	// 指定图表的配置项和数据
	var option = {
		tooltip : {},
		legend : {
			data : ['电量']
		},
		xAxis : {
			data : namedata
		},
		yAxis : {},
		series : [{
			name : '电量',
			type : 'bar',
			data : valuedata
		}]
	};

	// 使用刚指定的配置项和数据显示图表
	zhuxing.setOption(option);
}

