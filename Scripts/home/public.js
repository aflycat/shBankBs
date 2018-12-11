function loadThisAdmin(sys){
	var data={
		sys:sys,
		workNo:window.localStorage.userName
	}
	var txt=""
	JQajaxo("post", "/api/Event/get_admin", false, data, _success);
	function _success(res){
		txt=res.HttpData
		
		
	}
	return txt;
}
function CompareDate(d1,d2)
{
  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}

function loadSysNum(id,sys){
		JQajaxo("post", "/api/Event/get_sys_auth_num", "true",{sys:sys}, _success);
		function _success(res){
			var dat=res.HttpData.data,lg=dat.length;
			var all=0,ysq=0,dsq=0;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				if(value.type==0){
					$(".itemList .itemOne").eq(id).find(".dsq").text(value.count)
					dsq=value.count;
				}
				if(value.type==1){
					$(".itemList .itemOne").eq(id).find(".ysq").text(value.count)
					ysq=value.count;
				}
				if(value.type==2){
					$(".itemList .itemOne").eq(id).find(".dcq").text(value.count)
				}
				if(value.type==3){
					$(".itemList .itemOne").eq(id).find(".ycq").text(value.count)
				}
			}
			all=dsq+ysq;
			$(".itemList .itemOne").eq(id).find(".allNum").text(all);
		}
	}
function paddingCount(dom,heiDom,lg){
		var str=dom.css("height")
		var hei=str.substring(0,str.length-2);
		if(lg*48<hei){
			heiDom.css({padding:"0px"})
		}else{
			heiDom.css({paddingRight:"18px"})
		}
	}
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

function stopEvent(event){ //阻止冒泡事件
 //取消事件冒泡
 var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
 if (e && e.stopPropagation) {
  // this code is for Mozilla and Opera
  e.stopPropagation();
 } else if (window.event) {
  // this code is for IE
    window.event.cancelBubble = true;
 }
}

function getMonDate()
{
	var d=new Date(),
		day=d.getDay(),
		date=d.getDate();
	if(day==1)
		return d;
	if(day==0)
		d.setDate(date-6);
	else
		d.setDate(date-day+1);
	return d;
}
// 0-6转换成中文名称
function getDayName(day){
	var day=parseInt(day);
	if(isNaN(day) || day<0 || day>6)
	return false;
	var weekday=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
	return weekday[day];
}
function hideMulCheck(dom){
		$(dom).find('.checkWrap').hide()
		$(dom).find('.memSelect').hide();
//		$("#").css({borderColor:"#66afe9",outline:"0"});
	}
