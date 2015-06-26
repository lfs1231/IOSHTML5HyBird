
/* JavaScript content from js/plugins/pushInfoPluginForAndroid.js in folder common */

 /**
 * Android 版本 信息推送服务，基于开源项目Androidpn
 */
function PushInfoPlugin(){}

PushInfoPlugin.prototype.startNotificationService=function(onPushInfoSuccess,onPushInfoFailure,clientId){
	cordova.exec(onPushInfoSuccess,onPushInfoFailure,"PushInfoPlugin","startNotificationService",[clientId]);
};


function onPushInfoSuccess(data){
	//alert("OK: "+JSON.stringify(data));
}

function onPushInfoFailure(data){
	//alert("Fault: "+JSON.stringify(data));
}

function startAndroidNotificationService(){	
	var clientId=ynmcc.eip.currentUser.userId+'_'+device.uuid;
	window.plugin.PushInfoPlugin.startNotificationService(onPushInfoSuccess, onPushInfoFailure, clientId);
}


cordova.addConstructor(function(){
	if(!window.plugin) window.plugin={};
	window.plugin.PushInfoPlugin=new PushInfoPlugin();
});

