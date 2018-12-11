$(function() {
	initCharts();
	//贷款余额
	loanChart('loanChart');
	test1('loanChart2');
	test2('loanChart3');
	var rowHeight=$(".panelContent-main li").height();
	$('.bank-qudao').myScroll({
		speed: 35, //数值越大，速度越慢
		rowHeight: rowHeight //li的高度
	});
	$('.bank-jiaoyi').myScroll({
		speed: 35, //数值越大，速度越慢
		rowHeight: rowHeight //li的高度
	});
});

//交易量天趋势数据
function test2(id) {
	var data = {
		"IOUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0],
		"time": ["0分", "1分", "2分", "3分", "4分", "5分", "6分", "7分", "8分", "9分", "10分", "11分", "12分", "13分", "14分", "15分", "16分", "17分", "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分", "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分", "54分", "55分", "56分", "57分", "58分", "59分"],
		"CpuUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0],
		"MemUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]
	}
	
	var xData = data.time;
	/*var resultData1 = data.IOUtil;
	var resultData2 = data.CpuUtil;
	var resultData3 = data.MemUtil;*/
	var resultData1 = [],
		resultData2 = [],
		resultData3 = [];
	for(var i = 0; i < xData.length; i++) {
		resultData1.push(Math.ceil(Math.random() * 20 + 60));
		resultData2.push(Math.ceil(Math.random() * 10 + 40));
		resultData3.push(Math.ceil(Math.random() * 40 + 60));
	}
	var myChart = echarts.init(document.getElementById(id));

	var option = {
		title: {
			//text: '2000-2016年中国汽车销量及增长率'
		},
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			left: '0%',
			top: '15%',
			right: '0%',
			bottom: '5%',
			containLabel: true
		},
		legend: {
			textStyle: {
				color: '#bac0c0',
				fontSize: '12',
			},
			data: ['IO', 'CPU', '内存']
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				alignWithLabel: true
			},
			axisLabel: {
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				},
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			splitLine: {
				show: false
			},
			data: xData
		}],
		yAxis: [{
			type: 'value',
			name: '数值(%)',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
			position: 'right',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				}
			}
		}, {
			type: 'value',
			name: 'kbps',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
			max: 200,
			position: 'left',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				}
			}
		}],
		color: ['#04BA8D', '#F7A427', '#2C9ED0', '#5FC6A9'],
		series: [{
				name: 'IO',
				type: 'line',
				symbol: "circle",
				label: {
					normal: {
						show: false,
						position: 'top',
					}
				},
				lineStyle: {
					normal: {
						width: 2,
						shadowColor: 'rgba(0,0,0,0.4)',
						shadowBlur: 10,
						shadowOffsetY: 10
					}
				},
				data: resultData1
			}, {
				name: 'CPU',
				type: 'line',
				symbol: "circle",
				label: {
					normal: {
						show: false,
						position: 'top',
					}
				},
				lineStyle: {
					normal: {
						width: 2,
						shadowColor: 'rgba(0,0,0,0.4)',
						shadowBlur: 10,
						shadowOffsetY: 10
					}
				},
				data: resultData2
			},
			{
				name: '内存',
				type: 'bar',
				yAxisIndex: 1,
				barWidth: '45%',
				label: {
					normal: {
						show: false,
						position: 'top'
					}
				},
				data: resultData3
			}
		]
	};
	myChart.setOption(option);
	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}

