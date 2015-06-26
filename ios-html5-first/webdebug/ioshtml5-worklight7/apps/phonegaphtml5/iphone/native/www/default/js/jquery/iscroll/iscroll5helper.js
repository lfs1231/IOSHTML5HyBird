
/* JavaScript content from js/jquery/iscroll/iscroll5helper.js in folder common */
/**
 * 上拉更新页面，下拉加载更多数据
 * 
 * @param {}
 *            $wrapper
 * @param {}
 *            pullDownAction
 * @param {}
 *            pullUpAction
 * @return {}
 */
function buildPullIscroll5($wrapper, pullDownAction, pullUpAction) {

	var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

    var  wrappername=$wrapper.attr("id");
	var $pullDownEl = $wrapper.find("#pullDown");
	if ($pullDownEl.length > 0) {
		pullDownEl = $pullDownEl.get(0);
		pullDownEl.className = '';
		if(pullDownEl.querySelector('.pullDownLabel')){
		   pullDownEl.querySelector('.pullDownLabel').innerHTML = ' 下拉刷新...';
		}
		if($pullDownEl.find('#pullDownIconId')) {
		   $pullDownEl.find('#pullDownIconId').addClass("pullDownIcon");
		}
	}

	var $pullUpEl = $wrapper.find("#pullUp");
	if ($pullUpEl.length > 0) {
		pullUpEl = $pullUpEl.get(0);
		pullUpEl.className = '';
		if (pullUpEl.querySelector('.pullUpLabel')) {
			pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
		}
	}

	if (pullUpEl) {
		pullUpOffset = pullUpEl.offsetHeight;
	} else {
		pullUpOffset = 10;
	}
	if (pullDownEl) {
		pullDownOffset = pullDownEl.offsetHeight;
	} else {
		pullDownOffset = 57;
	}
    var decelerationValue=0.0009;
    
    if(isWindowsphone()){
    	decelerationValue=0.0003;
    }
	var myScroll = new IScroll('#'+wrappername, {  
         probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
         scrollbars: true,//有滚动条  
         deceleration:decelerationValue,
         mouseWheel: true,//允许滑轮滚动  
         fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
         bounce:true,//边界反弹  
         interactiveScrollbars:true,//滚动条可以拖动  
         shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
         click: true ,// 允许点击事件  
        // keyBindings:true,//允许使用按键控制  
       
 		// useTransition: false,
 		
         momentum:true// 允许有惯性滑动  
     });  
	

	/*	
	var myScroll = new IScroll('#wrapper', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		momentum:true// 允许有惯性滑动  
	});  */
	
	//滚动时  
     myScroll.on('scroll', function(){  
    	
     	if (this.y > 5 && pullDownEl && !pullDownEl.className.match('flip')) {
			$pullDownEl.show();
			pullDownEl.className = 'flip';
			if(pullDownEl.querySelector('.pullDownLabel')) {
			   pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放立即刷新...';
			}

			this.minScrollY = 0;
			// 计算刷新时间
			var curdatetime = (new Date()).getTime(); // 获得当前时间
			var lastefreshtime = $pullDownEl.attr("data-lastefreshtime");

			if (lastefreshtime) {
				var internalDesc = showInterval(lastefreshtime, curdatetime);
				if(pullDownEl.querySelector('.pullDownLabel')) {
				   pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放立即刷新... 上次刷新时间: '
						+ internalDesc;
				}
			}
		
			$pullDownEl.attr("data-lastefreshtime", curdatetime);

		} else if (this.y < 5 && pullDownEl
				&& pullDownEl.className.match('flip')) {
			$pullDownEl.show();
			pullDownEl.className = '';
			if(pullDownEl.querySelector('.pullDownLabel')) {
			    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			}
			this.minScrollY = -pullDownOffset;
		} else if (this.y < (this.maxScrollY - 5) && pullUpEl && !$pullUpEl.is(":hidden")
				&& !pullUpEl.className.match('flip')) {
			pullUpEl.className = 'flip';
			if(pullUpEl.querySelector('.pullUpLabel')) {
			   pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放立即更新...';
			}
			this.maxScrollY = this.maxScrollY;
		} else if (this.y > (this.maxScrollY + 5) && pullUpEl && !$pullUpEl.is(":hidden")
				&& pullUpEl.className.match('flip')) {
			pullUpEl.className = '';
			if(pullUpEl.querySelector('.pullUpLabel')) {
			  pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			} 
			this.maxScrollY = pullUpOffset;
		}
     });  
     
     //滚动完毕  
     myScroll.on('scrollEnd',function(){  
		if (pullDownEl && pullDownEl.className.match('flip')
				&& $pullDownEl.children().length > 0) {
				
			pullDownAction(true); 
            myScroll.refresh();
		} else if (pullUpEl && pullUpEl.className.match('flip')
				&& !$pullUpEl.is(":hidden")) {
			//$pullUpEl.children().remove();
					
			pullUpAction(); // Execute custom function (ajax call?)
            myScroll.refresh();
		}
		
		// 置顶处理
		jQuery().UItoTop(myScroll);
            
     });  

 	setTimeout(function() {
		$wrapper.get(0).style.left = '0';
	}, 800);
 	
 	
 	
	return myScroll;
}

/**
 * 不带上拉或者下拉滚动
 * @param $wrapper
 */
