var currentMeetNum = -1;
var adcodeResult;
$(function() {
	adcodeResult = GetRequest('adcodeResult') == null ? 5 : GetRequest('adcodeResult');
	getKey();
	getNowMeetListData();
	setInterval(getNowMeetListData, 300000)
});

function getNowMeetListData() {
	//获取今日通过的会议
	$.ajax({
		type: 'post',
		url: '/api/Event/get_today_meet_simple_room',
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
					}
					var strData = "<tr>" +
						"	<td>" + timeSplit(result[i].begintime) + "</td>" +
						"	<td>" + timeSplit(result[i].endTime) + "</td>" +
						"	<td>" + result[i].topic + "</td>" +
						"	<td>" + meetType + "</td>";
					if(!result[i].status) {
						finishData += strData + "<td><span class='finish-span'>已结束</span></td></tr>";
					} else {
						if(timeSplitT(result[i].begintime) <= nowTime && nowTime <= timeSplitT(result[i].endTime)) {
							processData += strData + "<td><span class='process-span'>进行中</span></td></tr>";
							currentMeetNum = i;
						} else if(nowTime > timeSplitT(result[i].endTime)) {
							finishData += strData + "<td><span class='finish-span'>已结束</span></td></tr>";
						} else if(nowTime < timeSplitT(result[i].begintime)) {
							beginData += strData + "<td><span class='begin-span'>未开始</span></td></tr>";
						}
					}
					if(i == result.length - 1) {
						$(".total-title").html(result[i].meetroom);//更新主标题
						$(".container-table>table>tbody").html(processData + beginData + finishData);
					}
				}
				if(currentMeetNum != -1) {
					var department = getUserInfo(result[currentMeetNum].applicant, 0);
					var othersData = [];
					var others = result[currentMeetNum].others;
					if(others != "" && others != null) {
						var othersArr = others.split(",");
						for(var i = 0; i < othersArr.length; i++) {
							othersData.push(getUserInfo(othersArr[i], 1))
						}
					}
					var meetType = "";
					if(result[currentMeetNum].type == 0) {
						meetType = "培训"
					} else if(result[currentMeetNum].type == 1) {
						meetType = "一级会议"
					} else if(result[currentMeetNum].type == 2) {
						meetType = "二级会议"
					}
					var currentMeetData = "<li>" + department + "</li>" +
						"<li>" + result[currentMeetNum].applicant + "</li>" +
						"<li>" + result[currentMeetNum].topic + "</li>" +
						"<li>" + meetType + "</li>" +
						"<li>" + timeSplit(result[currentMeetNum].begintime) + " - " + timeSplit(result[currentMeetNum].endTime) + "</li>" +
						"<li>" + result[currentMeetNum].meetingContent + "</li>" +
						"<li>" + othersData + "</li>" +
						"<li>" + result[currentMeetNum].service + "</li>";
					$(".container-ul ul").eq(1).html(currentMeetData);
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
							content: "meetingSign##" + result[currentMeetNum].id
						},
						success: function(dt) {
							if(dt.HttpStatus == 200 && dt.HttpData != "") {
								var result = dt.HttpData;
								$("#qrcodeId").attr("src",result)
								$("#qrcodeId").show();
							}
						}
					});
					
					$(".container-ul ul").eq(0).show();
					$(".container-img").show();
				} else {
					$(".container-ul ul").eq(0).hide();
					$(".container-img").hide();
				}
			}else{
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
		url: '/api/Event/get_mem_infor',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		dataType: "json",
		async: false,
		data: {
			carNum: carNum
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
	if(str != "") {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		arr = date + " " + time
		return time;
	}
}

function timeSplitT(str) {
	if(str != "") {
		var arr = null;
		var date = str.split("T")[0];
		var time = str.split("T")[1].split("+")[0];
		arr = date + " " + time
		return arr;
	}
}

function GetRequest(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}