function reLogin(){
	if(window.localStorage.userName!=""&&window.localStorage.userName!=null){
//		window.location.href = "/Views/Home/index.html";
	}else{
		window.location.href = "/Views/Home/login.html";
	}
}
function getTime(){
	var myDate=new Date();
	var years=myDate.getFullYear();
	
	var day=myDate.getDate()<10?("0"+(myDate.getDate())):(myDate.getDate());
	
	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
	
	var hours=myDate.getHours()<10?("0"+(myDate.getHours())):myDate.getHours();
	
	var min=myDate.getMinutes()<10?("0"+(myDate.getMinutes())):myDate.getMinutes();
	
	var sec=myDate.getSeconds()<10?("0"+(myDate.getSeconds())):myDate.getSeconds();
	
	return years+"/"+mon+"/"+day+" "+hours+":"+min;
}
function getTodayBegin(){
	var myDate=new Date();
	var years=myDate.getFullYear();
	
	var day=myDate.getDate()<10?("0"+(myDate.getDate())):(myDate.getDate());
	
	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
	
	return years+"/"+mon+"/"+day+" 00:00"
}
function getDate(){
	var myDate=new Date();
	var years=myDate.getFullYear();
	
	var day=myDate.getDate()<10?("0"+(myDate.getDate())):(myDate.getDate());
	
	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
	
	return years+"/"+mon+"/"+day
}

 //jQuery HTML导出Excel文件(兼容IE及所有浏览器)
        function HtmlExportToExcel(data,colName,filename,deal,colName2) {
        	
            if (getExplorer() == 'ie' || getExplorer() == undefined) {
            	
                HtmlExportToExcelForIE(data,colName, filename,deal,colName2);
            }
            else {
                HtmlExportToExcelForEntire(data,colName, filename,deal,colName2)
            }
        }
        //IE浏览器导出Excel
        function HtmlExportToExcelForIE(data,colName, filename,deal,colName2) {
            try {
                var winname = window.open('', '_blank', 'top=10000');
                var strHTML;
                if(deal==1){
					strHTML = creatTableHtml(data,colName,colName2);
				}else{
					strHTML = creatTableHtml(data,colName);
				}
                winname.document.open('application/vnd.ms-excel', 'export excel');
                winname.document.writeln(strHTML);
                winname.document.execCommand('saveas', '', filename + '.xls');
                winname.close();

            } catch (e) {
                alert(e.description);
            }
        }
        //非IE浏览器导出Excel
        var HtmlExportToExcelForEntire = (function() {
            var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            return function(data,colName, filename,deal,colName2) {
//              if (!table.nodeType) { table = document.getElementById(table); }
				var ctx
				if(deal==1){
					ctx = { worksheet: filename || 'Worksheet', table: creatTableHtml2(data,colName,colName2) }
				}else{
					ctx = { worksheet: filename || 'Worksheet', table: creatTableHtml(data,colName) }
				}

                document.getElementById("dlink").href = uri + base64(format(template, ctx));
                document.getElementById("dlink").download = filename + ".xls";
                document.getElementById("dlink").click();
            }
        })()
        function getExplorer() {
            var explorer = window.navigator.userAgent;
            //ie 
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //firefox 
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome
            else if (explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
            }
            //Opera
            else if (explorer.indexOf("Opera") >= 0) {
                return 'Opera';
            }
            //Safari
            else if (explorer.indexOf("Safari") >= 0) {
                return 'Safari';
            }
        }		
		
//		var table= creatTableHtml(data,colName)	;
		function creatTableHtml(data,colName){
			var table=$("<table></table>");
			
			var thead=$("<tr></tr>");
			var body="";
			for(var i=0;i<colName.length;i++){
				name=colName[i].label;
				var td='<th>'+name+'</th>';
				thead.append(td);

			}
			table.append(thead);
			var tbd="";
			for(var m=0;m<data.length;m++){
				tbd+='<tr>';
				for(var i=0;i<colName.length;i++){
					if(colName[i].type=="string"){
						tbd+='<td>'+data[m][colName[i].key]+'</td>';
					}else if(colName[i].type=="time"){
						if(data[m][colName[i].key]){
							tbd+='<td>'+data[m][colName[i].key].replace("T"," ")+'</td>';
						}else{
							tbd+='<td>'+data[m][colName[i].key]+'</td>';
						}
						
						
					}else if(colName[i].type=="list"){
						tbd+='<td>'+colName[i].res[data[m][colName[i].key]]+'</td>';
					}else if(colName[i].type=="bool"){
						if(data[m][colName[i].key]){
							tbd+='<td>'+colName[i].res[1]+'</td>';
						}else{
							tbd+='<td>'+colName[i].res[0]+'</td>';
						}
					}
					
					
				}
				tbd+='</tr>'
			}
			table.append(tbd);
			return table.html();

		}
		function creatTableHtml2(data,colName,data2){
			var table=$("<table></table>");
			
			var thead=$("<tr></tr>");
			var body="";
			for(var i=0;i<colName.length;i++){
				name=colName[i].label;
				var td='<th>'+name+'</th>';
				thead.append(td);

			}
			table.append(thead);
			var tbd="";
			for(var m=0;m<data.length;m++){
				tbd+='<tr>';
				for(var i=0;i<colName.length;i++){
					if(colName[i].type=="string"){
						tbd+='<td>'+data[m][colName[i].key]+'</td>';
					}else if(colName[i].type=="time"){
						if(data[m][colName[i].key]){
							tbd+='<td>'+data[m][colName[i].key].replace("T"," ")+'</td>';
						}else{
							tbd+='<td>'+data[m][colName[i].key]+'</td>';
						}
						
						
					}else if(colName[i].type=="list"){
						tbd+='<td>'+colName[i].res[data[m][colName[i].key]]+'</td>';
					}else if(colName[i].type=="bool"){
						if(data[m][colName[i].key]){
							tbd+='<td>'+colName[i].res[1]+'</td>';
						}else{
							tbd+='<td>'+colName[i].res[0]+'</td>';
						}
					}
					
					
				}
				tbd+='</tr>'
			}
			
			table.append(tbd);
			
			var thead=$('<tr ></tr>');
			var body="";
			for(var i=0;i<colName.length;i++){
				name=colName[i].label;
				var td='<th style="background:green;">'+name+'</th>';
				thead.append(td);

			}
			table.append(thead);
			var tbd="";
			for(var m=0;m<data2.length;m++){
				tbd+='<tr>';
				for(var i=0;i<colName.length;i++){
					if(colName[i].type=="string"){
						tbd+='<td style="background:green;">'+data2[m][colName[i].key]+'</td>';
					}else if(colName[i].type=="time"){
						if(data2[m][colName[i].key]){
							tbd+='<td style="background:green;">'+data2[m][colName[i].key].replace("T"," ")+'</td>';
						}else{
							tbd+='<td style="background:green;">'+data2[m][colName[i].key]+'</td>';
						}
						
						
					}else if(colName[i].type=="list"){
						tbd+='<td style="background:green;">'+colName[i].res[data2[m][colName[i].key]]+'</td>';
					}else if(colName[i].type=="bool"){
						if(data2[m][colName[i].key]){
							tbd+='<td style="background:green;">'+colName[i].res[1]+'</td>';
						}else{
							tbd+='<td style="background:green;">'+colName[i].res[0]+'</td>';
						}
					}
					
					
				}
				tbd+='</tr>'
			}
			
			table.append(tbd);
			return table.html();

		}

