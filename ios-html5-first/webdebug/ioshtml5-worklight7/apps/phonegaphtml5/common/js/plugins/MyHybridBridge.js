var MyHybridBridge = (function() {
	var PLUGIN_NAME 						= "MyHybridBridge";
	var ACTION_BIND_LISTENER 				= "ACTION_BIND_LISTENER";
	var ACTION_SET_NAVBAR_TITLE 			= "ACTION_SET_NAVBAR_TITLE";
	var ACTION_UPDATE_NAVBAR_LEFT_BUTTON 	= "ACTION_UPDATE_NAVBAR_LEFT_BUTTON";
	var ACTION_ACTIVATE_PASSWD_MODIFY       = "ACTION_ACTIVATE_PASSWD_MODIFY";
	var ACTION_ACTIVATE_PASSWD              = "ACTION_ACTIVATE_PASSWD";
	var ACTION_ACTIVATE_PASSWD_FORGET       = "ACTION_ACTIVATE_PASSWD_FORGET";
	
	var logger = WL.Logger.create({	pkg : "MyHybridBridge" });
	logger.log("==js Initializing");

	this.bindListener = function(listener) {
		logger.log("====liufeng====js bindListener====");
		cordova.exec(listener, listener, PLUGIN_NAME, ACTION_BIND_LISTENER,	[]);
	};

	this.setNavBarTitle = function (title)	{
		logger.log("==js setNavBarTitle");
		cordova.exec(null, null, PLUGIN_NAME, ACTION_SET_NAVBAR_TITLE, [title]);
	};
	
	this.updateNavBarLeftButton = function(title) {
		logger.log("====js updateNavBarLeftButton");
		cordova.exec(null, null, PLUGIN_NAME, ACTION_UPDATE_NAVBAR_LEFT_BUTTON, [title]);
	};
	
	this.activateNativePasswd=function(){
		cordova.exec(null, null, PLUGIN_NAME, ACTION_ACTIVATE_PASSWD, []);
	}
	
	this.activateNativePasswdModiy=function(){
		cordova.exec(null, null, PLUGIN_NAME, ACTION_ACTIVATE_PASSWD_MODIFY, []);
	}
	
	this.activateNativePasswdForget=function(){
		cordova.exec(null, null, PLUGIN_NAME, ACTION_ACTIVATE_PASSWD_FORGET, []);
	}

	return this;
}());
