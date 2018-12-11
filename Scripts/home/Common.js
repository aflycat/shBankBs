/*==============================
作者：Lzw   
创建：2014年9月10日 09:42:45
更新：2014年9月10日 09:42:50
==============================*/
//Hide the popup window.    
function HideModelPopupWindow(ampBehaviorID) {
    var ampWin = $find(ampBehaviorID);
    ampWin.hide();
}
//Show the popup window.
function ShowModelPopupWindow(ampBehaviorID) {
    var ampWin = $find(ampBehaviorID);
    ampWin.show();
}

//Hide the popup window reload
function HideModelPopupWindowReload(amp) {
    HideModelPopupWindow(amp);
    window.location.href = window.location.href;
}

function f_addTab(tabid, text, url) {
    if (top.$("#framecenter").ligerTab().isTabItemExist(tabid)) {
        top.$("#framecenter").ligerTab().removeTabItem(tabid);
        top.$("#framecenter").ligerTab().addTabItem({ tabid: tabid, text: text, url: url });
    }
    else
        top.$("#framecenter").ligerTab().addTabItem({ tabid: tabid, text: text, url: url });
}
function removeTabItem(tabId) {
    if (top.$("#framecenter").ligerTab().isTabItemExist(tabId)) {
        top.$("#framecenter").ligerTab().removeTabItem(tabId);
    }
}

function FblurNumber(obj, Vtitle) {
    var VtxtValue = $("#" + obj.id).val();
    if (VtxtValue != "") {
        if (!isNumber(VtxtValue)) {
            jAlert(Vtitle + "只能输入数字！", 2);
            $("#" + obj.id).val("");
        }
    }
}
//验证只能输入数字和小数
function isNumber(value) {
    if (value == "") {
        return false;
    } else {
        return /^\d+(?=\.{0,1}\d+$|$)/.test(value);
    }
}
//验证只能输入整数
function checkNum(obj) {
    var type = /^[0-9]*[1-9][0-9]*$/;
    var re = new RegExp(type);
    if (obj.match(re) == null) {
        return false;
    }
    return true;
    //       
    //    if(r.test(obj))
    //    {
    //        var re = new RegExp(type);
    //        if (string_value.match(re) == null) {
    //            return false;
    //        }
    //        else {
    //            return true;
    //        }
    //    }
    //return /^[0-9]*[1-9][0-9]*$/.test(obj);
}

/*==============================
作者：lzw   
创建：2016年7月6日 09:56:26
==============================*/

//只能输入数字或为空
function InputTextNumOrNull(e) {
    if (e.value != "" && !checkNum(e.value)) {
        e.value = "";
    }
}

//设置当前选项卡标题
// onclick="LigerSetTabName('设置了新标题')"
function LigerSetThisTabName(tabname) {
    $(top.document).find("li[tabid=" + top.tab.selectedTabId + "]").find("a").text(tabname);
}

//设置指定选项卡标题
// onclick="LigerSetTabName(1371,'设置了新标题')"
function LigerSetTabName(tabid, tabname) {
    $(top.document).find("li[tabid=" + tabid + "]").find("a").text(tabname);
}

//刷新加载LigerUI当前选项卡
function LigerReloadThisFrame() {
    var win = $(top.document.getElementById(top.tab.selectedTabId))
    win.attr('src', win.attr('src'));
}

//刷新指定的LigerUI选项卡
function LigerReloadFrame(tabid) {
    var win = $(top.document.getElementById(tabid))
    win.attr('src', win.attr('src'));
}

//关闭当前选项卡
function removeThisTabItem() {
    if (top.$("#framecenter").ligerTab().isTabItemExist(top.tab.selectedTabId)) {
        top.$("#framecenter").ligerTab().removeTabItem(top.tab.selectedTabId);
    }
}

//创建a标签，target_blank新选项卡打开页面
function addTable(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "addTable");
    document.body.appendChild(a);
    a.click();
}

