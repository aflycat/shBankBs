var currentMeetNum = -1;
var adcodeResult;
var myTimer;
$(function() {
	adcodeResult = GetRequest('id') == null ? 5 : GetRequest('id');
	getKey();
	getTitleName();
	getNowMeetListData();
});

function getTitleName(){
	$.ajax({
		type: 'post',
		url: '/api/Event/get_meeting_room_name',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		dataType: "json",
		data: {
			roomId: adcodeResult
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data != "") {
				var result = dt.HttpData.data[0];
				$(".total-title").html(result.name); //更新主标题
			}
		}
	});
}

function getNowMeetListData() {
	//获取今日通过的会议
	$.ajax({
		type: 'post',
		url: '/api/Event/get_today_meet_room_list',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		dataType: "json",
		data: {
			time: createDate(),
			roomId: adcodeResult
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data != "") {
				var result = dt.HttpData.data;
				var nowTime = getNowFormatDate();
				var processData = ""; //进行中
				var beginData = ""; //未开始
				var finishData = ""; //已结束
				for(var i = 0; i < result.length; i++) {
					var meetType = "";
					if(result[i].type == 0) {
						meetType = "培训"
					} else if(result[i].type == 1) {
						meetType = "一级会议"
					} else if(result[i].type == 2) {
						meetType = "二级会议"
					} else if(result[i].type == 3) {
						meetType = "其他"
					} else if(result[i].type == 4) {
						meetType = "三级会议"
					}
					var strData = "<tr>" +
						"	<td>" + timeSplit(result[i].begintime) + "</td>" +
						"	<td>" + timeSplit(result[i].endTime) + "</td>" +
						"	<td>" + result[i].topic + "</td>" +
						"	<td>" + meetType + "</td>";
					if(timeSplitT(result[i].begintime) <= nowTime && nowTime <= timeSplitT(result[i].endTime) && result[i].result == 2) {
						strData = "<tr class='font-check-box'>" +
						"	<td>" + timeSplit(result[i].begintime) + "</td>" +
						"	<td>" + timeSplit(result[i].endTime) + "</td>" +
						"	<td>" + result[i].topic + "</td>" +
						"	<td>" + meetType + "</td>";
						processData += strData + "<td><span class='process-span'>进行中</span></td></tr>";
						currentMeetNum = i;
						$(".top-left-box").html('<span>'+geTtimeSplitHourMinute(result[i].begintime)+'</span><span>'+getXietimeSplitT(result[i].begintime)+'</span><span>'+getWeektimeSplitT(result[i].begintime)+'</span>')
					} else if(nowTime > timeSplitT(result[i].endTime) || result[i].result == 3) {
						finishData += strData + "<td><span class='finish-span'>已结束</span></td></tr>";
					} else if(nowTime < timeSplitT(result[i].begintime) && result[i].result == 2) {
						beginData += strData + "<td><span class='begin-span'>未开始</span></td></tr>";
					}
					if(i == result.length - 1) {
						$(".container-table>table>tbody").html(finishData + processData + beginData);
					}
				}
				if(currentMeetNum != -1) {
					var department = getUserInfo(result[currentMeetNum].applicant, 0);
					var othersData = [];
					var others = result[currentMeetNum].others;
					if(others != "" && others != null) {
						var othersArr = others.split(",");
						for(var i = 0; i < othersArr.length; i++) {
							var otherName=getUserInfo(othersArr[i], 1);
							if(otherName){
								othersData.push(otherName)
							}
						}
					}
					var meetType = "";
					if(result[currentMeetNum].type == 0) {
						meetType = "培训"
					} else if(result[currentMeetNum].type == 1) {
						meetType = "一级会议"
					} else if(result[currentMeetNum].type == 2) {
						meetType = "二级会议"
					} else if(result[currentMeetNum].type == 3) {
						meetType = "其他"
					} else if(result[currentMeetNum].type == 4) {
						meetType = "三级会议"
					}

					var currentMeetData = '<ul>' +
						'	<li><label>召集部门</label><span>' + department + '</span></li>' +
						'	<li><label>会议类型</label><span>' + meetType + '</span></li>' +
						'</ul>' +
						'<ul>' +
						'	<li><label>会议联系人</label><span>' + result[currentMeetNum].contact + '</span></li>' +
						'	<li><label>会议时间</label><span>' + timeSplit(result[currentMeetNum].begintime) + " - " + timeSplit(result[currentMeetNum].endTime) + '</span></li>' +
						'</ul>' +
						'<ul>' +
						'	<li><label>会议主题</label><span>' + result[currentMeetNum].topic + '</span></li>' +
						'	<li><label>会议内容</label><span>' + result[currentMeetNum].meetingContent + '</span></li>' +
						'</ul>' +
						'<ul>' +
						'	<li><label>参会人员</label><span>' + othersData + '</span></li>' +
						'	<li><label>会议服务</label><span>' + result[currentMeetNum].service + '</span></li>' +
						'</ul>';
					$(".container-ul").html(currentMeetData);
					/*$("#qrcodeId").html("");
					$("#qrcodeId").qrcode({
						render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好，使用table兼容
						text: "meetingSign##" + result[currentMeetNum].id, //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
						width: $('#qrcodeId').width(), //二维码的宽度
						height: $('#qrcodeId').height(), //二维码的高度
						background: "#ffffff", //二维码的后景色
						foreground: "#000000", //二维码的前景色
						src: 'img/logo.png', //二维码中间的图片
						correctLevel: QRErrorCorrectLevel.H //QRErrorCorrectLevel={L:1,M:0,Q:3,H:2}
					});*/

					$.ajax({
						type: 'get',
						url: '/api/Event/CreateQRCode',
						headers: {
							Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
						},
						dataType: "json",
						data: {
							content: "meetSign##" + result[currentMeetNum].id
						},
						success: function(dt) {
							if(dt.HttpStatus == 200 && dt.HttpData != "") {
								var result = dt.HttpData;
								$("#qrcodeId").attr("src", result)
								$("#qrcodeId").show();
							}
						}
					});
					$(".top-left-box").show();
					$(".top-center-box").show();
					$(".right-center-box").show();
				} else {
					$(".top-left-box").hide();
					$(".top-center-box").hide();
					$(".right-center-box").hide();
				}
				currentMeetNum=-1;
				$(".meet-container").show();
				myTimer=setTimeout(getNowMeetListData, 10000);
			} else {
				// $(".meet-container").hide();
				$(".container-table table tr th").css({
					border: "0px solid"
				})
			}
		}
	});
}

