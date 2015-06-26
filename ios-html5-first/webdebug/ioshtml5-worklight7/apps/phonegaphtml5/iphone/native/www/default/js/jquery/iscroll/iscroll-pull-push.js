
/* JavaScript content from js/jquery/iscroll/iscroll-pull-push.js in folder common */
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
function buildPullIscroll($wrapper, pullDownAction, pullUpAction) {

	var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

	/* $wrapper.bind('touchmove', function(e) {
				e.preventDefault();
			}); */

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

	myScroll = new iScroll($wrapper.get(0), {
		hScroll : false,
		vScroll : true,
		hScrollbar : false,
		vScrollbar : true,
		fixedScrollbar : true,
		fadeScrollbar : false,
		hideScrollbar : true,
		useTransition : false,
		bounce : true,
		momentum : true,
		lockDirection : true,
		checkDOMChanges : false,
		topOffset : pullDownOffset,
		onBeforeScrollStart : function(e) {
			var target = e.target;
			while (target.nodeType != 1)
				target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'option'
					&& target.tagName != 'option' && target.tagName != 'INPUT'
					&& target.tagName != 'TEXTAREA') {
				e.preventDefault();
			}
			e.stopPropagation();
		},
		/*
		 * onRefresh: function () { if (pullDownEl.className.match('loading')) {
		 * pullDownEl.className = '';
		 * pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...'; }
		 * else if (pullUpEl.className.match('loading')) { pullUpEl.className =
		 * ''; pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...'; } },
		 */

		onScrollMove : function() {

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

		},
		onScrollEnd : function() {

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
			/*
			 * if(pullDownEl) {
			 * pullDownEl.querySelector('.pullDownLabel').innerHTML = '
			 * 下拉刷新...'; } if(pullUpEl) {
			 * pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载数据...'; }
			 */
			

			// 置顶处理
			jQuery().UItoTop(myScroll);
            
		}
	});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
}

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
function buildPullTerminatoIscroll($wrapper, pullDownAction, pullUpAction) {

	var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

	/* $wrapper.bind('touchmove', function(e) {
				e.preventDefault();
			}); */

	var $pullDownEl = $wrapper.find(".pullDown");
	if ($pullDownEl.length > 0) {
		pullDownEl = $pullDownEl.get(0);
		$pullDownEl.removeClass('loading');
		if(pullDownEl.querySelector('.pullDownLabel')){
		   pullDownEl.querySelector('.pullDownLabel').innerHTML = ' 下拉刷新...';
		}
		if($pullDownEl.find('.pullDownIconId')) {
		   $pullDownEl.find('.pullDownIconId').addClass("pullDownIcon");
		}
	}

	var $pullUpEl = $wrapper.find(".pullUp");
	if ($pullUpEl.length > 0) {
		pullUpEl = $pullUpEl.get(0);
		$pullUpEl.removeClass('loading');
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

	myScroll = new iScroll($wrapper.get(0), {
		hScroll : false,
		vScroll : true,
		hScrollbar : false,
		vScrollbar : true,
		fixedScrollbar : true,
		fadeScrollbar : false,
		hideScrollbar : true,
		useTransition : false,
		bounce : true,
		momentum : true,
		lockDirection : true,
		checkDOMChanges : false,
		topOffset : pullDownOffset,
		onBeforeScrollStart : function(e) {
			var target = e.target;
			while (target.nodeType != 1)
				target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'option'
					&& target.tagName != 'option' && target.tagName != 'INPUT'
					&& target.tagName != 'TEXTAREA') {
				e.preventDefault();
			}
			e.stopPropagation();
		},
		/*
		 * onRefresh: function () { if (pullDownEl.className.match('loading')) {
		 * pullDownEl.className = '';
		 * pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...'; }
		 * else if (pullUpEl.className.match('loading')) { pullUpEl.className =
		 * ''; pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...'; } },
		 */

		onScrollMove : function() {

			if (this.y > 5 && pullDownEl && !pullDownEl.className.match('flip')) {
				$pullDownEl.show();
				$pullDownEl.addClass('flip');
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
				$pullDownEl.removeClass('flip');
				if(pullDownEl.querySelector('.pullDownLabel')) {
				    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				}
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && pullUpEl && !$pullUpEl.is(":hidden")
					&& !pullUpEl.className.match('flip')) {
				$pullUpEl.addClass('flip');
				if(pullUpEl.querySelector('.pullUpLabel')) {
				   pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放立即更新...';
				}
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl && !$pullUpEl.is(":hidden")
					&& pullUpEl.className.match('flip')) {
				$pullUpEl.removeClass('flip');
				if(pullUpEl.querySelector('.pullUpLabel')) {
				  pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				} 
				this.maxScrollY = pullUpOffset;
			}

		},
		onScrollEnd : function() {

			if (pullDownEl && pullDownEl.className.match('flip')
					&& $pullDownEl.children().length > 0) {
				pullDownAction(true); 
				$pullDownEl.removeClass('flip');
                myScroll.refresh();
			} else if (pullUpEl && pullUpEl.className.match('flip')
					&& !$pullUpEl.is(":hidden")) {
				pullUpAction();
				$pullUpEl.removeClass('flip');
                myScroll.refresh();
			}
			/*
			 * if(pullDownEl) {
			 * pullDownEl.querySelector('.pullDownLabel').innerHTML = '
			 * 下拉刷新...'; } if(pullUpEl) {
			 * pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载数据...'; }
			 */
			

			// 置顶处理
			jQuery().UItoTop(myScroll);
            
		}
	});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
}