/*==============================
作者：huangrong   
创建：2015年6月1日 16:54
==============================*/
// 脚本方式打开新窗口
function openWindow(url, width, height) {
    try {
        // 计算宽度高度
        // screen.width, screen.height
        var minwidth = screen.width;
        var minheight = screen.height;
        if (width) minwidth = width > screen.width ? screen.width : width;
        if (height) minheight = height > screen.height ? screen.height : height;
        var left = (screen.width - minwidth) / 2;
        var top = (screen.height - minheight) / 2;
        var date = new Date();
        //如果高度等于了屏幕大小，则要减去桌面工具栏高度
        if (minheight == screen.height) {
            minheight = minheight - 80;
        }
        window.open(url
        , date.valueOf()
        , 'height=' + minheight + ', width=' + minwidth + ', top=' + top + ',left=' + left + ', toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no'
        );
        return true;
    } catch (e) {
        return false;
    }

    /*
    window.open 弹出新窗口的命令； 
    'page.html' 弹出窗口的文件名； 
    'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
    height=100 窗口高度； 
    width=400 窗口宽度； 
    top=0 窗口距离屏幕上方的象素值； 
    left=0 窗口距离屏幕左侧的象素值； 
    toolbar=no 是否显示工具栏，yes为显示； 
    menubar，scrollbars 表示菜单栏和滚动栏。 
    Resizable=no 是否允许改变窗口大小，yes为允许； 
    location=no 是否显示地址栏，yes为允许； 
    status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许； 
    */
}