//交易量天趋势数据
function test1(id) {
	var data = {
		"nodeName|EXFE|jhpt01": {
			"avgStatus": [60.0, 72.71, 74.8, 76.83, 77.22, 73.41, 70.12, 76.36, 70.0, 72.68, 70.74, 70.91, 74.39, 73.25, 76.56, 74.46, 72.59, 82.08],
			"time": ["2017090600", "2017090601", "2017090602", "2017090603", "2017090604", "2017090605", "2017090606", "2017090607", "2017090608", "2017090609", "2017090610", "2017090611", "2017090612", "2017090613", "2017090614", "2017090615", "2017090616", "2017090617"],
			"count": [845, 689, 774, 613, 619, 632, 693, 643, 670, 831, 858, 667, 703, 789, 849, 834, 843, 346],
			"avgProcessTime": [82, 82, 82, 83, 82, 80, 83, 86, 123, 162, 557, 144, 138, 128, 147, 240, 226, 127],
			"maxProcessTime": [1273, 3164, 1336, 1069, 615, 1094, 2542, 3796, 6743, 11885, 66452, 10680, 8282, 13769, 7202, 34470, 12421, 3590],
			"minProcessTime": [45, 45, 45, 45, 45, 45, 45, 45, 45, 44, 44, 44, 44, 45, 44, 44, 44, 44]
		}
	}
	var xData = data['nodeName|EXFE|jhpt01'].time,
		xDataArr = [];
	for(var i = 0; i < xData.length; i++) {
		xDataArr.push(xData[i].substring(4, xData[i].length));
	}
	var resultData1 = data['nodeName|EXFE|jhpt01'].avgStatus;
	var resultData2 = data['nodeName|EXFE|jhpt01'].count;
	var resultData3 = data['nodeName|EXFE|jhpt01'].avgProcessTime;
	var resultData4 = data['nodeName|EXFE|jhpt01'].maxProcessTime;
	var resultData5 = data['nodeName|EXFE|jhpt01'].minProcessTime;
	var myChart = echarts.init(document.getElementById(id));

	var option = {
		title: {
			//text: '2000-2016年中国汽车销量及增长率'
		},
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			left: '-1%',
			top: '15%',
			right: '0%',
			bottom: '5%',
			containLabel: true
		},
		legend: {
			textStyle: {
				color: '#bac0c0',
				fontSize: '12',
			},
			data: ['增速', '销量']
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				alignWithLabel: true
			},
			axisLabel: {
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				},
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			splitLine: {
				show: false
			},
			data: xDataArr
		}],
		yAxis: [{
			type: 'value',
			name: '增速(%)',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
			position: 'right',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				}
			}
		}, {
			type: 'value',
			name: '销量',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
			max: 1200,
			position: 'left',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#c1c4cd',
					fontSize: '10',
				}
			}
		}],
		color: ['#04BA8D', '#2C9ED0', '#F7A427', '#5FC6A9'],
		series: [{
			name: '增速',
			type: 'line',
			symbol: "circle",
			stack: '总量',
			label: {
				normal: {
					show: false,
					position: 'top',
				}
			},
			lineStyle: {
				normal: {
					width: 2,
					shadowColor: 'rgba(0,0,0,0.4)',
					shadowBlur: 10,
					shadowOffsetY: 10
				}
			},
			data: resultData1
		}, {
			name: '销量',
			type: 'bar',
			symbol: "circle",
			yAxisIndex: 1,
			barWidth: '45%',
			stack: '总量',
			label: {
				normal: {
					show: false,
					position: 'top'
				}
			},
			data: resultData2
		}]
	};
	myChart.setOption(option);
	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}

