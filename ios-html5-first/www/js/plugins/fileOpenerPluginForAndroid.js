function FileOpener() {
};

FileOpener.prototype.open = function(url) {
    cordova.exec(null, null, "FileOpener", "openFile", [url]);
};

/**
 * Load Plugin
 */
cordova.addConstructor(function(){
	if(!window.plugins) {
	    window.plugins = {};
	}
	if (!window.plugins.fileOpener) {
	    window.plugins.fileOpener = new FileOpener();
	}

});