function sms(tel,cont){
	var data={
		DestAddr:tel,
		Content:cont
	}
	console.log(data)
	$.ajax({
		type:"post",
		url:"http://10.7.1.192:9000/api/msg/sms",
		async:true,
		data: data,
		success:function(res){
			var dat=JSON.parse(res).Status;
			if(dat==0){
				console.log("短信发送成功")
			}else{
				console.log("短信发送失败")
			}
		}
	});

}
function mail(sender,sendTo,copyTo,hiddenTo,title,content){
	var data={
		Sender:sender,
		SendTo:sendTo,
		CopyTo:copyTo,
		HiddenTo:hiddenTo,
		Title:title,
		Content:content,
	}
	console.log(data)
	$.ajax({
		type:"post",
		url:"http://10.7.1.192:9000/api/msg/mail",
		async:true,
		data: data,
		success:function(res){
		console.log(res)
			
			var dat=JSON.parse(res).Status;
			if(dat==0){
				console.log("邮件发送成功")
			}else{
				console.log("邮件发送失败")
			}
		}
	});

}

function propmsm(id){
	JQajaxo("post","/api/Event/get_prop_link",true,{id:id},_success)
	function _success(res){
		var dat=res.HttpData.data[0];
		console.log(dat)
		var start=dat.begintime.replace("T"," ");
		var end=dat.endTime.replace("T"," ");
		var roomName=dat.name;
		var tel=dat.propPhone;
		var prop=dat.propName;
		var mails=dat.propMail;
		var cont=prop+",会议室："+roomName+"的会议已经提前结束，请尽快处理。会议原结束时间："+end;
		var content=prop+",会议室："+roomName+"的会议已经提前结束，请尽快处理。会议原开始时间："+start+"会议原结束时间："+end;
		sms(tel,cont);
		mail("",mails,"","","会议提前结束通知",content)
	}
}
function JQajaxo(_type, _url, _asycn, _data, _success) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        timeout: 5000,
        async: _asycn,
        data: _data,
        headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
        success: _success
        
        
    });
}
function deleLast(str){
	if(str){
		return str.substring(0, str.lastIndexOf(','));
	}else{
		return "无"
	}
	
	
	  
}
