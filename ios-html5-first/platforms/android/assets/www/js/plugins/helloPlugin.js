/**
 * 
 */
function HelloWorldPlugin(){}

HelloWorldPlugin.prototype.sayHello=function(onSayHelloSuccess,onSayHelloFailure,name){
	cordova.exec(onSayHelloSuccess,onSayHelloFailure,"HelloWorldPlugin","sayHello",[name]);
};

cordova.addConstructor(function(){
	if(!window.plugiin) window.plugin={};
	window.plugin.helloWorldPlugin=new HelloWorldPlugin();
});

function greetMe(){
	window.plugin.helloWorldPlugin.sayHello(onSayHelloSuccess, onSayHelloFailure, "Jack");
}

function onSayHelloSuccess(data){
	alert("OK: "+JSON.stringify(data));
}

function onSayHelloFailure(data){
	alert("Fault: "+JSON.stringify(data));
}