/*==============================
作者：calent
创建：2010-6-25
更新：2010-11-16
==============================*/
/*
功能：设为首页
实例：onclick="setHomePage('http://www.yunfei88.com')"
*/
function setHomePage(url) {
    try {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'。");
            };
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'" + url + "'设为首页。");
        };
    };
}
/*
功能：加入收藏夹
实例：onclick="addFavorite('云飞软件','http://www.yunfei88.com')"
*/
function addFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, '');
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n请按'Ctrl+D'将'" + url + "'加为收藏。");
        }
    }
}
/*
功能：实时检测输入框剩余字符(基于jQuery)
实例：onkeyup="getLeftLen(this,'charLeft')"; 剩余<span id="charLeft"></span>个字符。
*/
function getLeftLen(_this, charLeft) {
    var $this = $(_this);
    var maxChars = $this.attr('maxlength');
    var leftLen = 0;
    if (maxChars >= $this.val().length) {
        leftLen = maxChars - $this.val().length;
    } else {
        $this.val($this.val().substring(0, maxChars));
    }
    $('#' + charLeft).html(leftLen);
}
/*
功能：等比缩放图片
实例：onload="resizePic(this,100,88)"
*/
function resizePic(_this, fitWidth, fitHeight) {
    var image = new Image();
    image.src = _this.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= fitWidth / fitHeight) {
            if (image.width > fitWidth) {
                _this.width = fitWidth;
                _this.height = (image.height * fitWidth) / image.width;
            }
            else {
                _this.width = image.width;
                _this.height = image.height;
            }
        }
        else {
            if (image.height > fitHeight) {
                _this.height = fitHeight;
                _this.width = (image.width * fitHeight) / image.height;
            }
            else {
                _this.width = image.width;
                _this.height = image.height;
            }
        }
    }
}
/*
功能：单选、复选高亮选中行(基于jQuery)
实例：onclick="toggleClass(this)"
*/
function toggleClass(_this) {
    $(_this).parent().parent('tr').toggleClass('trSel', _this.checked == true);
}
/*
功能：单选框单选(基于jQuery)
实例：onclick="checkRadio(this,'gvList')"
*/
function checkRadio(_this, rdobox) {
    var $rdobox = $('#' + rdobox).find(':radio');
    $rdobox.each(function() {
        this.checked = false;
        toggleClass(this);
    });
    _this.checked = true;
    toggleClass(_this);
}
/*
功能：复选框全选、反选、取消、取值(基于jQuery)
实例：onclick="checkAll('gvList')"
*/
//全选
function checkAll(chkbox) {
    var $chkbox = $('#' + chkbox).find(':checkbox');
    $chkbox.setChecked('all');
}
//反选
function checkToggle(chkbox) {
    var $chkbox = $('#' + chkbox).find(':checkbox');
    $chkbox.setChecked('toggle');
}
//取消
function checkNone(chkbox) {
    var $chkbox = $('#' + chkbox).find(':checkbox');
    $chkbox.setChecked('none');
}
//取值
function getCheckedVal(chkbox) {
    var $chkbox = $('#' + chkbox).find(':checkbox');
    return $chkbox.getCheckVal();
}
//全选、取消(control为linkButton)
function toggleCheck(_this, chkbox) {
    var $this = $(_this);
    var $chkbox = $('#' + chkbox).find(':checkbox');
    if ($.trim($this.text()) == '全选') {
        $chkbox.setChecked('all');
        $this.text('取消');
    } else {
        $chkbox.setChecked('none');
        $this.text('全选');
    }
}
//全选，取消(control为checkbox)
function toggleCheckAll(_this, chkbox) {
    var $this = $(_this);
    var $chkbox = $('#' + chkbox).find(':checkbox');
    if ($this.attr("checked") == true) {
        $chkbox.setChecked('all');
    } else {
        $chkbox.setChecked('none');
    }
}
//插件
(function($) {
    $.fn.setChecked = function(state) {
        this.each(function() {
            switch (state) {
                case 'all':     //全选
                    this.checked = true;
                    break;
                case 'toggle':  //反选
                    this.checked = !this.checked;
                    break;
                case 'none':    //取消
                    this.checked = false;
                    break;
            }
            toggleClass(this);
        });
    };
    $.fn.getCheckedVal = function() {
        var val = new Array();
        this.each(function() {
            if (this.checked) val.push(this.value);
        })
        return val.join(',');
    };
})(jQuery);
/*
功能：输入框提示文字的显示与隐藏插件(基于jQuery)
实例：$('#keyWord').autoRemind();
*/
(function($) {
    $.fn.autoRemind = function(options) {
        var defaults = {
            blurColor: '#999',      //失焦颜色
            focusColor: '#333',     //获焦颜色
            auto: true,             //是否自动
            toggleClass: 'focus'    //切换样式
        };
        var opts = $.extend(defaults, options);
        this.each(function() {
            var $this = $(this);
            if (opts.auto) {
                $this.css('color', opts.blurColor);
            }
            var tips = $.trim($this.val());
            if (tips) {
                $this.focus(function() {
                    if ($.trim($this.val()) == tips) {
                        $this.val('');
                    }
                    $this.css('color', opts.focusColor).addClass(opts.toggleClass);
                }).blur(function() {
                    if ($.trim($this.val()) == '') {
                        $this.val(tips);
                    }
                    $this.css('color', opts.blurColor).removeClass(opts.toggleClass);
                });
            }
        });
    };
})(jQuery);
/*
功能：消息弹出窗口(基于jQuery)
实例：onclick="jAlert('保存失败！',2)"
*/
(function($) {
    $.dialog = {
        _title: '来自网页的消息',
        _type: 1,
        _width: 280,
        _height: 60,
        _showMsg: function(msg, type, callback) {
            if (type == null || typeof (type) == 'undefined') type = $.dialog._type;
            $.dialog._instalMask();
            $.dialog._instalWin(msg, type, function(result) {
                if (callback) callback(result);
            });
        },
        _instalMask: function() {
            if ($('#mdlDialogMask').size() > 0) return;
            var mdlDialogMask = "<div id='mdlDialogMask' class='mdlOverlay'></div>";
            $(document.body).addClass('hideSelect').append(mdlDialogMask);
        },
        _closeWin: function() {
            $('#mdlDialogMask,#mdlDialogWrap').remove();
            $(document.body).removeClass('hideSelect');
            $.dialog._ie6KeepPos(false);
        },
        _ie6KeepPos: function(status) {
            if ($.browser.msie && $.browser.version < 7) {
                var $window = $(window);
                switch (status) {
                    case true:
                        $window.bind('scroll', function() {
                            $('#mdlDialogWrap').css('top', $window.scrollTop() + ($window.height() - parseInt($('#mdlDialogWrap').height())) / 2);
                        });
                        break;
                    case false:
                        $(window).unbind('scroll');
                        break;
                }
            }
        },
        _getMsg: function(msg, type) {
            var txt = new Array();
            switch (type) {
                case 0: //提醒(添加完毕后操作的询问，继续添加还是跳转页面？)
                    txt.push("<div class='remind'>" + msg + "</div>");
                    break;
                case 1: //警告(进行破坏性操作之前的警告。)
                    txt.push("<div class='warning'>" + msg + "</div>");
                    break;
                case 2: //错误(操作执行后，结果是错误的。)
                    txt.push("<div class='error'>" + msg + "</div>");
                    break;
                case 3: //正确(操作执行后，结果是正确的。)
                    txt.push("<div class='valid'>" + msg + "</div>");
                    break;
                case 4: //信息(对有用信息的提示，如帮助。)
                    txt.push("<div class='info'>" + msg + "</div>");
                    break;
            }
            return txt.join('');
        },
        _instalWin: function(msg, type, callback) {
            if ($('#mdlDialogWrap').size() > 0) return;
            var winStr = new Array();
            winStr.push("<div id='mdlDialogWrap' class='mdlPopup' style='width:" + $.dialog._width + "px'>");
            winStr.push("<div id='mdlDialogTit' class='mdlPopup-hd'><a href='javascript:void(0)' id='btnClose' title='关闭'>关闭</a><span>" + $.dialog._title + "</span></div>");
            winStr.push("<div id='mdlDialogMsg' class='mdlPopup-bd' style='min-height:" + $.dialog._height + "px'>" + $.dialog._getMsg(msg, type) + "</div>");
            winStr.push("<div id='mdlDialogBtn' class='mdlPopup-ft'>");
            winStr.push("<input value='确定' id='btnTrue' type='button' class='btn' />");
            if (type == 0 || type == 3) {
                winStr.push(" <input value='取消' id='btnFalse' type='button' class='btn' />");
            }
            winStr.push("</div>");
            winStr.push("</div");
            $(document.body).append(winStr.join(''));
            var $mdlDialogWrap = $('#mdlDialogWrap');
            $mdlDialogWrap.css({ 'margin-bottom': -parseInt($mdlDialogWrap.height() / 2), 'margin-left': -parseInt($mdlDialogWrap.width() / 2) });
            $.dialog._ie6KeepPos(true);
            //按钮事件
            var $dialog_close = $('#btnClose');
            var $dialog_ok = $('#btnTrue');
            var $dialog_cancel = $('#btnFalse');
            if (type == 0 || type == 3) {    //confirm
                $dialog_ok.click(function() {
                    $.dialog._closeWin();
                    if (callback) callback(true);
                });
                $('#btnClose, #btnFalse').click(function() {
                    $.dialog._closeWin();
                    if (callback) callback(false);
                });
                $dialog_cancel.focus();
                $('#btnTrue, #btnFalse').keypress(function(e) {
                    if (e.keyCode == 13) $dialog_ok.trigger('click');
                    if (e.keyCode == 27) $dialog_cancel.trigger('click');
                });
            } else {            //alert
                $('#btnClose, #btnTrue').click(function() {
                    $.dialog._closeWin();
                    if (callback) callback(true);
                });
                $dialog_ok.focus().keypress(function(e) {
                    if (e.keyCode == 13 || e.keyCode == 27) $dialog_ok.trigger('click');
                });
            }
        }
    };
    //弹出消息
    jAlert = function(msg, type, callback) {
        $.dialog._showMsg(msg, type, callback);
    };
    //确认消息
    jConfirm = function(msg, callback) {
        $.dialog._showMsg(msg, 0, callback);
    };

    //确认消息,是绿色勾的
    jConfirm3 = function(msg, callback) {
        $.dialog._showMsg(msg, 3, callback);
    };
})(jQuery);
/*
功能：下拉菜单(基于jQuery)
实例：$('#mainMenu').jDropMenu();
*/
(function($) {
    $.fn.jDropMenu = function(options) {
        var defaults = {
            hoverClass: 'on'  //移入样式
        };
        var opts = $.extend(defaults, options);
        var $lst = $(this).find('li');
        $lst.each(function() {
            var $li = $(this);
            var $ul = $li.find('>ul');
            if ($ul.size() > 0) {
                $li.hover(function() {
                    $ul.show(0, function() { $li.addClass(opts.hoverClass) });
                }, function() {
                    $ul.hide(0, function() { $li.removeClass(opts.hoverClass) });
                });
            }
        });
    };
})(jQuery);
/*
功能：侧栏菜单的伸缩(基于jQuery)
实例：$('#sideMenu').jSideMenu();
*/
(function($) {
    $.fn.jSideMenu = function(options) {
        var defaults = {
            openClass: 'on'  //展开样式
        };
        var opts = $.extend(defaults, options);
        var $lst = $(this).find('ul>li');
        $lst.each(function() {
            var $li = $(this);
            var $switch = $li.find('>a');
            var $ul = $li.find('>ul');
            if ($ul.size() > 0) {
                $switch.click(function() {
                    $ul.slideToggle(0, function() { $switch.toggleClass(opts.openClass) });
                });
            }
        });
    };
})(jQuery);
/*
功能：刷新图片验证码(基于jQuery)
实例：onclick="refreshVerifyCode()"
*/
function refreshVerifyCode() {
    $('#verifyCode').attr('src', '/IC/Common/VerifyCode.aspx?s=' + Math.random());
}
/*
功能：查询区域的显示与隐藏(基于jQuery)
实例：onclick="toggleSearch(this,'search')"
*/
function toggleSearch(_this, searchbox) {
    var $this = $(_this);
    var $seach = $('#' + searchbox);
    if ($seach.is(':visible')) {
        $seach.slideUp(100, function() {
            $this.addClass('closed').attr('title', '显示查询').html('显示查询');
        });
    } else {
        $seach.slideDown(100, function() {
            $this.removeClass('closed').attr('title', '隐藏查询').html('隐藏查询');
        });
    }
}

