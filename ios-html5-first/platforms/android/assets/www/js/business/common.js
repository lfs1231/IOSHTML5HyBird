

//系统初始化
(function() {
	
	/**
	 * 去掉缓存在localStorage中的过期数据 1. 每一块业务请自行在此添加，避免缓存造成的意外异常； 2.
	 * 不要调用localStorage.clea方法，因为还存放用户的个性化设置数据
	 */
	function removeLocalStorage() {
		// 新闻
		//HybirdMobile.utils.remove("news_cache_list");
	}
	
	$(document).bind("mobileinit", function() {
		//跨域设置
		$.support.cors=true;
		$.mobile.allowCrossDomainPages= true; 
		// 干掉默认转场效果
		//TODO
		$.mobile.defaultPageTransition   = 'none';
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.buttonMarkup.hoverDelay = 0;
		$.mobile.phonegapNavigationEnabled=true;
		
		$.mobile.pageLoadErrorMessage="加载页面时发生错误";
		//$.event.special.swipe.horizontalDistanceThreshold=10;


	});
	
	

	$("#page_introduction").on("pageshow", function() {
			
		
		var maxWidth = $(window).width();
		
		var $introduceList=$('#introduceList');
		$introduceList.empty();
		var strIntro=$('<li><img  src="'+imageUtil.image_index_intro+'" border="0" alt=""  title="" /></li>')  ;
	    $introduceList.append(strIntro);
		
		  $('#introduceList img').each(function(){
			
		 	 $(this).css("width", $(window).width())
					.css('height', $(window).height());
		  });
	    
		//先读取缓存图片张数
		var introNUM=HybirdMobile.utils.getParam('introduction_images_number');
		
		if(!introNUM || introNUM <=0) { //显示默认图片
			//guide();
		}else {
			$introduceList.empty();
			//先前已经缓存过新的介绍图片
			for (var i = 1; i <=introNUM; i++) {
				var introImagesrc=HybirdMobile.utils.getParam('introduction_images_'+i);
				
			    var listItem=$('<li><img  src="'+introImagesrc+'" border="0" alt=""  title="" /></li>')  ;
			    $introduceList.append(listItem);
			}
			 
			maxWidth = $(window).width()*introNUM; 
		}

	
		
		var eipmyScroll =buildNornamlCrosswiseIscroll5($('#eipwrapper'),slideImage,'scrollStart');
		
		function slideImage() {
			var nextPosX = eipmyScroll.x - $(window).width();
		    var limit= -maxWidth + $(window).width() ;
		    
			if (nextPosX >= limit ) {
				eipmyScroll.scrollTo(nextPosX, 0, 200);
			}
			
			var nextPosX = eipmyScroll.x - $(window).width();
			//最后一张图片显示后自动跳到登陆页面
			if (nextPosX  <= limit) { 
				guide();
			}
		};  

		eipmyScroll.refresh();
		
		$("#page_introduction").on("pagebeforehide", function() {	
			eipmyScroll.destroy();
			
		}); 
	});

	function guide(){
		//清空缓存
		removeLocalStorage();

		setTimeout(function() {
			mobileChangePage("html/guide/intro1.html");
		}, 1500);
		
		
		if(HybirdMobile.utils.getParam("once_login")!="true"){
			//HybirdMobile.utils.setParam("once_login","true");
			setTimeout(function() {
				//mobileChangePage("html/guide/intro1.html");
			}, 500);
		}else{ 
			setTimeout(function() {
				//mobileChangePage("html/guide/intro1.html");	
				//改为新版登录
				//mobileChangePage("html/login/login.html");
				//mobileChangePage("html/login/newLogin.html");
			}, 1200);
		}
		
		
		
	} 

	$(document).on("pageshow","#page_guide",function(){
		
		var swipehight=$(window).height();
		
		var strHTML = ' ';

		// 文章头部
		strHTML += ' <li><img src="'+imageUtil.image_guide_intro1+'" notBuffer=true  border="1" alt="" title="" /> </li>'
			+' <li><img src="'+imageUtil.image_guide_intro2+'" notBuffer=true  border="1" alt="" title="" /> </li>'
			+' <li><img src="'+imageUtil.image_guide_intro3+'" notBuffer=true  border="1" alt="" title="" /> '
			+'<div id="startlogin">'
			+'<a id="beginUse" data-theme="y" style="background: #e88621 !important; border: none;color:#ffffff"  data-role="button" href="#">开始使用</a>'
			+'</div> </li>';
			
		
		strHTML = $(strHTML);
		//strHTML.find('a').button('refresh');
		$('#swipecontent').html(strHTML);
		$('#swipecontent').trigger('create'); 
		
		  $('#swipecontent').swipeContent({'height':swipehight});
		  $('#swipecontent img').each(function(){
		 	 $(this).css("width", $(window).width())
					.css('height', $(window).height()-50);
		  });
		
		  $('#startlogin').bind('tap',function(){
		 	//改为新版登录
		 	//mobileChangePage("../login/login.html");
		 	mobileChangePage("../login/newLogin.html");
		  });
		  
		  
		 
	  
	});
})();