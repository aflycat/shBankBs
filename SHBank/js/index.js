var flag = true;
var screenWidth, screenHeight;
var mapNet;
var netData=[];
var bankArr=[
			'龙华支行',
			'红岭支行',
			'福莲支行',
			'分行数据中心',
			'天安支行',
			'德赛数据中心',
			'宝安支行',
			'宝新支行',
			'前海支行',
			//'科技园支行': [113.960819, 22.545133],
			'海景支行',
			'西丽支行',
			'侨香支行',
			'龙岗支行',
			'分行营业部',
			'东部支行',
			'光明支行',
			'君汇支行'
			]
var namearr=[];

$(function() {
	
	
	
	screenWidth = window.screen.width;
	screenHeight = window.screen.height;

		$.ajax({
				method:"get",
				url:"http://10.7.1.192:9000/api/trade/tsp",
				async:true,
				success:function(res){
//					console.log(res)
					var dat=JSON.parse(res).Message;
					if(dat){
					
						var rep=JSON.parse(dat);
						
						for(var i=0;i<rep.length;i++){
							var value=rep[i];
							
							if(value.jyl!=0&&value.jyl!="-"){
								var html='<li><span>'+value.cn+'</span><label>'+value.jyl+'</label><label>'+value.avgConsumTime+'</label>'+
										'<font>'+value.avgSuccessPer+'%</font>'+
									'</li>';
								$("#scrollWrap").append(html)
							}
							
						}
					}
				}
				
			})
		$('.bank-qudao').myScroll({
			speed: 70, //数值越大，速度越慢
			rowHeight: rowHeight //li的高度
		});
//	}
	
	initCharts();
	//贷款余额
	loanChart('loanChart');
	test1('loanChart2');
	test2('loanChart3');
	drawDepositBalanceChart("depositBalanceChartId");
	var rowHeight = $(".panelContent-main li").height();

	$.ajax({
		type:"get",
		url:"http://10.7.1.192:9000/api/trade/net",
		async:false,
		success:function(res){
			console.log(res);
			dat=JSON.parse(res).Message;
			if(dat){
				mapNet=JSON.parse(dat).rows
				for(var i=0;i<mapNet.length;i++){
					var value=mapNet[i];
					if(bankArr.indexOf(value.location)!=-1&&value.ifspeed>=100000000){
						netData.push(value)
						namearr.push(value.location)
					}
				}
			}
			
			
			
		}
	})
	
});

