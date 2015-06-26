/**
 * <p>
 * * Title: filedownload*
 * </p>
 * <p>
 * * Description: 手机文件下载插件;*
 * </p>
 * <p>
 * * Copyright: Copyright (c) 2013*
 * </p>
 * 
 * @author tangqiang
 * @version 1.0
 */
jQuery.extend({
	downLoadFile: function(fileDownLoadUrl, fileName, saveDir, successCallBack, errorCallBack) {

		fileDownLoadUrl = encodeURI(fileDownLoadUrl);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onError);
		//IPHONE打开本地文件不支持中文文件名，在此保存做编码转换
		if(isIphone()) {
			fileName = escape(fileName).replace(/%/g, "");
		}
		
		// 文件系统回调函数
		function onFSSuccess(fileSystem) {
			//console.log("target:"+fileSystem.root.fullPath+"/"+saveDir+"/"+ fileName);
			var dirArr = saveDir.split("/");
			var dirStr = "";
			for(var i=0; i<dirArr.length-1; i++) {
				if(dirStr != "") {
					dirStr += "/";
				}
				dirStr += dirArr[i];
				fileSystem.root.getDirectory(dirStr, {create : true,exclusive: false}, function(){}, function(){});
			}
			//fileSystem.root.getDirectory("OA", {create : true,exclusive: false}, function(){}, function(){});
		
			fileSystem.root.getDirectory(saveDir, {create : true,exclusive: false}, gotDir, onError);
		}

		function gotDir(DATADIR) {
			var ft = new FileTransfer();
			var dlPath = DATADIR.fullPath + "/" + fileName;
			//console.log("开始下载文件："+fileDownLoadUrl);
			
			ft.download(fileDownLoadUrl, dlPath, function(e) {
				  		//console.log("down fileDownLoadUrl: "+fileDownLoadUrl);
			  			//console.log("down: "+dlPath);
			  			
			  			try {
			  				successCallBack();
			  			} catch(err) {}
					}, function(e) {
						//console.log("ERROR");
						//console.log(JSON.stringify(e));
						try {
							errorCallBack(e);
						} catch(err) {}
					});
		}

		function onError(e) {
			try {
				errorCallBack(e);
			} catch(err) {}
			//console.log("文件操作错误: "+JSON.stringify(e));
		}
	},
		
	openLocalFile: function(dir, filename, errCallBack) {
		//IPHONE打开本地文件不支持中文文件名，在此保存做编码转换
		if(isIphone()) {
			filename = escape(filename).replace(/%/g, "");
		} 
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	    	fileSystem.root.getFile(dir+"/"+filename,null,function(FileEntry) {
	    		if(isAndroid()) {
	    			window.plugins.fileOpener.open(FileEntry.fullPath);
	    		}
	    		else{
	    			var filepath=fileSystem.root.fullPath+"/"+dir+"/"+filename;
	    			 
	    			if(isWindowsphone()){
	   
	    				filepath="ms-appdata:///local/"+dir+"/"+filename;
	    				// alert(filepath);
	    				 window.plugins.OpenFilePlugin.open(filepath);
	    			 } else {
	    				 window.open(filepath, '_blank', 'location=yes');	
	    			 }
	    			
								
	    		}
	    	},function(fileError) {
	    		try {
	    			errCallBack(fileError);
	    		} catch(e) {}
	    	});
	    }, function(error){
	    	try {
    			errCallBack(error);
    		} catch(e) {}
	    });
	},
	
	isFileExist: function(dir, filename) {
		//IPHONE打开本地文件不支持中文文件名，在此保存做编码转换
		if(isIphone()) {
			filename = escape(filename).replace(/%/g, "");
		}
		var isExist = false;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			var filepath=dir+"/"+filename;
	    	fileSystem.root.getFile(filepath,null,function(FileEntry) {
	    		isExist = true;
	    		
	    	},function(fileError) {
	    		isExist = false;
	    	});
	    	
	    }, function(){});
		
		return isExist;
	
	}
}); 