function loanChart(id) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		tooltip: {
			formatter: function(params) {
				if(params[0].dataIndex == 1) {
					return params[0].name + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[0].color + "'></span>" +
						"" + params[5].seriesName + "：" + params[5].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[1].color + "'></span>" +
						"" + params[6].seriesName + "：" + params[6].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[2].color + "'></span>" +
						"" + params[7].seriesName + "：" + params[7].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[3].color + "'></span>" +
						"" + params[8].seriesName + "：" + params[8].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[4].color + "'></span>" +
						"" + params[9].seriesName + "：" + params[9].value;
				} else {
					return params[0].name + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[0].color + "'></span>" +
						"" + params[0].seriesName + "：" + params[0].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[1].color + "'></span>" +
						"" + params[1].seriesName + "：" + params[1].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[2].color + "'></span>" +
						"" + params[2].seriesName + "：" + params[2].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[3].color + "'></span>" +
						"" + params[3].seriesName + "：" + params[3].value + "<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[4].color + "'></span>" +
						"" + params[4].seriesName + "：" + params[4].value;
				}
			},
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				color: '#fafafa'
			}

		},
		title: {
			show: false,
			text: '',
			subtext: ''
		},
		toolbox: {
			show: false,
		},
		grid: {
			left: '-2%',
			top: '18%',
			right: '11%',
			bottom: '5%',
			containLabel: true
		},
		legend: {
			show: true,
			left: 'center',
			top: 'top',
			textStyle: {
				color: '#ddd',
				fontSize: 13
			},
			icon: 'rect',
			itemGap: 20,
			itemWidth: 30,
			itemHeight: 15,
			orient: 'horizontal',
			data: ['个人贷款', '企业贷款', '票据贴现', '转贴现买入', '贸易融资']
		},
		calculable: true,
		yAxis: {
			type: 'category',
			axisLabel: {
				show: true,
				margin: 40,
				formatter: function(params) {
					if(params == "人民币（亿元）") {
						return "人民币 \n（亿元）"
					} else if(params == "外币拆美元（万美元）") {
						return "外币拆美元\n（万美元）"
					} else if(params == "本外币合计（亿元）") {
						return "本外币合计\n（亿元）"
					} else {
						var newParamsName = "";
						var paramsNameNumber = params.length;
						var provideNumber = 5; //一行显示几个字
						var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
						if(paramsNameNumber > provideNumber) {
							for(var p = 0; p < rowNumber; p++) {
								var tempStr = "";
								var start = p * provideNumber;
								var end = start + provideNumber;
								if(p == rowNumber - 1) {
									tempStr = params.substring(start, paramsNameNumber);
								} else {
									tempStr = params.substring(start, end) + "\n";
								}
								newParamsName += tempStr;
							}

						} else {
							newParamsName = params;
						}
						return newParamsName
					}
				},
				textStyle: {
					color: '#c1c4cd',
					fontSize: 11,
					align: 'center',
				}
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			splitLine: {
				show: false,
			},
			data: ['人民币（亿元）', '外币拆美元（万美元）', '本外币合计（亿元）'].reverse()
		},
		xAxis: [{
			name: '（万美元）',
			type: 'value',
			max: 8000,
			min: 0,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#c1c4cd',
					fontSize: 10,
				}
			},
			axisTick: {
				show: true,
				inside: false, // 控制小标记是否在grid里 
				length: 5, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#626262',
					width: 1
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			splitLine: {
				show: false,
			},
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: 11,
			},
		}, {
			name: '（亿元）',
			type: 'value',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#c1c4cd',
					fontSize: 10,
				}
			},
			axisTick: {
				show: true,
				inside: false, // 控制小标记是否在grid里 
				length: 5, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#626262',
					width: 1
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#626262',
					width: 1
				}
			},
			splitLine: {
				show: false,
			},
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: 11,
			},
		}],
		series: [{
				name: '个人贷款',
				barWidth: '25%',
				type: 'bar',
				stack: '总量',
				xAxisIndex: 1,
				barGap: '-100%',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#EF5C64'
					}
				},
				data: [25, 0, 30].reverse()
			},
			{
				name: '企业贷款',
				type: 'bar',
				stack: '总量',
				xAxisIndex: 1,
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#F7A427'
					}
				},
				data: [40, 0, 50].reverse()
			},
			{
				name: '票据贴现',
				type: 'bar',
				stack: '总量',
				xAxisIndex: 1,
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#5FC6A9'
					}
				},
				data: [25, 0, 30].reverse()
			},
			{
				name: '转贴现买入',
				type: 'bar',
				stack: '总量',
				xAxisIndex: 1,
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#2C9ED0'
					}
				},
				data: [30, 0, 35].reverse()
			},
			{
				name: '贸易融资',
				type: 'bar',
				stack: '总量',
				xAxisIndex: 1,
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#425C73'
					}
				},
				data: [35, 0, 40].reverse()
			},
			{
				name: '个人贷款',
				barWidth: '25%',
				type: 'bar',
				stack: '总量1',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#EF5C64'
					}
				},
				data: [0, 2000, 0].reverse()
			},
			{
				name: '企业贷款',
				type: 'bar',
				stack: '总量1',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#F7A427'
					}
				},
				data: [0, 1135, 0].reverse()
			},
			{
				name: '票据贴现',
				type: 'bar',
				stack: '总量1',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#5FC6A9'
					}
				},
				data: [0, 1120, 0].reverse()
			},
			{
				name: '转贴现买入',
				type: 'bar',
				stack: '总量1',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#2C9ED0'
					}
				},
				data: [0, 1125, 0].reverse()
			},
			{
				name: '贸易融资',
				type: 'bar',
				stack: '总量1',
				label: {
					normal: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'inside'
						},
						color: '#425C73'
					}
				},
				data: [0, 1130, 0].reverse()
			}
		]
	};
	myChart.setOption(option);
	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}

