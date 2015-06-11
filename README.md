利用原生态IOS代码搭建整体框架，内容呈现利用HTML5，本框架将实现利用phonegap jquery mobile混搭模式呈现页面，另外也将实现通过URL直接展现HTML5页面，当然HTML5采用Mobile First搭建网站。
1. 通信采用HTTP和HTTPS两种方式，作为项目的备选与后台交互的手段
2. 采用Jquery mobile,Bootstrap混搭
3. 采用 Bootstrap实现HTML5 Mobile First


命令总结：
1.  phonegap create ios-html5-first  com.lfs.iosh5god ioshtml5god
1.1 sudo chown -R fengliu ios-html5-first
2.  phonegap plugin add org.apache.cordova.camera
3.  phonegap plugin add org.apache.cordova.console
4.  phonegap plugin add org.apache.cordova.device
5.  phonegap plugin add org.apache.cordova.file
6.  phonegap plugin add  org.apache.cordova.geolocation
7.  phonegap plugin add  org.apache.cordova.file-transfer
8.  phonegap plugin add org.apache.cordova.inappbrowser
9.  phonegap plugin add org.apache.cordova.device-orientation



 phonegap  create ios-html5-first   "com.lfs.iosh5god" "ioshtml5god" 
 phonegap platform add ios
 phonegap platform add  android