//获取用户信息
function getUserInfo(carNum, type) {
	var nowData = "";
	$.ajax({
		type: 'post',
		url: '/api/Event/get_mem_infor_work',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		dataType: "json",
		async: false,
		data: {
			workNo: carNum
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data != "") {
				var result = dt.HttpData.data[0];
				if(type == 0) {
					nowData = result.department;
				} else {
					nowData = result.name;
				}
			}
		}
	});
	return nowData;
}

function getKey() {
	//获取key
	$.ajax({
		type: 'post',
		url: '/api/server/getkey',
		dataType: "json",
		async: false,
		data: {
			username: "admin",
			userpwd: "admin"
		},
		success: function(dt) {
			if(dt.HttpStatus == 200) {
				var dts = dt.HttpData;
				if(dts.code == 200) {
					var getkeys = dts.data;
					window.localStorage.ac_appkey = getkeys.appkey;
					window.localStorage.ac_infokey = getkeys.infokey;
				}
			}
		}
	});
}

function createDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	var strDate = date.getDate();
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

function getNowFormatDate() {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	　　
	var ms = now.getMilliseconds(); //获取毫秒
	var week;
	month = month + 1;
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	if(hour < 10) hour = "0" + hour;
	if(minu < 10) minu = "0" + minu;
	if(sec < 10) sec = "0" + sec;
	if(ms < 100) ms = "0" + ms;
	var time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
	return time;
}

function timeSplit(str) {
	if(str) {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		var hour=time.substring(0,2);
		var data=time.substring(0,5);
		var strData="AM";
		if(hour>12){
			strData="PM"
		}
		return data+strData;
	}
}

function timeSplitT(str) {
	if(str) {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		arr = date + " " + time
		return arr;
	}
}

function getXietimeSplitT(str) {
	if(str) {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		arr = date.replace("-","/");
		return arr;
	}else{
		return "";
	}
}

function geTtimeSplitHourMinute(str) {
	if(str) {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		arr = time.substring(0,2)+" : "+time.substring(3,5);
		return arr;
	}
}

function getWeektimeSplitT(str) {
	return "星期" + "日一二三四五六".charAt(new Date().getDay())
}

function GetRequest(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}