function toggleSearch2(_this, searchbox) {
    var $this = $(_this);
    var $seach = $('#' + searchbox);
    if ($seach.is(':visible')) {
        $seach.slideUp(100, function() {
            $this.addClass('closed').attr('title', '更多条件').html('更多条件');
        });
    } else {
        $seach.slideDown(100, function() {
            $seach.css("display", "table");
            $this.removeClass('closed').attr('title', '隐藏条件').html('隐藏条件');
        });
    }
}
function toggleSearch3(_this, searchbox, title1, title2) {
    var $this = $(_this);
    var $seach = $('#' + searchbox);
    if ($seach.is(':visible')) {
        $seach.slideUp(100, function() {
            $this.addClass('closed').attr('title', title1).html(title1);
        });
    } else {
        $seach.slideDown(100, function() {
            $seach.css("display", "div");
            $this.removeClass('closed').attr('title', title2).html(title2);
        });
    }
}

/*
功能：侧栏区域的显示与隐藏(基于jQuery)
实例：onclick="toggleSideBar(this,'sidebar')"
*/
function toggleSideBar(_this, sidebox) {
    var $this = $(_this);
    var $sidebox = $('#' + sidebox);
    if ($sidebox.is(':visible')) {
        $sidebox.hide(100, function() {
            $this.addClass('closed').attr('title', '显示菜单');
        });
    } else {
        $sidebox.show(100, function() {
            $this.removeClass('closed').attr('title', '隐藏菜单');
        });
    }
}
/*
功能：酷播迷你播放器(FLV/MP4)
实例：
1、引入/Js/CuPlayer/swfobject.js
2、<div id="CuPlayer">您没有合适的Flash播放器，请更新。</div> 
3、SetCuPlayer(,'视频地址','视频图片',视频宽度,视频高度);
*/
function SetCuPlayer(flvURL, flvPic, width, height) {
    var so = new SWFObject('/Js/CuPlayer/CuPlayerMiniV10_Black_S.swf', 'CuPlayer', width, height, '9', '#000000');
    so.addParam('allowfullscreen', 'true');
    so.addParam('allowscriptaccess', 'always');
    so.addParam('wmode', 'opaque');
    so.addParam('quality', 'high');
    so.addParam('salign', 'lt');
    so.addVariable('CuPlayerFile', flvURL);
    so.addVariable('CuPlayerImage', flvPic);
    so.addVariable('CuPlayerShowImage', 'true');
    so.addVariable('CuPlayerWidth', width);
    so.addVariable('CuPlayerHeight', height);
    so.addVariable('CuPlayerAutoPlay', 'true');
    so.addVariable('CuPlayerAutoRepeat', 'true');
    so.addVariable('CuPlayerShowControl', 'true');
    so.addVariable('CuPlayerAutoHideControl', 'false');
    so.addVariable('CuPlayerAutoHideTime', '3'); //默认3
    so.addVariable('CuPlayerVolume', '75'); //默认75
    so.write('CuPlayer');
}