//存款余额
function drawDepositBalanceChart(id) {
	var myChart = echarts.init(document.getElementById(id));
//	setInterval(function(){
////		console.log(2)
//		myChart.clear()
//		drawDepositBalanceChart("depositBalanceChartId")
//		
//		
//	},5000)
	
	var ckArr=[];
	$.ajax({
		type:"get",
		url:"http://10.7.1.192:9000/api/trade/trade",
		async:false,
		success:function(res){
			var dat=JSON.parse(res).Message;
			if(dat){
				
			
				var rep=JSON.parse(dat).ck;
	//			console.log(rep)
				ckArr[0]={
					value:(rep.qy/10000000000).toFixed(0),
					name:"企业存款",
					itemStyle: {
							normal: {
								color: '#01B4D2'
								
							}
					}
					
							
				}
				ckArr[1]={
					value:(rep.xy/10000000000).toFixed(0),
					name:"协议存款",
					itemStyle: {
							normal: {
								color: '#f00'
							}
					}
					
								
				}
				ckArr[2]={
					value:(rep.cx/10000000000).toFixed(0),
					name:"储蓄存款",
					itemStyle: {
							normal: {
								color: '#FFB508'
								
							}
					}
	
								
				}
				ckArr[3]={
					value:(rep.ty/10000000000).toFixed(0),
					name:"同业存款",
					itemStyle: {
							normal: {
								color: '#9506F3'
								
							}
					}
					
				}
			}
//cx: 30.51
//qy: 809.51
//ty: 778.18
//xy
//			['企业存款', '协议存款', '储蓄存款', '同业存款']
//			{
//					value: 57.23,
//					name: '零售本币',
//					itemStyle: {
//						normal: {
//							color: '#FFB508'
//						}
//					},
//				}
//			
			
		}
	});
	option = {
//		title: [{
//			text: '本日人民币余额（单位：亿元）',
//			left: screenWidth > 1900 ? '10%' : '2%',
//			bottom: '5%',
//			textStyle: {
//				color: '#c1c4cd',
//				fontSize: 10,
//				fontWeight: 500,
//			}
//		}, {
//			text: '本日外币折美元余额（单位：万美元）',
//			left: 'center',
//			bottom: '5%',
//			textStyle: {
//				color: '#c1c4cd',
//				fontSize: 10,
//				fontWeight: 500,
//			}
//		}, {
//			text: '本日外币合计（单位：亿元）',
//			left: screenWidth > 1900 ? '74%' : '70%',
//			bottom: '5%',
//			textStyle: {
//				color: '#c1c4cd',
//				fontSize: 10,
//				fontWeight: 500,
//			}
//		}],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			show: true,
			left: 'right',
			top: 'top',
			textStyle: {
				color: '#ddd',
				fontSize: 13
			},
			icon: 'rect',
			itemGap: screenWidth > 1900 ? 10 : 15,
			itemWidth: 30,
			itemHeight: 15,
			orient: 'vertical',
			
			data: ['企业存款', '协议存款', '储蓄存款', '同业存款']
		},
		series: [{
			name: '存款余额',
			type: 'pie',
			radius: ['0%', '80%'],
			center: ['40%', '50%'],
			label: {
				normal: {
					formatter: '{small|{c}亿}',
					rich: {
						a: {
							lineHeight: 22,
							fontSize: 10,
							color: 'white',
							align: 'right'
						},
						hr: {
							borderColor: '#aaa',
							width: '100%',
							borderWidth: 0,
							height: 0
						},
						per: {
							color: '#eee',
							lineHeight: 22,
							fontSize: 10,
							align: 'right'
						},
						small: {
							color: '#eee',
							lineHeight: 22,
							fontSize: 10,
						}
					}
				},
			},
			labelLine: {
				normal: {
					show: true,
					
					length: 5,
					length2: screenWidth > 1900 ? 15 : 5,
					
				}
			},
			data:ckArr
//			[{
//					value: 57.23,
//					name: '零售本币',
//					itemStyle: {
//						normal: {
//							color: '#FFB508'
//						}
//					},
//				},
//				{
//					value: 5.35,
//					name: '零售外币',
//					itemStyle: {
//						normal: {
//							color: '#9506F3'
//							color: '#FFB508'
//						}
//					},
//				},
//				{
//					value: 9.04,
//					name: '对公本币',
//					itemStyle: {
//						normal: {
//							color: '#05BB8C'
//							color: '#9506F3'
//							color: '#FFB508'
//						}
//					},
//				},
//				{
//					value: 48.70,
//					name: '对公外币',
//					itemStyle: {
//						normal: {
//							color: '#01B4D2'
//							color: '#05BB8C'
//							color: '#9506F3'
//							color: '#FFB508'
//						}
//					},
//				}
//			]
		}]
	};

	myChart.setOption(option);
	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}

