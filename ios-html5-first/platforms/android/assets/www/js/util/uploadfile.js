/**FileTransfer*/
var ft;

/**
 * 清除上传进度，处理上传失败，上传中断，上传成功
 */
function clearProcess() {
	$('.upload_process_bar').hide();
	ft.abort();
};

/**
 * 打开文件选择器,并让其支持所有文件的选择。
 */
function openFileSelector() {
	var source = navigator.camera.PictureSourceType.PHOTOLIBRARY;
	//描述类型，取文件路径
	var destinationType = navigator.camera.DestinationType.FILE_URI;
	//媒体类型，设置为ALLMEDIA即支持任意文件选择
	var mediaType = navigator.camera.MediaType.ALLMEDIA;
	var options={
		quality : 50,
		destinationType : destinationType,
		sourceType : source,
		mediaType : mediaType	
	};
	navigator.camera.getPicture(uploadFile,uploadBroken,options);
};

/**
 * 上传意外终止处理。
 * @param message
 */
function uploadBroken(message){
	showErrorDialog("系统发生错误: "+message);
	clearProcess();
};

/**
 * 上传过程回调，用于处理上传进度，如显示进度条等。
 */
function uploadProcessing(progressEvent){
	
	if (progressEvent.lengthComputable) {
		//已经上传
		var loaded=progressEvent.loaded;
		//文件总长度
		var total=progressEvent.total;
		//计算百分比，用于显示进度条
		var percent=parseInt((loaded/total)*100);
		//换算成MB
		loaded=(loaded/1024/1024).toFixed(2);
		total=(total/1024/1024).toFixed(2);
		$('#process_info').html(loaded+'/'+total);
		$('.upload_current_process').css({'width':percent+'%'});
	}
};

/**
 * 选择文件后回调上传。
 */
function uploadFile(fileURI,params,uploadSuccess,uploadFailed) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
	options.mimeType = "multipart/form-data;charset=utf-8";
	options.chunkedMode = false;
	if(params) options.params = params;
 
	ft = new FileTransfer();
	var uploadUrl=encodeURI(GLOBAL_UPLOAD_FILE_SERVER_URL);
	ft.upload(fileURI,uploadUrl,uploadSuccess, uploadFailed, options);
	//获取上传进度
	//ft.onprogress = uploadProcessing;
	//显示进度条
	//$('.upload_process_bar').show();
}

/**
 * 上传成功回调.
 * @param r
 */
function uploadSuccess1(r) {
	alert('文件上传成功:'+r.response);
	clearProcess();
}

/**
 * 上传失败回调.
 * @param error
 */
function uploadFailed1(error) {
	showErrorDialog("提交不成功，请稍候重试！");
	clearProcess();
}

