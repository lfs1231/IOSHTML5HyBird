

function PushNotification() {
}

// Call this to register for push notifications and retreive a deviceToken
PushNotification.prototype.registerDevice = function(config, callback) {
	cordova.exec(callback, callback, "PushNotification", "registerDevice",
			config ? [config] : []);
};

// Call this to retreive pending notification received while the application is
// in background or at launch
PushNotification.prototype.getPendingNotifications = function(callback) {
	cordova.exec(callback, callback, "PushNotification",
			"getPendingNotifications", []);
};

// Call this to get a detailed status of remoteNotifications
PushNotification.prototype.getRemoteNotificationStatus = function(callback) {
	cordova.exec(callback, callback, "PushNotification",
			"getRemoteNotificationStatus", []);
};

// Call this to get the current value of the application badge number
PushNotification.prototype.getApplicationIconBadgeNumber = function(callback) {
	cordova.exec(callback, callback, "PushNotification",
			"getApplicationIconBadgeNumber", []);
};

// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(badge,
		callback) {
	cordova.exec(callback, callback, "PushNotification",
			"setApplicationIconBadgeNumber", [badge]);
};

// Call this to clear all notifications from the notification center
PushNotification.prototype.cancelAllLocalNotifications = function(callback) {
	cordova.exec(callback, callback, "PushNotification",
			"cancelAllLocalNotifications", []);
};

// Call this to retreive the original device unique id
// @warning As of today, usage is deprecated and requires explicit consent from
// the user
PushNotification.prototype.getDeviceUniqueIdentifier = function(callback) {
	cordova.exec(callback, callback, "PushNotification",
			"getDeviceUniqueIdentifier", []);
};
 

// Event spawned when a notification is received while the application is active
PushNotification.prototype.notificationCallback = function(notification) {
	var ev = document.createEvent('HTMLEvents');
	ev.notification = notification;
	ev.initEvent('push-notification', true, true, arguments);
	document.dispatchEvent(ev);
};

cordova.addConstructor(function(){
	if(!window.plugin) window.plugin={};
	window.plugin.PushNotification=new PushNotification();
});
 


function registerDevicetoken() {

	var pushNotification = window.plugin.PushNotification;
	pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
		
	    console.log(JSON.stringify(['registerDevice status: ', status])+"\n");
	    
	    //app.storeToken(status.deviceToken);
	    remoteInvocation(status.deviceToken);
	    
	});

	pushNotification.getPendingNotifications(function(notifications) {
	    console.log(JSON.stringify(['getPendingNotifications', notifications]));
	});

	pushNotification.getRemoteNotificationStatus(function(status) {
	  //  app.myLog.value+=JSON.stringify(['Registration check -getRemoteNotificationStatus', status])+"\n";
	});

	pushNotification.cancelAllLocalNotifications(function() {
	    console.warn('cancelAllLocalNotifications');
	});
	
	pushNotification.setApplicationIconBadgeNumber(0, function(status) {
	    console.log('setApplicationIconBadgeNumber:%o', status);
	    
	});
	 
	

	//pushNotification.setApplicationIconBadgeNumber('0',function(){});
	
	/*var config={alert:true, badge:true, sound:true}; */
}


// 远程调用httpadapter
var remoteInvocation = function(deviceToken) {

	 var userOnlineInfo = {
					"deptId" : ynmcc.eip.currentUser.orgId,
					"deptname":  ynmcc.eip.currentUser.orgName,
					"deviceID" : device.uuid,
					"deviceToken" : deviceToken,
					"deviceType" : '1',
					"userId" : ynmcc.eip.currentUser.userId,
					"username":ynmcc.eip.currentUser.chineseName,
					"online":"true",
					"registeredId":ynmcc.eip.currentUser.userId+'_'+device.uuid+'_iphone'
				};

	
	var invocationData = {
		adapter : "PushHttpAdapter",
		procedure : "saveUserOnlineInfo",
		parameters : [userOnlineInfo]
	};
	
	
	// 调用worklight 适配器
	WL.Client.invokeProcedure(invocationData, {
			onSuccess : invokeSucess_Callback,
			onFailure : errorCallback
		});
		
	function invokeSucess_Callback(response) {
	   //	var returnData = response.invocationResult.YNCMCCReturn;
		 var sucessful = response.YNCMCCReturn;
		  console.log("saveUserOnlineInfo result: "+sucessful);
		  
	}
	
	function errorCallback(response) {
	}
};