function buildNornamlIscroll5($wrapper) {
	 var  wrappername=$wrapper.attr("id");
	  
	var myScroll = new IScroll('#'+wrappername, {  
         probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
         scrollbars: true,//有滚动条  
         mouseWheel: true,//允许滑轮滚动  
         fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
         bounce:true,//边界反弹  
         interactiveScrollbars:true,//滚动条可以拖动  
         shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
         click: true ,// 允许点击事件  
         keyBindings:true,//允许使用按键控制  
         momentum:true// 允许有惯性滑动  
     });  
	 
	setTimeout(function() {
		$wrapper.get(0).style.left = '0';
	}, 800);
 	
	 return myScroll;
}


/**
 * 自定义横向滚动区域
 * 
 * @param {}
 *            $wrapper
 */
function buildNornamlCrosswiseIscroll5($wrapper,scrollAction,eventName) {
	
	$wrapper.bind('touchmove', function(e) {
		e.preventDefault();
	});
	
	var  wrappername=$wrapper.attr("id");
	var myScroll = new IScroll('#'+wrappername, { scrollX: true, scrollY: false, mouseWheel: true });
	
	if(eventName=='scrollStart') {
		  //开始滚动 
	    myScroll.on('scrollStart',function(){  
	    	scrollAction();
	    });  
	}else  if(eventName=='scrollEnd') {
		  //开始滚动 
	    myScroll.on('scrollEnd',function(){  
	    	scrollAction();
	    });  
	}
	
	setTimeout(function() {
		$wrapper.get(0).style.left = '0';
	}, 800);
	
	return myScroll;
} 


/**
 * 在开门时的滚动，不包括下拉或者上拉刷新
 */
function buildwrapperInopenIscroll5($wrapper){
	var $pullDownEl = $wrapper.find("#emptyDiv");
	var pullDownOffset = 57;
	if ($pullDownEl.length > 0) {
		var pullDownEl = $pullDownEl.get(0);
		if (pullDownEl) {
			pullDownOffset = pullDownEl.offsetHeight;
		} 
	}

	var  wrappername=$wrapper.attr("id");
	var myScroll = new IScroll('#'+wrappername, {  
        probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
        scrollbars: true,//有滚动条  
        //scrollbars: 'myScrollbar', 
        mouseWheel: true,//允许滑轮滚动  
        fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
        bounce:true,//边界反弹  
        interactiveScrollbars:true,//滚动条可以拖动  
       // shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
        click: true ,// 允许点击事件  
        keyBindings:true,//允许使用按键控制  
        momentum:true// 允许有惯性滑动  
    });  
	 
	setTimeout(function() {
		$wrapper.get(0).style.left = '0';
	}, 800);
	
	return myScroll;
}
//显示Iscroll5上拉加载信息
function showPullUpIscrollLoading5($wrapper, showPullDownLoading) {

	var pullDownEl, pullDownOffset;
	var hasShowPullupLoading=false; //防止同时显示两个loading
	var $pullUpEl = $wrapper.find("#pullUp");
	var $pullDownEl = $wrapper.find("#pullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);

		if (!showPullDownLoading) {
			pullDownEl.className = '';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
			//$pullDownEl.css("border-bottom","0px");
			$pullDownEl.hide();
		} else {
			
			$pullDownEl.css("border-bottom","1px solid #ccc");
			pullDownEl.className = 'loading';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '请稍候...';
			
			var $emptyDiv = $wrapper.find("#emptydiv");
			if ($emptyDiv.length == 0) {//加载空的div把上拉框显示出来
				var $scroller = $wrapper.find("#scroller");
				$scroller
						.prepend('<div id="emptydiv" style="height:45px;background:#fff;"><span>&nbsp;&nbsp;&nbsp;</span></div>');

			}
		
			hasShowPullupLoading=true;
            $pullUpEl.hide();
			$pullDownEl.show();
			
		}
		
	}
   
  
	if ($pullUpEl.length > 0 && !hasShowPullupLoading) {
    	if ($pullUpEl.children().length == 0) {
			var item = '<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>';
			$pullUpEl.append($(item));
		}
		pullUpEl = $pullUpEl.get(0);
		pullUpEl.className = 'loading';
	    $pullUpEl.css("border-bottom","1px solid #ccc");
		if (pullUpEl.querySelector('.pullUpLabel')) {
			pullUpEl.querySelector('.pullUpLabel').innerHTML = ' 请稍后...';
		}
		$pullUpEl.show();
	}

}


//隐藏Iscroll上拉加载信息
function hidePullUpIscrollLoading5($wrapper, showPullup) {
	var pullDownEl, pullDownOffset;

	var $pullDownEl = $wrapper.find("#pullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);
		pullDownEl.className = '';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
		$pullDownEl.show();
	}
 
	var $pullUpEl = $wrapper.find("#pullUp");
	if ($pullUpEl.length > 0) {
		
		pullUpEl = $pullUpEl.get(0);
		if (!showPullup) {// 不需要翻页操作，清除下拉操作
		 /*	if (pullUpEl.querySelector('.pullUpLabel')) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
			}*/
			//$pullUpEl.css("border-bottom","0px");
			$pullUpEl.hide();
		} else {
			if ($pullUpEl.children().length == 0) {
				var item = '<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>';
				$pullUpEl.append($(item));
			}
			
			pullUpEl = $pullUpEl.get(0);
			pullUpEl.className = '';
		    $pullUpEl.css("border-bottom","1px solid #ccc");
			pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			$pullUpEl.show();
			
		}
	}

	var $emptyDiv = $wrapper.find("#emptydiv");
	if ($emptyDiv.length>0) {
		$emptyDiv.remove();
	}
	
}
