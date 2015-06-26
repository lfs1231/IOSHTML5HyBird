
/* JavaScript content from js/plugins/exitAppForWindowsPhone.js in folder common */
function ExitAppPlugin(){

}

ExitAppPlugin.prototype.exitApp = function(){
	cordova.exec(null, null, "WindowsPhone8CordovaPlugin.ExitAppPlugin", "exitApp", []);
};

cordova.addConstructor(function() {
	if (!window.plugins) window.plugins = {};
	window.plugins.exitAppPlugin = new ExitAppPlugin();
});