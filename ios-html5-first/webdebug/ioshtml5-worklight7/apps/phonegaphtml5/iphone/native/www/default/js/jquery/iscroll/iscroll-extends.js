
/* JavaScript content from js/jquery/iscroll/iscroll-extends.js in folder common */

(function($) {
	$(function() {

		function fixed(elm) {
			if (elm.data("iscroll-plugin")) {
				//alert('iscroll-plugin');
				return;
			}

			elm.css({
				overflow : 'hidden'
			});

			var barHeight = 0; 

			var $header = elm.find('[data-role="header"]');
			if ($header.length) {
				$header.css({
					"z-index" : 1000,
					padding : 0,
					width : "100%"
				});
				barHeight += $header.height();
			}

		
			var $footer = elm.find('[data-role="footer"]');
			if ($footer.length) {
				$footer.css({
					"z-index" : 1500,
					padding : 0,
					width : "100%"
				});
				barHeight += $footer.height();
			}

			var $wrapper = elm.find('[data-wrapper="wrapper"]');
			if ($wrapper.length) {
				$wrapper.css({
					"z-index" : 1
				});
				$wrapper.height($(window).height() - barHeight);
				$wrapper.bind('touchmove', function(e) {
					e.preventDefault();
				});
			}

			
			var scroller = elm.find('[data-iscroll="scroller"]').get(0);
			if (!scroller) {
				$($wrapper.get(0)).children().wrapAll(
						"<div data-iscroll='scroller'></div>");
			}

			
			var iscroll = new iScroll($wrapper.get(0), {
				hScroll : false,
				vScroll : true,
				hScrollbar : false,
				vScrollbar : false,
				fixedScrollbar : true,
				fadeScrollbar : false,
				hideScrollbar : true,
				useTransition:false,
				bounce : true,
				momentum : true,
				lockDirection : true,
				checkDOMChanges : true,
				topOffset:-12,
				onBeforeScrollStart : function(e) {
					var target = e.target;
					while (target.nodeType != 1)
						target = target.parentNode;

					if (target.tagName != 'SELECT'
							&& target.tagName != 'option'
							&& target.tagName != 'option'
							&& target.tagName != 'INPUT'
							&& target.tagName != 'TEXTAREA')
						e.preventDefault();
					e.stopPropagation();
				}
			});
			elm.data("iscroll-plugin", iscroll);

			window.setTimeout(function() {
				iscroll.refresh();
			}, 200);
		}
		$('[data-role="page"][data-iscroll="enable"]').on("pageshow",
				function() {
					fixed($(this));
				});
		if ($.mobile.activePage.data("iscroll") == "enable") {
			fixed($.mobile.activePage);
		}

	});
})(jQuery);