var NativeEventsListener = (function() {
	var logger = WL.Logger.create({ pkg : "NativeEventsListener" });
	logger.log(" NativeEventsListener  Initializing");

	this.onReceivedEvent = function(eventData) {
		if(!eventData) {
			return;
		}
		if(!eventData.eventType){
			return ;
		}
		
		logger.log("js onReceivedEvent :: eventData :: "
				+ JSON.stringify(eventData));
        // alert(JSON.stringify(eventData));
		var eventHandler = function() {
		}; 

		switch (eventData.eventType) {
			case "returnLoginClick":
				eventHandler = processReturnLoginClicked;
				break;
			case "verifyPassed":
				eventHandler = processVerifyPassed;
				break;
			case "segmentedClick":
				eventHandler = processSegmentedClickEvent;
				break;
			case "navBarLeftButtonClicked":
				eventHandler = processNavBarLeftButtonClicked;
				break;
			default:
				logger.log("onReceivedEvent :: unrecognized eventType");
		}
		eventHandler(eventData);
	};

	function processSegmentedClickEvent(eventData) {
		var pageId = "#page" + eventData.pageIndex;
		logger.log("js processSegmentedClickEvent :: pageId :: " + pageId);
		$.mobile.changePage(pageId, {
			reverse : pageId === "#page1" ? true : false
		});
	}

	function processNavBarLeftButtonClicked(eventData) {
		logger.log("js processNavBarLeftButtonClicked");
		
		$.mobile.changePage("#page1", {
			reverse : true
		});

	}
 
	function processReturnLoginClicked(eventData) {
	  
		logger.log("====js returnLoginButtonClicked");
		//mobileChangePage("../auth/login.html");
		 var page = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
		// alert('Active pa11ge\'s ID: ' + page+", "+$.mobile.activePage);
		mobileChangePage("../auth/login.html");
		
	} 
    
	function  processVerifyPassed(eventData){
		//重新登陆
	}
	return this;
}());
