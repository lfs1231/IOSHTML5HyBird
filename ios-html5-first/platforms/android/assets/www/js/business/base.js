var HybirdMobile = {
	author : 'Liufeng',
	version : '1.0',
	website : ''
};
HybirdMobile.utils = {
	setParam : function(name, value) { 
		localStorage.setItem(name, value);
	},
	getParam : function(name) {
		return localStorage.getItem(name);
	},
	remove : function(name) {
		localStorage.removeItem(name);
	}
};