//交易量天趋势数据
function test2(id) {
//	var myDate=new Date();
//	var year=myDate.getFullYear();
//	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
//	var day=(myDate.getDate())<10?("0"+(myDate.getDate())):(myDate.getDate());
//	var str=year+"-"+mon+"-"+day;
	var data;
	$.ajax({
		type:"get",
		url:"http://10.7.1.192:9000/api/trade/bmc",
		async:false,
		success:function(res){
//			console.log(res);
			var dat=JSON.parse(res).Message;
			if(dat){
				data=JSON.parse(dat)
			}
//			console.log(dat);
			
		}
		
	});
//	var data = {
//		"IOUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0],
//		"time": ["0分", "1分", "2分", "3分", "4分", "5分", "6分", "7分", "8分", "9分", "10分", "11分", "12分", "13分", "14分", "15分", "16分", "17分", "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分", "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分", "54分", "55分", "56分", "57分", "58分", "59分"],
//		"CpuUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0],
//		"MemUtil": [-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]
//	}

	var xData = data.time;
	var resultData1 = data.IOUtil;
	var resultData2 = data.CpuUtil;
	var resultData3 = data.MemUtil;
//	var resultData1 = [],
//		resultData2 = [],
//		resultData3 = [];
//	for(var i = 0; i < xData.length; i++) {
//		resultData1.push(Math.ceil(Math.random() * 20 + 60));
//		resultData2.push(Math.ceil(Math.random() * 10 + 40));
//		resultData3.push(Math.ceil(Math.random() * 40 + 60));
//	}
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
			bottom: '6%',
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
	var data;
	$.ajax({
		type:"get",
		url:"http://10.7.1.192:9000/api/trade/trend",
		async:false,
		success:function(res){
			var dat=JSON.parse(res).Message
			if(dat){
				var req=JSON.parse(dat)
			data=req;
			}
			
//			console.log(req)
		}
	});
//	var data = {
//		"nodeName|EXFE|jhpt01": {
//			"avgStatus": [60.0, 72.71, 74.8, 76.83, 77.22, 73.41, 70.12, 76.36, 70.0, 72.68, 70.74, 70.91, 74.39, 73.25, 76.56, 74.46, 72.59, 82.08],
//			"time": ["2017090600", "2017090601", "2017090602", "2017090603", "2017090604", "2017090605", "2017090606", "2017090607", "2017090608", "2017090609", "2017090610", "2017090611", "2017090612", "2017090613", "2017090614", "2017090615", "2017090616", "2017090617"],
//			"count": [845, 689, 774, 613, 619, 632, 693, 643, 670, 831, 858, 667, 703, 789, 849, 834, 843, 346],
//			"avgProcessTime": [82, 82, 82, 83, 82, 80, 83, 86, 123, 162, 557, 144, 138, 128, 147, 240, 226, 127],
//			"maxProcessTime": [1273, 3164, 1336, 1069, 615, 1094, 2542, 3796, 6743, 11885, 66452, 10680, 8282, 13769, 7202, 34470, 12421, 3590],
//			"minProcessTime": [45, 45, 45, 45, 45, 45, 45, 45, 45, 44, 44, 44, 44, 45, 44, 44, 44, 44]
//		}
//	}
	var xData = data['appName|TIP'].time;
		xDataArr = [];
	for(var i = 0; i < xData.length; i++) {
//		var year=xData[i].substring(0, 4);
//		console.log(year);
//		var mon=xData[i].substring(4, 6);
//		console.log(mon);
//		var day=xData[i].substring(6, 8);
//		console.log(day);
		var hours=xData[i].substring(8, xData[i].length);
//		console.log(hours);
//		var str=mon+"-"+day+" "+hours
		xDataArr.push(hours+"时");
	}
	var resultData1 = data['appName|TIP'].avgStatus;
	var resultData2 = data['appName|TIP'].count;
	var resultData3 = data['appName|TIP'].avgProcessTime;
	var resultData4 = data['appName|TIP'].maxProcessTime;
	var resultData5 = data['appName|TIP'].minProcessTime;
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
			data: ['平均时间', '交易量']
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
			name: '时间(ms)',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
//			max:200,
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
			name: '交易量(笔)',
			nameTextStyle: {
				color: '#c1c4cd',
				fontSize: '12',
			},
//			max: 2000,
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
			name: '平均时间',
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
			data: resultData3
		}, {
			name: '交易量',
			type: 'bar',
			symbol: "circle",
			yAxisIndex: 1,
			barWidth: '45%',
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
	var dkArr=[];
	$.ajax({
		type:"get",
		url:"http://10.7.1.192:9000/api/trade/trade",
		async:false,
		success:function(res){
//			['个人贷款', '企业贷款','票据贴现','转贴现买入','贸易融资']

			var dat=JSON.parse(res).Message;
			if(dat){
				
			
			var rep=JSON.parse(dat).dk;
			dkArr[0]={
					value:(rep.gr/10000000000).toFixed(0),
					name: '个人贷款',
					itemStyle: {
							normal: {
								
								color: '#FFB508'
							}
					}
				}
			dkArr[1]={
					value:(rep.qy/10000000000).toFixed(0),
					name: '企业贷款',
					itemStyle: {
							normal: {
								color: '#01B4D2'
								
							}
					}
				}
			dkArr[2]={
					value:(rep.pj/10000000000).toFixed(0),
					name: '票据贴现',
					itemStyle: {
							normal: {
								color: '#05BB8C'
							}
					}
				}
			dkArr[3]={
					value:(rep.ztx/10000000000).toFixed(1),
					name: '转贴现买入',
					itemStyle: {
							normal: {
								color: '#9506F3'
							}
					}
				}
			dkArr[4]={
					value:(rep.my/10000000000).toFixed(0),
					name: '贸易融资',
					itemStyle: {
							normal: {
								color: '#FF0000'
							}
					}
				}
			}
//			gr: 309.89
//			my: 48.15
//			pj: 53.93
//			qy: 756.11
//			ztx: 0.93
//			{
//					value: 57.23,
//					name: '零售贷款',
//					itemStyle: {
//						normal: {
//							color: '#FFB508'
//						}
//					},
//				},
//			console.log(rep)
			
		}
	});
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			show: true,
			left: 'right',
			top: 'top',
			textStyle: {
				color: '#ddd',
				fontSize: 13
			},
			icon: 'rect',
			itemGap: screenWidth > 1900 ? 10 : 15,
			itemWidth: 30,
			itemHeight: 15,
			orient: 'vertical',
			data: ['个人贷款', '企业贷款','票据贴现','转贴现买入','贸易融资']
		},
		series: [{
			name:"贷款余额",
			type: 'pie',
			radius: ['0%', '80%'],
			center: ['40%', '50%'],
			label: {
				normal: {
					formatter: '{small|{c}亿}',
					rich: {
						a: {
							lineHeight: 22,
							fontSize: 10,
							color: 'white',
							align: 'right'
						},
						hr: {
							borderColor: '#aaa',
							width: '100%',
							borderWidth: 0,
							height: 0
						},
						per: {
							color: '#eee',
							lineHeight: 22,
							fontSize: 10,
							align: 'right'
						},
						small: {
							color: '#eee',
							lineHeight: 22,
							fontSize: 10,
						}
					}
				},
			},
			labelLine: {
				normal: {
					show:true,
					
					length: 5,
					smooth:true,
					length2: screenWidth > 1900 ? 15 : 5,
				}
			},
			data:dkArr 
//			[
//				{
//					value: 57.23,
//					name: '零售贷款',
//					itemStyle: {
//						normal: {
//							color: '#FFB508'
//						}
//					},
//				},
//				{
//					value: 42.77,
//					name: '对公贷款',
//					itemStyle: {
//						normal: {
//							color: '#05BB8C'
//						}
//					},
//				}
//			]
		}]
	};
	myChart.setOption(option);
	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}