/**
 * 自定义滚动区域
 * 
 * @param {}
 *            $wrapper
 */
function buildNornamlIscroll($wrapper) {
	var $pullDownEl = $wrapper.find("#emptyDiv");
	var pullDownOffset = 57;
	if ($pullDownEl.length > 0) {
		var pullDownEl = $pullDownEl.get(0);
		if (pullDownEl) {
			pullDownOffset = pullDownEl.offsetHeight;
		} 
	}

	$wrapper.bind('touchmove', function(e) {
		e.preventDefault();
	});
			
	var myScroll = new iScroll($wrapper.get(0), {
				hScroll : false,
				vScroll : true,
				hScrollbar : false,
				vScrollbar : true,
				fixedScrollbar : true,
				fadeScrollbar : false,
				hideScrollbar : true,
				useTransition : false,
				bounce : false,
				momentum : true,
				lockDirection : true,
				checkDOMChanges : true,
				topOffset : pullDownOffset,
				onBeforeScrollStart : function(e) {
					var target = e.target;
					while (target.nodeType != 1)
						target = target.parentNode;

					if (target.tagName != 'SELECT'
							&& target.tagName != 'option'
							&& target.tagName != 'option'
							&& target.tagName != 'INPUT'
							&& target.tagName != 'TEXTAREA') {
						e.preventDefault();
					}
					e.stopPropagation();
				},
				onScrollEnd : function() {
					// 置顶处理
					jQuery().UItoTop(myScroll);
				}
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
function buildNornamlCrosswiseIscroll($wrapper) {
	
	$wrapper.bind('touchmove', function(e) {
		e.preventDefault();
	});
			
	var myScroll = new iScroll($wrapper.get(0), {
		hScroll : true,
		vScroll : false,
		hScrollbar : false,
		vScrollbar : false,
		fixedScrollbar : false,
		fadeScrollbar : false,
		hideScrollbar : false,
		useTransition : false,
		bounce : false,
		momentum : false,
		lockDirection : true,
		checkDOMChanges : false
	
	});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
} 


function buildwrapperInopenIscroll($wrapper){
	var $pullDownEl = $wrapper.find("#emptyDiv");
	var pullDownOffset = 57;
	if ($pullDownEl.length > 0) {
		var pullDownEl = $pullDownEl.get(0);
		if (pullDownEl) {
			pullDownOffset = pullDownEl.offsetHeight;
		} 
	}

	var myScroll = new iScroll($wrapper.get(0), {
				hScroll : false,
				vScroll : true,
				hScrollbar : false,
				vScrollbar : true,
				scrollbarClass:'myScrollbar',
				fixedScrollbar : true,
				fadeScrollbar : false,
				hideScrollbar : false,
				useTransition : false,
				bounce : false,
				momentum : true,
				lockDirection : true,
				checkDOMChanges : true,
				topOffset : pullDownOffset,
				onBeforeScrollStart : function(e) {
					var target = e.target;
					while (target.nodeType != 1)
						target = target.parentNode;

					if (target.tagName != 'SELECT'
							&& target.tagName != 'option'
							&& target.tagName != 'option'
							&& target.tagName != 'INPUT'
							&& target.tagName != 'TEXTAREA') {
						e.preventDefault();
					}
					e.stopPropagation();
				}
				
			});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
}
 


/**
 * 建立双向滚动区域
 * 
 * @param {}
 *            $wrapper
 */
function buildBidscroll($wrapper,leftx) {
	
	
	
	var $pullDownEl = $wrapper.find("#emptyDiv");
	var pullDownOffset = 57;
	if ($pullDownEl.length > 0) {
		var pullDownEl = $pullDownEl.get(0);
		if (pullDownEl) {
			pullDownOffset = pullDownEl.offsetHeight;
		} 
	}
    
	var left=0;
	if(leftx){
		left=leftx;
	}
	
	var myScroll = new iScroll($wrapper.get(0), {
		        x:left,
				hScroll : false,
				vScroll : true,
				hScrollbar : false,
				vScrollbar : true,
				fixedScrollbar : true,
				fadeScrollbar : false,
				hideScrollbar : true,
				useTransition : false,
				bounce : false,
				momentum : true,
				lockDirection : true,
				checkDOMChanges : true,
				topOffset : pullDownOffset,
				onBeforeScrollStart : function(e) {
					var target = e.target;
					while (target.nodeType != 1)
						target = target.parentNode;

					if (target.tagName != 'SELECT'
							&& target.tagName != 'option'
							&& target.tagName != 'option'
							&& target.tagName != 'INPUT'
							&& target.tagName != 'TEXTAREA') {
						e.preventDefault();
					}
					e.stopPropagation();
				},
				onScrollEnd : function() {
					// 置顶处理
					jQuery().UItoTop(myScroll);
				}
			});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
} 

function buildBidPullAcroll1($wrapper, pullDownAction, pullUpAction,leftx) {
	
}
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
function buildBidPullAcroll($wrapper, pullDownAction, pullUpAction,leftx) {

	var myScroll, pullDownEl, pullDownOffset=0, pullUpEl, pullUpOffset=0;

	var $pullDownEl = $wrapper.find(".bidPullDown");
	
	if ($pullDownEl.length > 0) {
		pullDownEl = $pullDownEl.get(0);
		$pullDownEl.removeClass('bidflip');
		if(pullDownEl.querySelector('.bidPullDownLabel')){
		   pullDownEl.querySelector('.bidPullDownLabel').innerHTML = ' 下拉刷新...';
		}
		
	}

	var $pullUpEl = $wrapper.find(".bidPullUp");
	if ($pullUpEl.length > 0) {
		pullUpEl = $pullUpEl.get(0);
		$pullDownEl.removeClass('bidflip');
		if (pullUpEl.querySelector('.bidPullUpLabel')) {
			pullUpEl.querySelector('.bidPullUpLabel').innerHTML = '上拉加载更多...';
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
	
	var left=0;
	if(leftx){
		left=leftx;
	}


	myScroll = new iScroll($wrapper.get(0), {
		x:left,
		hScroll : false,
		vScroll : true,
		hScrollbar : false,
		vScrollbar : true,
		fixedScrollbar : true,
		fadeScrollbar : false,
		hideScrollbar : true,
		useTransition : false,
		bounce : true,
		momentum : true,
		lockDirection : true,
		checkDOMChanges : false,
		topOffset : pullDownOffset,
		onBeforeScrollStart : function(e) {
			var target = e.target;
			while (target.nodeType != 1)
				target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'option'
					&& target.tagName != 'option' && target.tagName != 'INPUT'
					&& target.tagName != 'TEXTAREA') {
				e.preventDefault();
			}
			
		},
		
		onScrollMove : function() {

			if (this.y > 5 && pullDownEl && !pullDownEl.className.match('bidflip')) {
				$pullDownEl.show();
				$pullDownEl.addClass('bidflip');
				if(pullDownEl.querySelector('.bidPullDownLabel')) {
				   pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '释放立即刷新...';
				}

				this.minScrollY = 0;
				// 计算刷新时间
				var curdatetime = (new Date()).getTime(); // 获得当前时间
				var lastefreshtime = $pullDownEl.attr("data-lastefreshtime");

				if (lastefreshtime) {
					var internalDesc = showInterval(lastefreshtime, curdatetime);
					if(pullDownEl.querySelector('.bidPullDownLabel')) {
					   pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '释放立即刷新... 上次刷新时间: '
							+ internalDesc;
					}
				}
			
				$pullDownEl.attr("data-lastefreshtime", curdatetime);

			} else if (this.y < 5 && pullDownEl
					&& pullDownEl.className.match('bidflip')) {
				$pullDownEl.show();
				$pullDownEl.removeClass('bidflip');
				if(pullDownEl.querySelector('.bidPullDownLabel')) {
				    pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '请稍后...';
				}
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && pullUpEl && !$pullUpEl.is(":hidden")
					&& !pullUpEl.className.match('bidflip')) {
				$pullUpEl.addClass('bidflip');
				if(pullUpEl.querySelector('.bidPullUpLabel')) {
				   pullUpEl.querySelector('.bidPullUpLabel').innerHTML = '释放立即更新...';
				}
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl && !$pullUpEl.is(":hidden")
					&& pullUpEl.className.match('bidflip')) {
				$pullUpEl.removeClass('bidflip');
				if(pullUpEl.querySelector('.bidPullUpLabel')) {
				  pullUpEl.querySelector('.bidPullUpLabel').innerHTML = '上拉加载更多...';
				} 
				this.maxScrollY = pullUpOffset;
			}

		},
		onScrollEnd : function() {
		
			if (pullDownEl && pullDownEl.className.match('bidflip')
					&& $pullDownEl.children().length > 0) {
				
				pullDownAction(true); 
				$pullDownEl.removeClass('bidflip');
                myScroll.refresh();
			} else if (pullUpEl && pullUpEl.className.match('bidflip')
					&& !$pullUpEl.is(":hidden")) {
			  
				pullUpAction(); // Execute custom function (ajax call?)
				$pullUpEl.removeClass('bidflip');
				myScroll.refresh();
			}
		
			// 置顶处理
			jQuery().UItoTop(myScroll);
            
		}
	});

	setTimeout(function() {
				$wrapper.get(0).style.left = '0';
			}, 800);

	return myScroll;
}

/**
 * 建造固定区域横向滚动
 * @param $wrapper
 */
function buildHorizontalcroll($wrapper) {
	
	var myScroll = new iScroll($wrapper.get(0), {
		    snap: false,
		    momentum: true,	
			hScrollbar : false,
			bounce : false
		   });
	
		
	return myScroll;
}

// 显示Iscroll上拉加载信息
function showPullUpIscrollLoading($wrapper, showPullDownLoading) {

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

//显示Iscroll上拉加载信息
function showPullUpTerminatoIscrollLoading($wrapper, showPullDownLoading) {

	var pullDownEl, pullDownOffset;
	var hasShowPullupLoading=false; //防止同时显示两个loading
	var $pullUpEl = $wrapper.find(".pullUp");
	var $pullDownEl = $wrapper.find(".pullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);

		if (!showPullDownLoading) {
			$pullDownEl.removeClass('loading');
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
			//$pullDownEl.css("border-bottom","0px");
			$pullDownEl.hide();
		} else {
			
			$pullDownEl.css("border-bottom","1px solid #ccc");
			$pullDownEl.addClass("loading");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '请稍候...';
			
			var $emptyDiv = $wrapper.find("#emptydiv");
			if ($emptyDiv.length == 0) {//加载空的div把上拉框显示出来
				var $scroller = $wrapper.find(".scroller");
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
		$pullUpEl.addClass('loading');
	    $pullUpEl.css("border-bottom","1px solid #ccc");
		if (pullUpEl.querySelector('.pullUpLabel')) {
			pullUpEl.querySelector('.pullUpLabel').innerHTML = ' 请稍后...';
		}
		$pullUpEl.show();
	}

}

//显示Pid Iscroll上拉加载信息
function showBidPullUpIscrollLoading($wrapper, showPullDownLoading) {

	var pullDownEl, pullDownOffset;
	var hasShowPullupLoading=false; //防止同时显示两个loading
	var $pullUpEl = $wrapper.find(".bidPullUp");
	var $pullDownEl = $wrapper.find(".bidPullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);

		if (!showPullDownLoading) {
			$pullDownEl.removeClass('bidloading');
			pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '';
			//$pullDownEl.css("border-bottom","0px");
			$pullDownEl.hide();
		} else {
			
			$pullDownEl.css("border-bottom","1px solid #ccc");
			$pullDownEl.addClass('bidloading');
			pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '请稍候...';
			
			
			var $emptyDiv = $wrapper.find("#emptydiv");
			if ($emptyDiv.length == 0) {//加载空的div把上拉框显示出来
				var $scroller = $wrapper.find(".bidvsscroller");
				$scroller.prepend('<div id="emptydiv" style="height:50px;background:#fff;"><span>&nbsp;&nbsp;&nbsp;</span></div>');

			}
		
			hasShowPullupLoading=true;
            $pullUpEl.hide();
			$pullDownEl.show();
			
		}
		
	}
   
  
	if ($pullUpEl.length > 0 && !hasShowPullupLoading) {
    	if ($pullUpEl.children().length == 0) {
			var item = '<span class="bidPullUpIcon"></span><span class="bidPullUpLabel">上拉加载更多...</span>';
			$pullUpEl.append($(item));
		}
    	
    	pullUpEl = $pullUpEl.get(0);
	    $pullUpEl.css("border-bottom","1px solid #ccc");
		$pullUpEl.addClass('bidUploading');
		
		if (pullUpEl.querySelector('.bidPullUpLabel')) {
			pullUpEl.querySelector('.bidPullUpLabel').innerHTML = ' 请稍后...';
		}
		$pullUpEl.show();
	}

}

// 隐藏Iscroll上拉加载信息
function hidePullUpIscrollLoading($wrapper, showPullup) {
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

//隐藏Iscroll上拉加载信息
function hidePullUpTerminatoIscrollLoading($wrapper, showPullup) {
	var pullDownEl, pullDownOffset;

	var $pullDownEl = $wrapper.find(".pullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);
		$pullDownEl.removeClass('loading');
		pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
		$pullDownEl.show();
	}
    
	var $pullUpEl = $wrapper.find(".pullUp");
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
			$pullUpEl.removeClass('loading');
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

//隐藏PidIscroll上拉加载信息
function hideBidPullUpIscrollLoading($wrapper, showPullup) {

	var $pullDownEl = $wrapper.find(".bidPullDown");
	if ($pullDownEl.length>0) {
		pullDownEl = $pullDownEl.get(0);
		$pullDownEl.removeClass("bidloading");
		pullDownEl.querySelector('.bidPullDownLabel').innerHTML = '下拉刷新...';
		$pullDownEl.show();
	}
    
	var $pullUpEl = $wrapper.find(".bidPullUp");
	
	if ($pullUpEl.length > 0) {
		
		pullUpEl = $pullUpEl.get(0);
		if (!showPullup) {// 不需要翻页操作，清除下拉操作
			$pullUpEl.hide();
		} else {
			if ($pullUpEl.children().length == 0) {
				var item = '<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>';
				$pullUpEl.append($(item));
			}
			
			pullUpEl = $pullUpEl.get(0);
			$pullUpEl.removeClass("bidUploading");
		    $pullUpEl.css("border-bottom","1px solid #ccc");
			pullUpEl.querySelector('.bidPullUpLabel').innerHTML = '上拉加载更多...';
			$pullUpEl.show();
			
		}
	}
  
	var $emptyDiv = $wrapper.find("#emptydiv");
	if ($emptyDiv.length>0) {
		$emptyDiv.remove();
	}
	
}

// 无法请求数据时给出错误提示
function showErrorInfo(tip) {
	if(!tip||tip.length==0){
		tip="无法获取数据！";
	}
	$("#commonFlyDivShow > li:last").html(tip);
	$("#commonFlyDivShow").show();
	setTimeout(function() {
				$("#commonFlyDivShow").hide();
			}, 4000);
}

function showSuccessInfo(tip) {
	if(!tip||tip.length==0){
		tip="操作成功！";
	}
	$("#commonFlyDivShow1 > li:last").html(tip);
	$("#commonFlyDivShow1").show();
	setTimeout(function() {
				$("#commonFlyDivShow1").hide();
			}, 4000);
}

// 不能再请求新数据的提示
function showReturnEmptyInfo() {
	$("#commonFlyDivShow > li:last").html("没有新数据了！");
	$("#commonFlyDivShow").show();
	setTimeout(function() {
				$("#commonFlyDivShow").hide();
			}, 4000);
}

function debug(msg) {
	if (window.console && window.console.log)
		window.console.log(msg);
};

