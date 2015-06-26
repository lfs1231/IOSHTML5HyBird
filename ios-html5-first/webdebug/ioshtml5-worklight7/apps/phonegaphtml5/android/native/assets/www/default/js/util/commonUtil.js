
/* JavaScript content from js/util/commonUtil.js in folder common */
function recordLog(actionName,actiondesc){
	//setTimout
	
}


//页面跳转 
function mobileChangePage(pagePath) {

	 //$.mobile.changePage(pagePath, { transition:"none" });
	 $.mobile.changePage(pagePath, {prefetch:"true"});	

	return false;
};

//页面加载提示
function showPageLoading(){
	 $.mobile.loading( "show", {
	            text: '请稍等',
	            textVisible: true,
	            textonly: false,
	            html: ''
	    });
}

//隐藏页面加载提示
function hidePageLoading(){
	 $.mobile.loading( "hide" );
}



//操作完成提示框
function   showInfoDialogAfterOperation(info,callbackFunction){
	//$(".ZebraDialog").remove();
	// 隐藏进度条 
	hidePageLoading();
	
	$.Zebra_Dialog('<strong>'+info+'</strong>', {
		    'title':    '确认', 
		    'type':     'question',
		    'modal': false,
            'width': 250,
            'max_height':200,
		    'buttons':  [
		                    {caption: '确定', callback: callbackFunction}
		                ]
		});
};

//操作错误提示框
function   showErrorDialog(errorInfo){
	// 隐藏进度条 
	hidePageLoading();
	// $(".ZebraDialog").remove();
	$.Zebra_Dialog('<strong>'+errorInfo+'</strong>', {
		    'title':    '错误', 
		    'type':     'error',
		    'modal': true,
          'width': 250,
          'max_height':200
		});
};

//系统警告提示框
function   showWarningDialog(warningInfo){
	// 隐藏进度条 
	hidePageLoading();
	// $(".ZebraDialog").remove();
	$.Zebra_Dialog('<strong>'+warningInfo+'</strong>', {
		    'title':    '警告',
		    'type':     'warning',
		    'modal': false,
          'width': 250,
          'max_height':200
		});
};


//询问提示框；返回值 false 表示选择了  否； true 表示选择了 是.
function showQuestionDialog(questionInfo,callbackYesFunction,title){
	//e.preventDefault();

	hidePageLoading();
	// $(".ZebraDialog").remove();
   $.Zebra_Dialog(questionInfo, {
		    'type':     'question',
		    'title' :  title,
		    'modal': false,
          'width': 250,
          'max_height':290,		    
		    'buttons':  [
		                    {caption: '是', callback: callbackYesFunction },
		                    {caption: '否', callback: function(){return false;}}
		                ]
		});
	
}


//页面跳转 
function mobileChangePageBySlide(pagePath) {
	//mobileSystemCompatibility();
	// 隐藏进度条 
	hiddenPageLoadingMsg();
	  
	 //隐藏置顶图标
	 $('#toTop').hide();
	 
	 //隐藏zebraDialog
	 $('.ZebraDialog').hide();
	 
	 $('.ui-loader').hide();
	
	  //全局存放跳转到新页面时当前的活动页面id
	 ZJMCCMobile.utils.setParam(GLOBAL_PAGE_TRANSITION_SOURCE, $.mobile.activePage.attr("id"));
	/* if(pagePath && ( pagePath.indexOf('login')==-1 || pagePath.indexOf('guide')==-1 )) {
		 var userid = ynmcc.eip.currentUser.userId;
		
		 if(!userid || userid.length==0) {
		 	//登录用户没有在任何班组
			showWarningDialog("认证信息失效。请您首先登陆！");
			return false;
		 }
	 }*/
	
	 
	 //根据设备类型确定页面跳转策略
	 if(isAndroid()) {
		$.mobile.changePage(pagePath, { transition:"none" });
	 }else {
	 	//$.mobile.changePage(pagePath, {reloadPage: true},{ allowSamePageTranstion: true},{ transition: 'slide'});
		$.mobile.changePage(pagePath, { transition: "turn"} );
	 }
	 
	return false;
};

// 页面加载未完成时给出等待提示
function showWaitingInfo() {
	$("#commonFlyDivShow > li:last").html("页面正在加载 <br/> 请稍等！");
	$("#commonFlyDivShow").show();
	
	setTimeout(function() {
		    ZJMCCMobile.utils.setParam(GLOBAL_PAGE_CHANGE_ACTION_ENABLE, "1");;//防止死掉
		  
			$("#commonFlyDivShow").hide();
		}, 2000);
}


