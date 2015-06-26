
 /**
 * Android 版本 检测一组程序是否安装在客户端
 */
function CheckAppInstalledPlugin(){}

CheckAppInstalledPlugin.prototype.checkAppInstalledService=function(onSuccess,onFailure,appPackageNames){
	cordova.exec(onSuccess,onFailure,"CheckAppInstalledPlugin","checkInstalled",[appPackageNames]);
};


function onSuccess(data){
	alert("OK: "+JSON.stringify(data));
}

function onFailure(data){
	alert("Fault: "+JSON.stringify(data));
}

function  checkAppInstalledService(appPackageNames){	
    alert(appPackageNames);
	window.plugin.CheckAppInstalledPlugin.checkAppInstalledService(onSuccess, onFailure, appPackageNames);
}


cordova.addConstructor(function(){
	if(!window.plugin) window.plugin={};
	window.plugin.CheckAppInstalledPlugin=new CheckAppInstalledPlugin();
});