/*==============================
作者：
创建：
更新：
==============================*/

//获取URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return '';
}
//替换字符串,'abc'.replaceAll('a','')
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
/*
功能：移动表格行
实例： 向上：onclick="row_move(this,'up');"，向下：onclick="row_move(this,'down');"
*/
function row_move(_this, _action) {
    var _tr = $(_this).parents('tr');
    var _tb = $(_tr).parent();
    var _idx = _tb.find('tr').index(_tr);
    if (_action == 'up') {
        if (_idx == 1) {
            return false;
        }
        _tr.insertBefore(_tr.prev());
    }
    else if (_action == 'down') {
        if (_idx == _tb.find('tr').length) {
            return false;
        }
        _tr.insertAfter(_tr.next());
    }
    else {
        return false;
    }
    _tb.find('tr:gt(0)').each(function(i, n) {
        $(this).find('td:first').text(i + 1);
    });
}
function clearText(t, s) {
    var txtSupply = $(t).val();
    if (txtSupply && txtSupply == s) {
        $(t).val("");
    }
}

function displayText(t, s) {
    var txtSupply = $(t).val();
    if (!txtSupply) {
        $(t).val(s);
    }
}
//弹出窗口
function openWindow(url) {
    var lnk = document.createElement('a');
    lnk.target = '_blank';
    lnk.href = url;
    document.body.appendChild(lnk);
    lnk.click();
}
//关闭窗口
function closeWindow() {
    if (window.opener != null) {
        window.opener = null;
        window.close();
    }
    else if (window.XMLHttpRequest) {
        window.open('', '_parent', '');
        window.close();
    }
    else {
        window.close();
    }
}

function get_length(s) {
    var char_length = 0;
    for (var i = 0; i < s.length; i++) {
        var son_char = s.charAt(i);
        encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
    }
    return char_length;
}
function cut_str(str, len) {
    var char_length = 0;
    if (str.length > len) {
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len) {
                var sub_len = char_length == len ? i + 1 : i;
                return str.substr(0, sub_len);
                break;
            }
        }
    }
    return str;
}
function isMobile(obj) {
    reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
    if (!reg.test(obj)) {
        return true;
    }
}
$.extend({
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});
function addFavorite() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8        
    } else if (document.all) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    } else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");

    } else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}
function getCurrentDate() {
    $.ajax({
        url: '../../Admin/DataHandler/Base.ashx?Action=GetCurrentTime',
        type: 'post',
        dataType: 'text',
        success: function(data) {
            $("#s_CurrentDate").html(data);
        }
    });
}
//获取URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return '';
}

//日期格式化
Date.prototype.toString = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