function receiverNotification(req){
	var msg = req;
	if(msg!=""){
		//是否登录
		if($.mobile.activePage.is('#loginPage')){
			showErrorDialog("请先登录！");
			return false;
		}
		msg = eval('(' + msg + ')');
		if(msg.type=="news"){
			ZJMCCMobile.utils.setParam('news_id', msg.id);
			mobileChangePage("/data/data/com.EIP/files/www/default/html/news/newsDetail.html");
		}else if(msg.type=="notice"){
			ZJMCCMobile.utils.setParam('notice_id', msg.id);
			mobileChangePage("/data/data/com.EIP/files/www/default/html/notice/noticeDetail.html");
		}else if(msg.type=="workTask"){
			ZJMCCMobile.utils.setParam('task_my_id', msg.id);
			mobileChangePage("/data/data/com.EIP/files/www/default/html/workTask/workTaskDetail.html");
		}else if(msg.type=="blog"){
			ZJMCCMobile.utils.setParam('blog_id', msg.id);
			mobileChangePage("/data/data/com.EIP/files/www/default/html/teamblog/teamblogDetail.html");
		}else if(msg.type=="workflow"){
			mobileChangePage("/data/data/com.EIP/files/www/default/html/workflow/myWorkflowList.html");
		}else{
			//console.info(req);
		}
	}
}

//判断是否从主菜单跳转过来
function isFromMainMenu(){
	var sourcePage=ZJMCCMobile.utils.getParam(GLOBAL_PAGE_TRANSITION_SOURCE);
	if(sourcePage&&sourcePage=="main_container"){
		return true;
	}
	return false;
}

//get the root according to different OS
function getRootPath(pathLevel){
	var prefix="../";
	if(pathLevel && pathLevel==1){
		prefix="";
	}
	if(isWindowsphone()){
		return "/www/default/";
	}else{
		return prefix;
	}
}

//判断当前系统是否是android
function isAndroid(){
	 //根据设备类型确定页面跳转策略
	 var devicepPlatform=device.platform;
	 if(devicepPlatform) {
		 //Uncaught TypeError: Object Android has no method 'toLowerCase'
		 devicepPlatform=(devicepPlatform+"").toLowerCase();
		 if(devicepPlatform.indexOf('android')!=-1){
			 return  true;
		 }
	 }
	 return false;
}

//判断当前系统是否是windows phone
function isWindowsphone(){
	 //根据设备类型确定页面跳转策略
	 var devicepPlatform=device.platform;
	 if(devicepPlatform) {
		 //Uncaught TypeError: Object Android has no method 'toLowerCase'
		 devicepPlatform=(devicepPlatform+"").toLowerCase();
		 //alert(devicepPlatform);
		 if(devicepPlatform.indexOf('win32nt')!=-1){
			 return  true;
		 }
	 }
	 return false;
}

//判断当前系统是否是iOS
function isIphone(){
	 //根据设备类型确定页面跳转策略
	 var devicepPlatform=device.platform;
	 if(devicepPlatform) {
		 devicepPlatform=(devicepPlatform+"").toLowerCase();
		
		 if(devicepPlatform.indexOf('ios')!=-1){
			 return  true;
		 }
	 }
	 return false;
}

//兼容ios7
function mobileSystemCompatibility(){
	 if (parseFloat(device.version) === 7.0) {	
	        document.body.style.marginTop = "20px";
	 } 
}
//页面跳转
function mobileChangePageBySlidedown(pagePath) {
	 $.mobile.changePage(pagePath, { transition: "slidedown"} ,{reloadPage :true});
};
  
//显示加载进度提示
function showPageLoadingMsg() {
	 // 隐藏进度条 
	 hiddenPageLoadingMsg();
	 $('.ui-loader').show();
	// $('.ui-loader'). css('margin','0 auto');
	 var twidth=$(window).width()*0.05;
	 var theight=$(window).height()*0.05;

	 $('.ui-loader'). css('margin-bottom',theight);
	 $('.ui-loader'). css('margin-right',twidth);
	 
	 $.mobile.loading("hide");
   
	 $.mobile.loading('show', {theme:"d", text:"请稍候....", textonly:true, textVisible: true});
}; 




//隐藏加载提示信息
function hiddenPageLoadingMsg(){
	$.mobile.loading("hide");
	//$.mobile.hidePageLoadingMsg();
	$('.ui-loader').hide();
};





/**显示提示消息
 * @displayDiv 需要在什么DIV上显示
 * @param msgType 消息类型 (info,success,warning,error)
 * @param msgInfo 需要显示的提示消息内容
 * 
 */