function initCharts() {
	var myChart = echarts.init(document.getElementById('container'));
	var uploadedDataURL = "json/shenzhen.json";
	$.getJSON(uploadedDataURL, function(geoJson) {
		echarts.registerMap('深圳', geoJson);
		var geoCoordMapData = {
			'南山区': [113.92943, 22.531221],
			'宝安区': [113.868671, 22.714741],
			'福田区': [114.05096, 22.541009],
			'龙岗区': [114.251372, 22.741511],
			'罗湖区': [114.123885, 22.555341],
			'盐田区': [114.235366, 22.555069],
			'坪山区': [114.338441, 22.69423],
			'龙华区': [114.044346, 22.691963],
			'光明区': [113.923662, 22.769082],
			'大鹏区': [114.483292, 22.617895]
		}
		var geoCoordMap = {
			'龙华支行': [114.028359, 22.668155],
			'红岭支行': [114.110935,22.544267],
			'福莲支行': [114.111666, 22.572647],
			'分行数据中心': [114.069123,22.542027],
			'天安支行': [114.037369,22.542325],
			'德赛数据中心': [113.960819, 22.545133],
			'宝安支行': [113.894068, 22.596304],
			'宝新支行': [113.89558,22.556568],
			'前海支行': [113.918713,22.517346],
			//'科技园支行': [113.960819, 22.545133],
			'海景支行': [114.250092,22.563846],
			'西丽支行': [113.960258,22.583821],
			'侨香支行': [114.005444, 22.547701],
			'龙岗支行': [114.245166,22.718735],
			'分行营业部': [114.073069, 22.558076],
			'东部支行': [114.162939,22.558986],
			'光明支行': [113.95309,22.743926],
			'君汇支行': [113.944534,22.508999]
		}

		var moveLine = {
			'normal': [{
					"fromName": "德赛数据中心",
					"toName": "龙华支行",
					'coords': [
						[113.960819, 22.545133],
						[114.028359, 22.668155]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "红岭支行",
					'coords': [
						[113.960819, 22.545133],
						[114.110935,22.544267]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "福莲支行",
					'coords': [
						[113.960819, 22.545133],
						[114.111666, 22.572647]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "分行数据中心",
					'coords': [
						[113.960819, 22.545133],
						[114.069123,22.542027]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "天安支行",
					'coords': [
						[113.960819, 22.545133],
						[114.037369,22.542325]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "宝安支行",
					'coords': [
						[113.960819, 22.545133],
						[113.894068, 22.596304]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "宝新支行",
					'coords': [
						[113.960819, 22.545133],
						[113.89558,22.556568]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "前海支行",
					'coords': [
						[113.960819, 22.545133],
						[113.918713,22.517346]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "海景支行",
					'coords': [
						[113.960819, 22.545133],
						[114.250092,22.563846]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "西丽支行",
					'coords': [
						[113.960819, 22.545133],
						[113.960258,22.583821]
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "侨香支行",
					'coords': [
						[113.960819, 22.545133],
						[114.005444, 22.547701],
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "龙岗支行",
					'coords': [
						[113.960819, 22.545133],
						[114.245166,22.718735],
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "分行营业部",
					'coords': [
						[113.960819, 22.545133],
						[114.069069, 22.542076],
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "东部支行",
					'coords': [
						[113.960819, 22.545133],
						[114.162939,22.558986],
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "光明支行",
					'coords': [
						[113.960819, 22.545133],
						[113.95309,22.743926],
					]
				},
				{
					"fromName": "德赛数据中心",
					"toName": "君汇支行",
					'coords': [
						[113.960819, 22.545133],
						[113.944534,22.508999],
					]
				},

				{
					"fromName": "分行数据中心",
					"toName": "龙华支行",
					'coords': [
						[114.069123,22.542027],
						[114.028359, 22.668155]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "红岭支行",
					'coords': [
						[114.069123,22.542027],
						[114.110935,22.544267]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "福莲支行",
					'coords': [
						[114.069123,22.542027],
						[114.111666, 22.572647]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "分行数据中心",
					'coords': [
						[114.069123,22.542027],
						[114.069123,22.542027]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "天安支行",
					'coords': [
						[114.069123,22.542027],
						[114.037369,22.542325]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "宝安支行",
					'coords': [
						[114.069123,22.542027],
						[113.894068, 22.596304]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "宝新支行",
					'coords': [
						[114.069123,22.542027],
						[113.89558,22.556568]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "前海支行",
					'coords': [
						[114.069123,22.542027],
						[113.918713,22.517346]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "海景支行",
					'coords': [
						[114.069123,22.542027],
						[114.250092,22.563846]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "西丽支行",
					'coords': [
						[114.069123,22.542027],
						[113.960258,22.583821]
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "侨香支行",
					'coords': [
						[114.069123,22.542027],
						[114.005444, 22.547701],
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "龙岗支行",
					'coords': [
						[114.069123,22.542027],
						[114.245166,22.718735],
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "分行营业部",
					'coords': [
						[114.069123,22.542027],
						[114.069069, 22.542076],
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "东部支行",
					'coords': [
						[114.069123,22.542027],
						[114.162939,22.558986],
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "光明支行",
					'coords': [
						[114.069123,22.542027],
						[113.95309,22.743926],
					]
				},
				{
					"fromName": "分行数据中心",
					"toName": "君汇支行",
					'coords': [
						[114.069123,22.542027],
						[113.944534,22.508999],
					]
				}
			]
		}

		var data = [{
				name: '德赛数据中心',
				value: 500,
				itemStyle: {
					normal: {
						color: '#FFB500',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
			},
			{
				name: '龙华支行',
				itemStyle: {
					normal: {
						color: '#FF6633',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '红岭支行',
				itemStyle: {
					normal: {
						color: 'orange',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '福莲支行',
				itemStyle: {
					normal: {
						color: 'yellow',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '分行数据中心',
				itemStyle: {
					normal: {
						color: '#7AFF00',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 500
			},
			{
				name: '天安支行',
				itemStyle: {
					normal: {
						color: '#2add9c',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '宝安支行',
				itemStyle: {
					normal: {
						color: '#aqua',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '宝新支行',
				itemStyle: {
					normal: {
						color: '#FF6633',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '前海支行',
				itemStyle: {
					normal: {
						color: 'orange',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '科技园支行',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},

			{
				name: '海景支行',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '西丽支行',
				itemStyle: {
					normal: {
						color: 'aqua',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '侨香支行',
				itemStyle: {
					normal: {
						color: 'yellow',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '龙岗支行',
				itemStyle: {
					normal: {
						color: 'yellow',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '分行营业部',
				itemStyle: {
					normal: {
						color: 'yellow',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '东部支行',
				itemStyle: {
					normal: {
						color: 'r',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '光明支行',
				itemStyle: {
					normal: {
						color: '#00FFFD',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			},
			{
				name: '君汇支行',
				itemStyle: {
					normal: {
						color: '#00FFFD',
						shadowBlur: 0,
						shadowColor: '#05C3F9'
					}
				},
				value: 250
			}
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
						color: '#2add9c',
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
						color: '#2add9c',
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
			}
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
				var geoCoord = geoCoordMapData[dataMap[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(5),
					});
				}
			}
			return res;
		};

		var backLinesData = function(data) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var dataItem = data[i];
				var fromCoord = dataItem.coords[1];
				var toCoord = dataItem.coords[0];
				if(fromCoord && toCoord) {
					res.push({
						fromName: dataItem.toName,
						toName: dataItem.fromName,
						coords: [fromCoord, toCoord]
					});
				}
			}
			return res;
		};

		option = {
			backgroundColor: 'rgba(0,0,0,0)',
			color: ['#FF6633', 'orange', 'yellow', 'lime', 'aqua'],
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
				position: 'inside',
				triggerOn: 'click',
				hideDelay: 1000,
				enterable: true,
				formatter: function(params) {
//					console.log(params)
					if(params.componentSubType=="map"){
						return
					}
					var nam=params.name;

					var table;
					if(params.name == "德赛数据中心" || params.name == "分行数据中心") {
						return ;
						table = '<div style="width: 380px;height: 216px;position: absolute;margin-left: 20px;margin-top: -107px;">';
					}if(params.name == "龙岗支行" || params.name == "海景支行"){
						table = '<div style="width: 380px;height: 216px;position: absolute;margin-left: 20px;margin-top: -107px;right:0;">';
						
					}else {
						table = '<div style="width: 380px;height: 216px;position: absolute;margin-left: 20px;margin-top: -107px;">';
					}
//					var ind=get
					var ind=namearr.indexOf(nam);
//					console.log(netData)
//					console.log(ind);
					if(ind==-1){
						if(params.name == "龙岗支行" || params.name == "海景支行"){
							table += '<img src="img/Popuple.png" style="width:100%;height:100%" />' +
						'    <div class="actDynPopupTitle">' + params.name + '</div>' +
						'    <div class="actDynPopupContent"  style="left:10px;">' +
						'        <div style=" display: flex;height: 100%">' +
						'            <div class="ContentStyle" style="flex:0.5;">' +
						'                <p>线路地址：暂无</p>' +
						'                <p>对端地址：暂无</p>' +
						'                <p>进流量利用率：暂无</p>' +
						'                <p>出流量利用率：暂无</p>' +
						'            </div>' +
						'            <div class="ContentStyle1">' +
						'                <p>线路带宽：暂无</p>' +
						'                <p>进流量：暂无</p>' +
						'                <p>出流量：暂无</p>' +
						'                <p>连通性：no</p>' +
						'            </div>' +
						'        </div>' +
						'    </div>' +
						'</div>';
						}else{
							table += '<img src="img/Popup4.png" style="width:100%;height:100%" />' +
						'    <div class="actDynPopupTitle">' + params.name + '</div>' +
						'    <div class="actDynPopupContent">' +
						'        <div style=" display: flex;height: 100%">' +
						'            <div class="ContentStyle">' +
						'                <p>线路地址：暂无</p>' +
						'                <p>对端地址：暂无</p>' +
						'                <p>进流量利用率：暂无</p>' +
						'                <p>出流量利用率：暂无</p>' +
						'            </div>' +
						'            <div class="ContentStyle1">' +
						'                <p>线路带宽：暂无</p>' +
						'                <p>进流量：暂无</p>' +
						'                <p>出流量：暂无</p>' +
						'                <p>连通性：no</p>' +
						'            </div>' +
						'        </div>' +
						'    </div>' +
						'</div>';
						
						}
						
					}else{
						if(params.name == "龙岗支行" || params.name == "海景支行"){
							table += '<img src="img/Popuple.png" style="width:100%;height:100%" />' +
						'    <div class="actDynPopupTitle">' + params.name + '</div>' +
						'    <div class="actDynPopupContent" style="left:10px;">' +
						'        <div style=" display: flex;height: 100%">' +
						'            <div class="ContentStyle" style="flex:0.5;">' +
						'                <p>线路地址：'+netData[ind].peeraddress+'</p>' +
						'                <p>对端地址：'+netData[ind].wanrouterip+'</p>' +
						'                <p>进流量利用率：'+netData[ind].ifInUse_v+'%</p>' +
						'                <p>出流量利用率：'+netData[ind].ifOutUse_v+'%</p>' +
						'            </div>' +
						'            <div class="ContentStyle1">' +
						'                <p>线路带宽：'+ (netData[ind].ifspeed/1000000).toFixed(0)+'Mb/s</p>' +
						'   				<p>连通性：'+netData[ind].connectivity+'</p>' +
						'                <p>进流量：'+(netData[ind].ifIn_v/1000).toFixed(1)+'Kbps</p>' +
						'                <p>出流量：'+(netData[ind].ifOut_v/1000).toFixed(1)+'Kbps</p>' +
						             
						'            </div>' +
						'        </div>' +
						'    </div>' +
						'</div>';
						}else{
							table += '<img src="img/Popup4.png" style="width:100%;height:100%" />' +
						'    <div class="actDynPopupTitle">' + params.name + '</div>' +
						'    <div class="actDynPopupContent">' +
						'        <div style=" display: flex;height: 100%">' +
						'            <div class="ContentStyle">' +
						'                <p>线路地址：'+netData[ind].peeraddress+'</p>' +
						'                <p>对端地址：'+netData[ind].wanrouterip+'</p>' +
						'                <p>进流量利用率：'+netData[ind].ifInUse_v+'%</p>' +
						'                <p>出流量利用率：'+netData[ind].ifOutUse_v+'%</p>' +
						'            </div>' +
						'            <div class="ContentStyle1">' +
						'                <p>线路带宽：'+ (netData[ind].ifspeed/1000000).toFixed(0)+'Mb/s</p>' +
						'   				<p>连通性：'+netData[ind].connectivity+'</p>' +
						'                <p>进流量：'+(netData[ind].ifIn_v/1000).toFixed(1)+'Kbps</p>' +
						'                <p>出流量：'+(netData[ind].ifOut_v/1000).toFixed(1)+'Kbps</p>' +
						             
						'            </div>' +
						'        </div>' +
						'    </div>' +
						'</div>';
						
						}
						
						
					}
					
					return table;
				},
				backgroundColor: 'rgba(0,0,0,0)',
				padding: 10
			},
			legend: {
				show: false,
				orient: 'vertical',
				right: '1%',
				top: '5%',
				selectedMode: false,
				itemWidth: screenWidth >= 1900 ? 25 : 20,
				itemHeight: screenWidth >= 1900 ? 14 : 12,
				itemGap: screenWidth >= 1900 ? 15 : 12,
				data: ['德赛数据中心', '分行数据中心', '龙华支行', '红岭支行', '宝安支行', '宝新支行', '科技园支行', '前海支行', '天安支行', '福莲支行', '海景支行', '西丽支行', '侨香支行', '龙岗支行', '分行营业部', '东部支行', '光明支行', '君汇支行'],
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
				zoom: 1.8,
				top: screenWidth > 1900 ? '5%' : '10%',
				left: '30%',
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
					}).slice(0, 19)),
					symbolSize: function(val) {
						if(screenWidth > 1900) {
							return val[2] / 20;
						} else {
							return val[2] / 25;
						}
					},
					effectType: 'ripple',
					showEffectOn: 'render',
					rippleEffect: {
						scale: 2,
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true,
							padding: [3, 4, 5, 6],
							textStyle: {
								fontSize: 12
							}
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
//				{
//					name: '',
//					type: 'lines',
//					coordinateSystem: 'geo',
//					zlevel: 1,
//					large: true,
//					effect: {
//						show: true,
//						period: 6,
//						symbol: 'arrow',
//						symbolSize: 5,
//						trailLength: 0.1
//					},
//					lineStyle: {
//						normal: {
//							color: '#00FFFD',
//							width: 1,
//							opacity: 0.4,
//							curveness: 0.2
//						}
//					},
//					data: moveLine.normal
//				},
//				{
//					name: '',
//					type: 'lines',
//					coordinateSystem: 'geo',
//					zlevel: 1,
//					large: true,
//					effect: {
//						show: true,
//						period: 6,
//						symbol: 'arrow',
//						symbolSize: 5,
//						trailLength: 0.1
//					},
//					lineStyle: {
//						normal: {
//							color: '#00FFFD',
//							width: 1,
//							opacity: 0.4,
//							curveness: -0.2
//						}
//					},
//					data: backLinesData(moveLine.normal)
//				},

				{
					name: '德赛数据中心',
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
					name: '分行数据中心',
					type: 'lines',
					data: [],
				},
				{
					name: '福莲支行',
					type: 'lines',
					data: [],
				},
				{
					name: '海景支行',
					type: 'lines',
					data: [],
				},
				{
					name: '西丽支行',
					type: 'lines',
					data: [],
				},
				{
					name: '侨香支行',
					type: 'lines',
					data: [],
				},
				{
					name: '龙岗支行',
					type: 'lines',
					data: [],
				},
				{
					name: '红岭支行',
					type: 'lines',
					data: [],
				},
				{
					name: '分行营业部',
					type: 'lines',
					data: [],
				},
				{
					name: '东部支行',
					type: 'lines',
					data: [],
				},
				{
					name: '光明支行',
					type: 'lines',
					data: [],
				},
				{
					name: '君汇支行',
					type: 'lines',
					data: [],
				}
			]
		};
		var forData=moveLine.normal;
		for(var i=0;i<forData.length;i++){
			var value=forData[i];
			var toName=value.toName;
			var fromName=value.fromName;
//			返回的数据中有并且联通性未yes
			var ind=namearr.indexOf(toName);
			var str="";
			if(ind!=-1){
				str=netData[ind].connectivity;
			}
			if((ind!=-1&&str=="yes")||toName=="德赛数据中心"||toName=="分行数据中心"||fromName=="分行数据中心"||fromName=="德赛数据中心"){
				option.series.push({
					name: '',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 1,
					large: true,
					effect: {
						show: true,
						period: 6,
						symbol: 'arrow',
						symbolSize: 5,
						trailLength: 0.1
					},
					
					lineStyle: {
						normal: {
							color: '#00FFFD',
							width: 1,
							opacity: 0.4,
							curveness: 0.2
						}
					},
					data: [moveLine.normal[i]]
				},
				{
					name: '',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 1,
					large: true,
					effect: {
						show: true,
						period: 6,
						symbol: 'arrow',
						symbolSize: 5,
						trailLength: 0.1
					},
					lineStyle: {
						normal: {
							color: '#00FFFD',
							width: 1,
							opacity: 0.4,
							curveness: -0.2
						}
					},
					data: [backLinesData(moveLine.normal)[i]]
				}
				)
			}else{
				option.series.push({
					name: '',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 1,
					large: true,
					effect: {
						show: true,
						period: 6,
						symbol: 'arrow',
						symbolSize: 5,
						trailLength: 0.1
					},
					
					lineStyle: {
						normal: {
							color: 'red',
							width: 1,
							opacity: 0.4,
							curveness: 0.2
						}
					},
					data: [moveLine.normal[i]]
				},
				{
					name: '',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 1,
					large: true,
					effect: {
						show: true,
						period: 6,
						symbol: 'arrow',
						symbolSize: 5,
						trailLength: 0.1
					},
					lineStyle: {
						normal: {
							color: 'red',
							width: 1,
							opacity: 0.4,
							curveness: -0.2
						}
					},
					data: [backLinesData(moveLine.normal)[i]]
				}
				)
			}
		}
		
		
		
		
		myChart.setOption(option);

		// myChart.on('click', function(e) {
		// 	if(e.componentSubType=="map"){
		// 		return false;
		// 	}else{
		// 		console.log(33)
		// 		if(e.seriesIndex == 2 && flag == true) {
		// 			flag = false;
		// 			clearInterval(mTime);
		// 		}
		// 	}
			
		// });

		// myChart.on('mouseout', function(e) {
		// 	if(e.seriesIndex == 2 && flag == false) {
		// 		mTime = setInterval(function() {
		// 			myChart.dispatchAction({
		// 				type: 'showTip',
		// 				seriesIndex: 2,
		// 				dataIndex: index
		// 			});
		// 			index++;
		// 			if(index > data.length) {
		// 				index = 0;
		// 			}
		// 		}, 5000);
		// 		flag = true;
		// 	}

		// });

		// var index = 0; //播放所在下标
		// var mTime = setInterval(function() {
		// 	myChart.dispatchAction({
		// 		type: 'showTip',
		// 		seriesIndex: 2,
		// 		dataIndex: index
		// 	});
		// 	index++;
		// 	if(index > data.length) {
		// 		index = 0;
		// 	}
		// }, 5000);

	});

	/*窗口自适应，关键代码*/
	$(window).resize(function() {
		myChart.resize();
	});
}