function initCharts() {
	var myChart = echarts.init(document.getElementById('container'));
	var uploadedDataURL = "/Scripts/home/json/shenzhen.json";
	$.getJSON(uploadedDataURL, function(geoJson) {
		echarts.registerMap('深圳', geoJson);
		var geoCoordMapData = {
			'南山区': [113.92943, 22.531221],
			'宝安区': [113.828671, 22.754741],
			'福田区': [114.05096, 22.541009],
			'龙岗区': [114.251372, 22.721511],
			'罗湖区': [114.123885, 22.555341],
			'盐田区': [114.235366, 22.555069],
			'坪山区': [114.338441, 22.69423],
			'龙华区': [114.044346, 22.691963],
			'光明区': [113.923662, 22.769082],
			'大鹏区': [114.483292, 22.617895],
		}
		var geoCoordMap = {
			'龙华支行': [114.028359, 22.668155],
			'红岭支行': [114.186729, 22.584414],
			'福莲支行': [114.111666, 22.572647],
			'深圳分行': [114.069124, 22.542023],
			'天安支行': [114.017601, 22.523749],
			'上海银行': [113.972826, 22.605302],
			'宝安支行': [113.894068, 22.596304],
			'宝新支行': [113.878833, 22.559796],
			'前海支行': [113.918852, 22.517183],
			'科技园支行': [113.960819, 22.545133],
		}
		var moveLine = {
			'normal': [{
					"fromName": "上海银行",
					"toName": "龙华支行",
					'coords': [
						[113.972826, 22.605302],
						[114.028359, 22.668155]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "红岭支行",
					'coords': [
						[113.972826, 22.605302],
						[114.186729, 22.584414]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "福莲支行",
					'coords': [
						[113.972826, 22.605302],
						[114.111666, 22.572647]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "深圳分行",
					'coords': [
						[113.972826, 22.605302],
						[114.069124, 22.542023]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "天安支行",
					'coords': [
						[113.972826, 22.605302],
						[114.017601, 22.523749]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "宝安支行",
					'coords': [
						[113.972826, 22.605302],
						[113.894068, 22.596304]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "宝新支行",
					'coords': [
						[113.972826, 22.605302],
						[113.878833, 22.559796]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "前海支行",
					'coords': [
						[113.972826, 22.605302],
						[113.918852, 22.517183]
					]
				},
				{
					"fromName": "上海银行",
					"toName": "科技园支行",
					'coords': [
						[113.972826, 22.605302],
						[113.960819, 22.545133]
					]
				},
			]
		}
		var data = [{
				name: '上海银行',
				value: 380,
				itemStyle: {
					normal: {
						color: '#FFE35E',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
			},
			{
				name: '龙华支行',
				itemStyle: {
					normal: {
						color: '#54CDFF',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 360
			},
			{
				name: '红岭支行',
				itemStyle: {
					normal: {
						color: '#D3325C',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 340
			},
			{
				name: '福莲支行',
				itemStyle: {
					normal: {
						color: '#6ABF16',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '深圳分行',
				itemStyle: {
					normal: {
						color: '#FF87D3',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 300
			},
			{
				name: '天安支行',
				itemStyle: {
					normal: {
						color: '#C358DF',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '宝安支行',
				itemStyle: {
					normal: {
						color: '#0E9BE7',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '宝新支行',
				itemStyle: {
					normal: {
						color: '#E56C50',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '前海支行',
				itemStyle: {
					normal: {
						color: '#CBF94A',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '科技园支行',
				itemStyle: {
					normal: {
						color: '#FFB508',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 350
			},
		];

		var dataMap = [{
				name: '南山区',
				value: 50,
				itemStyle: {
					normal: {
						color: '#F4E925',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
			},
			{
				name: '宝安区',
				itemStyle: {
					normal: {
						color: '#ff3333',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 360
			},
			{
				name: '福田区',
				itemStyle: {
					normal: {
						color: 'orange',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 340
			},
			{
				name: '龙岗区',
				itemStyle: {
					normal: {
						color: 'yellow',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '罗湖区',
				itemStyle: {
					normal: {
						color: 'lime',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 300
			},
			{
				name: '盐田区',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '坪山区',
				itemStyle: {
					normal: {
						color: 'lime',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 300
			},
			{
				name: '光明区',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '大鹏区',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
			{
				name: '龙华区',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 10,
						shadowColor: '#05C3F9'
					}
				},
				value: 320
			},
		];

		var convertData = function(data) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
						itemStyle: data[i].itemStyle
					});
				}
			}
			return res;
		};

		var convertMapData = function(data) {
			var res = [];
			for(var i = 0; i < dataMap.length; i++) {
				var geoCoord = geoCoordMapData[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(5),
					});
				}
			}
			return res;
		};

		option = {
			backgroundColor: 'rgba(0,0,0,0)',
			color: ['#f00', 'orange', 'yellow', 'lime', 'aqua'],
			title: {
				show: false,
				left: '82.7%',
				top: '8%',
				text: ' 客户等级',
				textStyle: {
					color: '#fff'
				}
			},
			tooltip: {
				trigger: 'item',
				position: 'top',
				formatter: function(params) {
					var table;
					var seriesType = params.seriesType;
					if(seriesType == "scatter") {
						table = '<div style="width: 400px;height: 240px;position: absolute;margin-left: 20px;margin-top: -95px;">' +
							'    <img src="img/Popup4.png" style="width:100%;height:100%" />' +
							'    <div class="actDynPopupTitle">' + params.name + '</div>' +
							'    <div class="actDynPopupContent">' +
							'        <div style=" display: flex;height: 100%">' +
							'            <div class="ContentStyle">' +
							'                <p>线路地址：172.16.252.172</p>' +
							'                <p>对端地址：172.16.252.174</p>' +
							'                <p>进流量利用率：2.73</p>' +
							'                <p>出流量利用率：45.2</p>' +
							'            </div>' +
							'            <div class="ContentStyle1">' +
							'                <p>线路带宽：10000</p>' +
							'                <p>进流量：2863361</p>' +
							'                <p>出流量：223333</p>' +
							'                <p>连通性：no</p>' +
							'            </div>' +
							'        </div>' +
							'    </div>' +
							'</div>';
					} else if(seriesType == "effectScatter") {
						table = '<div style="width: 360px;height: 216px;position: absolute;margin-left: 20px;margin-top: -85px;">' +
							'    <img src="img/Popup4.png" style="width:100%;height:100%" />' +
							'    <div class="actDynPopupTitle">' + params.name + '</div>' +
							'    <div class="actDynPopupContent">' +
							'        <div style=" display: flex;height: 100%">' +
							'            <div class="ContentStyle">' +
							'                <p>线路地址：172.16.252.172</p>' +
							'                <p>对端地址：172.16.252.174</p>' +
							'                <p>进流量利用率：2.73</p>' +
							'                <p>出流量利用率：45.2</p>' +
							'            </div>' +
							'            <div class="ContentStyle1">' +
							'                <p>线路带宽：10000</p>' +
							'                <p>进流量：2863361</p>' +
							'                <p>出流量：223333</p>' +
							'                <p>连通性：no</p>' +
							'            </div>' +
							'        </div>' +
							'    </div>' +
							'</div>';
					}
					return table;
				},
				backgroundColor: 'rgba(0,0,0,0)',
				padding: 10
			},

			legend: {
				show: true,
				orient: 'vertical',
				left: '91%',
				top: '10%',
				itemWidth: 25,
				itemHeight: 14,
				itemGap: 15,
				data: ['上海银行', '龙华支行', '宝安支行', '宝新支行', '科技园支行', '前海支行', '天安支行', '深圳分行', '福莲支行', '龙华支行'],
				textStyle: {
					color: '#fff',
					fontSize: 13,
					width: 200
				}
			},
			visualMap: {
				show: false,
				min: 0,
				max: 500,
				left: 'left',
				top: 'bottom',
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				seriesIndex: [1],
			},
			geo: {
				show: true,
				map: '深圳',
				aspectScale: 0.9,
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: false,
					}
				},
				zoom: 1.1,
				top: '10%',
				itemStyle: {
					normal: {
						areaColor: '#213045',
						borderColor: '#3fdaff',
						borderWidth: 2,
						shadowColor: 'rgba(63, 218, 255, 0.5)',
						//						shadowBlur: 30
					},
					emphasis: {
						areaColor: '#213045',
					}
				}
			},
			series: [{
					name: 'light',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: convertMapData(dataMap),
					symbolSize: function(val) {
						return val[2];
					},
					label: {
						normal: {
							formatter: '{b}',
							position: ['10', '-6'],
							show: true
						},
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: '#F4E925'
						}
					},
				},
				{
					type: 'map',
					map: 'shenzhen',
					geoIndex: 0,
					aspectScale: 0.75, //长宽比
					showLegendSymbol: false, // 存在legend时显示
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							areaColor: '#031525',
							borderColor: '#FFFFFF',
						},
						emphasis: {
							areaColor: '#031525',
						}
					},
					animation: false,
					data: data,
				},
				{
					name: '银行分布',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(data.sort(function(a, b) {
						return b.value - a.value;
					}).slice(0, 10)),
					symbolSize: function(val) {
						return val[2] / 20;
					},
					effectType: 'ripple',
					showEffectOn: 'render',
					rippleEffect: {
						scale: 2.5,
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#F4E925',
							shadowBlur: 10,
							shadowColor: '#05C3F9'
						}
					},
					zlevel: 1
				},
				{
					name: '',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 1,
					large: true,
					effect: {
						show: true,
						period: 10,
						symbol: 'circle',
						symbolSize: 3,
						trailLength: 0.2,
						color: '#fff'
					},
					lineStyle: {
						normal: {
							color: '#0fff17',
							shadowBlur: 0.1,
							shadowColor: '#05C3F9',
							width: 1,
							opacity: 0.5,
							curveness: 0.15
						}
					},
					data: moveLine.normal
				},
				{
					name: '上海银行',
					type: 'lines',
					data: [],
				},
				{
					name: '龙华支行',
					type: 'lines',
					data: [],
				},
				{
					name: '宝安支行',
					type: 'lines',
					data: [],
				},
				{
					name: '宝新支行',
					type: 'lines',
					data: [],
				},
				{
					name: '科技园支行',
					type: 'lines',
					data: [],
				},
				{
					name: '前海支行',
					type: 'lines',
					data: [],
				},
				{
					name: '天安支行',
					type: 'lines',
					data: [],
				},
				{
					name: '深圳分行',
					type: 'lines',
					data: [],
				},
				{
					name: '福莲支行',
					type: 'lines',
					data: [],
				},
				{
					name: '红岭支行',
					type: 'lines',
					data: [],
				}
			]
		};
		myChart.setOption(option);

	});

	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}