function showPromptMessage(displayDiv,msgType,msgInfo){
   $("#"+displayDiv).html("<div class='"+msgType+"'>"+msgInfo+"</div>");
   setTimeout(function(){$("#"+displayDiv).html("");},3000);  
}


//跳转到指定位置
function  mobileGotoPosition(designatedPos) {
	$.mobile.silentScroll(designatedPos);
};

  
function hexToDec(str) { 
   if(str!=null && str!=""){
     return unescape(str.replace(/\\/g, "%"));
   }else{
	   return "";
   }
};

//系统异常处理
function getCommonFailure(error_msg){
	WL.SimpleDialog.show("系统出错信息",
			error_msg, [ {
				text : 'confirm',
				handler : null//WL.Client.reloadApp
	} ]);
}	;





//根据系统屏幕分辨率得到合适的翻页行数，保证设置正确的翻页点 ;以高度530作为参考数据
function getSuitableTurnPageRowNumber(rownumber){
	  var currentWindowHeight=$(window).height();
	  var curRownumber=rownumber;
	  if(!curRownumber){
		  curRownumber=20;
	  }
	  var   standardHeight=600;   //屏幕可视高度参考值
	  if(currentWindowHeight > (standardHeight+100)){
		  curRownumber+=10;
	  }else  if(currentWindowHeight > (standardHeight+200)){
		  curRownumber+=20;
	  }else  if(currentWindowHeight > (standardHeight+300)){
		  curRownumber+=30;
	  }
		  return curRownumber;
};


/**
 * JSON特殊字符转义处理函数 jsonReplaceEscape
 */

var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,  
meta = {  
    '\b': '\\b',  
    '\t': '\\t',  
    '\n': '\\n',  
    '\f': '\\f',  
    '\r': '\\r',  
    '"' : '\\"',  
    '\\': '\\\\'  
};  

var jsonReplaceEscape = function(string){  
if ( string.match( escapeable ) ) {  
    return '"' + string.replace( escapeable, function( a ) {  
        var c = meta[a];  
        if ( typeof c === 'string' ) {  
            return c;  
        }  
        c = a.charCodeAt();  
        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);  
    }) + '"';  
}  
return   string  ;  
};
/** end **/ 

		
/**
 * 得到系统默认错误提示信息（HTML格式）
 */
function getSystemDefaultErrorTipInfo(){
	// 隐藏进度条
	hiddenPageLoadingMsg();
	return '<div class="globalError"> 对不起,系统无法获取数据! </div> <br/><div id="refreshAgain" onclick="forceFreshCurrentPage();"  class="refreshText"></div>';
};

function forceFreshCurrentPage(currentPageURL){
	
	if(!currentPageURL){
		currentPageURL="#"+$.mobile.activePage.attr("id");
		
	}
	   
    ($.mobile.activePage).trigger("pageshow");

	($.mobile.activePage).on("pageshow", function() {
		 //保持loading页面居中
		$(".ui-loader").css("position","fixed").css("top","50%").css("left","50%");
		//保持header居顶
		$(".ui-header-fixed").css("position","fixed").css("top",0);
		//保持footer沉底
		$(".ui-footer-fixed").css("position","fixed").css("bottom",0);
		
	});
	
	
	//$.mobile.changePage(currentPageURL, {reloadPage: true},{ allowSamePageTranstion: true},{ transition: 'none'});
}


/**  
 *  1. 当返回值为空或者没有记录的时候，返回通用的提示信息
 *  2. 专门为List
 */
function  getEmptyTipInfoForList(){
	return '<li>对不起，不能找到合适的记录，谢谢！</li>';
}

/**  
 *  1. 当返回值为空或者没有记录的时候，返回通用的提示信息
 *  2. 专门为Detail
 */
function  getEmptyTipInfoForDetail(){
	return '<div class="detailContent"><ul><li id="contentTarget" >对不起，不能找到对应的详细内容，谢谢！</li></ul></div>';
}

function  optimizeLoading(){
	if ($.mobile.activePage.is('#main_container')){
		$(".ui-loader").hide();
			
	}
}

/** JS 验证正则表达式 */
JS_VALIDATION_NUMBER='^[0-9]*$'   ;                  //验证数字：
JS_VALIDATION_NUMBER_LETTER='^[A-Za-z0-9]+$';        //验证由数字和26个英文字母组成的字符串
JS_VALIDATION_UPPER_LETTER='^[A-Z]+$';               //验证由26个大写英文字母组成的字符串
JS_VALIDATION_PASSWORD='^[a-zA-Z]\w{5,17}$' ;        //验证用户密码:正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。 
JS_VALIDATION_CHINESE='^[\u4e00-\u9fa5],{0,}' ;      //验证汉字
JS_VALIDATION_EMAIL='^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$' ; //验证Email地址：
JS_VALIDATION_PHONE='^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$'; // 验证电话号码：：--正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。 
JS_VALIDATION_IDCARD='^\d{15}|\d{}18$';                //验证身份证号（15位或18位数字）  
JS_VALIDATION_INTEGER='^-?\d+$';                       //整数 

