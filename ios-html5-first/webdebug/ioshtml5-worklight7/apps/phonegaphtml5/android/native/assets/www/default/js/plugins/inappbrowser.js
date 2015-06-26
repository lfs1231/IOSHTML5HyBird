
/* JavaScript content from js/plugins/inappbrowser.js in folder common */
function OpenFilePlugin(){

}

OpenFilePlugin.prototype.open = function(URL){
	cordova.exec(null, null, "WindowsPhone8CordovaPlugin.OpenFilePlugin", "open", [URL]);
};

cordova.addConstructor(function() {
	if (!window.plugins) window.plugins = {};
	window.plugins.OpenFilePlugin = new OpenFilePlugin();
});