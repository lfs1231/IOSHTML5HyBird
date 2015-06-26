
/* JavaScript content from js/util/exitAppDialog.js in folder common */
(function() {
	
	$("#exitApp_dialog").on("pageshow", function() { 
		$("#exitOkBtn").bind("click",exitOkBtnHander);
	});
	
	function exitOkBtnHander(){
	     
		 //根据设备类型确定系统退出策略
		 if(isAndroid()) {
			 navigator.app.exitApp();
		 }else {
			 //退出到登陆界面
			 //改为新版登录
			 //mobileChangePage("html/login/login.html");
			 mobileChangePage("html/login/newLogin.html");
		 }
		
	}
	
})();