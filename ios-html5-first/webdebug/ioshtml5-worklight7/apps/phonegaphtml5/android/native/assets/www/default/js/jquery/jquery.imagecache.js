
/* JavaScript content from js/jquery/jquery.imagecache.js in folder common */
(function($) {
	$.fn.extend({
				cacheImages : function(options, callback) {
					var defaults = {
						//defaultImagePath : 'data:image/jpg;base64,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',
						defaultImagePath: imageUtil.imageNoImage,
						cacheFilePath : 'eipcaches',
						NoImagePattern: 'false'
					};
                    
					
					
					// Extend our default options with those provided.
					var opts = $.extend(defaults, options);

					/**
					 * 
					 * 具体流程是，当我想显示一张服务器图片，例如图片地址是
					 * http://www.mansonchor.com/image.jpg 时，我把
					 * http://www.mansonchor.com/image.jpg做md5算法，得出md5后的字符串，然后在本地文件夹里查找是否已经存在以这个md5串命名的图片，假如有，证明之前这张图片已经download到本地了，可以直接把这张图片的本地路径赋值给img的src显示；假如没有，证明这张图片还没被download到本地，就调用phonegap的FileTransfer.download接口把图片下载到手机上，当然这张本地图片的命名要以这个md5串一样。
					 * 
					 * 因为md5过的图片地址，和本地的图片文件名是一一对应而且是唯一的，这样我们就可以实现图片本地化的需求了。
					 */
					function cacheImageToLocal(img_src_url,img_obj) {

						// 处理开始
						var img_url = img_src_url;
						
						if(!img_url){
						    img_url="" ;
						}
						
						var paramPos=img_url.indexOf('imagePath');
						if(paramPos!=-1) {
							var paramStr=img_url.substring(paramPos+1);
							img_url=img_url.substring(0,paramPos+1)+paramStr.replace(/\\/g,"/");
							console.log("img_url1: "+img_url);
							var lastNamePos=img_url.lastIndexOf('\\');
								
							if(lastNamePos!=-1) {
								
							    var lastName=encodeURIComponent(img_url.substring(lastNamePos+1));
							    
							 //   console.log("img_ur3l: lastNamePos:  "+lastName+"  ,   "+img_url.substring(lastNamePos+1));
							    
							     
							    img_url=img_url.substring(0,lastNamePos+1)+lastName;
							}
						}  
					   // console.log("img_url2: "+img_url);
						if(img_url!="" && img_url.indexOf('http')==-1){//本地图片不做处理
							return ; 
						}
					   
						// 先统一设置为默认图片
						$(img_obj).attr('src', opts.defaultImagePath);
						
						if(opts.NoImagePattern=='true'){//无图模式
							return ;
						}
						var url_md5 = $.md5(img_url);
                         
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
								onFSSuccess, onError);

						// 文件系统回调函数
						function onFSSuccess(fileSystem) {
							// 取本机图像
							//console.log("target:"+fileSystem.root.fullPath+"/"+opts.cacheFilePath + "/"+ url_md5 + ".jpg");
							fileSystem.root.getFile(fileSystem.root.fullPath+"/"+opts.cacheFilePath + "/"
											+ url_md5 + ".jpg", null,
									// 如果有，直接拿出来显示
									function(FileEntry) {
										//console.log("cache target: "+FileEntry.toURL());
										$(img_obj).attr('src',
												FileEntry.toURL());
									},
									// 无的话，下载下来再显示
									function() {
                                      //alert(" target: "+FileEntry.toURL());
										fileSystem.root.getDirectory(
												opts.cacheFilePath, {
													create : true
												}, gotDir, onError);
									});
						}

						function gotDir(DATADIR) {
							var ft = new FileTransfer();
							var dlPath = DATADIR.fullPath + "/" + url_md5
									+ ".jpg";
                        //  alert(img_url);
							if(img_url!="" && img_url.indexOf('http')==-1){//本地图片不做处理
								return ;
							}		
							ft.download(img_url, dlPath, function(e) {
								 // console.log("down img_url: "+img_url);
								//  console.log("down: "+dlPath);
										$(img_obj).attr('src', e.fullPath);
										$(img_obj).show();
									}, function(e) {
										//console.log("ERROR");
										//console.log(JSON.stringify(e));

									});
						}

						function onError(e) {
							//console.log("文件操作错误: "+JSON.stringify(e));
						}
 
					};

					this.find("img").each(function(i, domImage) {
								cacheImageToLocal($(domImage).attr('src'),domImage);
							});
				}
			});
})(jQuery);