/** JS 正则表达式  end */

/** 显示网络不正常  */
function deferNetworkOffline(){
  if(isWindowsphone()){
	 if(navigator.connection.type==Connection.NONE){
		    $("#commonFlyDivShow").show();
			GLOBAL_IS_CONNCTED_WORKLIGHT=false;
			// 隐藏进度条
			hiddenPageLoadingMsg();
			setTimeout(function(){$("#commonFlyDivShow").hide();},4000);  
	 }
  }else{
	WL.Device.getNetworkInfo(function (networkInfo) {
		
		if(!networkInfo.isNetworkConnected){
			$("#commonFlyDivShow").show();
			GLOBAL_IS_CONNCTED_WORKLIGHT=false;
			// 隐藏进度条
			hiddenPageLoadingMsg();
			setTimeout(function(){$("#commonFlyDivShow").hide();},4000);  
		}
	});
  };
	
}

/**
 * 调试日志
 */
function log(msg) 
{
   // $('#log').append('<div></div>').append(document.createTextNode(msg));
	alert(msg);
}
  

function  forceExitApp(){
	//退出安全域
	WL.Client.logout('EIPAuthenticatorRealm',
            {});
            
	 //根据设备类型确定系统退出策略
	 if(isAndroid()) {
		 navigator.app.exitApp();
	 }else if(isWindowsphone()){
		 window.plugins.exitAppPlugin.exitApp();
		 //greetMe();
	 }
	 else {
		 //退出到登陆界面
		 //改为新版登录
		 //mobileChangePage("../../html/login/login.html");
		 mobileChangePage("../../html/login/newLogin.html");
	 }
}

function showJSObject(jsobject){
	var tm="";
	for(var attr in jsobject){
		tm+=attr+": "+jsobject[attr]+" , ";
	 }
	return tm;
}


function clearJqueryComponent(component){
	if(component){
		component.children().remove();
		component.empty();
	}
}

//过滤html字符串中的script
function filterScriptInHTMLStr(htmlStr){
	if(htmlStr && htmlStr.length > 0) {
		htmlStr  = htmlStr.replace( /<script.*?>(.|\s|\r|\r\n)*?<\/script>/gim, "" );
		htmlStr  = htmlStr.replace( /&lt;script.*?&gt;(.|\s|\r|\r\n)*?&lt;\/script&gt;/gim, "" );
	   
	   return htmlStr;
	}
}

/**
 * 1.复制或者移动文件
 * 2.ismove 为true ,移动文件；为false,反之
 */
function copyOrMoveFile(sourceFilePath,targetFolder,filename,ismove) {
	//alert('dsfs111dfsdfsdf:'+sourceFilePath);
	
	if(!filename||filename.length==0){
		if(sourceFilePath && sourceFilePath.length>0) {
		   var lastMark=sourceFilePath.lastIndexOf('/');
		   if(lastMark>0){
		   	  filename=sourceFilePath.substring(lastMark+1);
		   }else {
		   	  filename=sourceFilePath;
		   }
		   
		}
	}
	//alert(sourceFilePath); 
	
	//开始操作文件
	//通过本地URI参数检索DirectoryEntry或FileEntry
	window.resolveLocalFileSystemURI(sourceFilePath,
		function(fileEntry){
		
			//请求持久化的文件系统
		/*	window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
				function(fileSystem){
					//如果目录不存在就创建
					var direc = fileSystem.root.getDirectory(targetFolder, {create: true},
					function(parent){
						console.log("Parent Name:" + parent.name +"<br/>Full Path:"+ parent.fullPath);
						alert("Parent Name:" + parent.name +"<br/>Full Path:"+ parent.fullPath);
						//移动文件
						if(ismove){
							fileEntry.moveTo(parent, filename,
								function(){
								    console.log("Move OK: "+ parent.fullPath +"/"+ filename );
								}, onFileFail);
						}else{
							//复制文件
							fileEntry.copyTo(parent, filename,
								function(){
								console.log("Copy OK: "+ parent.fullPath +"/"+ filename );
							    }, onFileFail);
						}//end if
					},onFileFail);
				}, onFileFail);  */
		},onFileFail);
}

function onFileFail(e){
	alert("错误: "+e);
}

 