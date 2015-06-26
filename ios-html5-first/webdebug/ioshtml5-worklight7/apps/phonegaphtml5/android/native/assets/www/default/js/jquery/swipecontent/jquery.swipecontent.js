
/* JavaScript content from js/jquery/swipecontent/jquery.swipecontent.js in folder common */
/*!
 * swipeGallery 0.5.0
 * Examples and documentation at: 
 * http://www.app-agentur-bw.de/showcase/swipegallery
 * 2011 AREA-NET GmbH (www.app-agentur-bw.de | www.area-net.de)
 * Version: 0.5.0 (17-MARCH-2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Requires:
 * jQuery v1.3.2 or later
 * 
 */

(function($){
  $.fn.swipeContent = function(options,swipecallback) {
            
    var settings = {
      'classname'  : 'appContent',
      'background' : '#FFFFFF',
      'tolerance'  : 0.25,
      'delay'      : 300,
	  'height'     : 200,
      'bottom'	   : 100  
    }
    
    var mousedown       = false;
    var mouseX          = 0;
    var contentLength   = 0;
    var contentCurrent  = 0;
    var xdiff           = 0;
    var containerHeight = 0;
    var containerWidth  = 0;
    
  
    function doResizeContent(listElement){
	    if(parseInt(settings.height) > 0){
		     $(listElement).css('height', settings.height);
		}else {
		     $(listElement).css('height', containerHeight);
		}
        $(listElement).css('width', containerWidth);              
    }
    
    function init(obj, parent, swipeContentHandler){
      
        containerHeight = $(window).height();
        containerWidth  = $(window).width();
        
        
        obj.find('li').each(function(){
            doResizeContent(this);
			contentLength++;
        });
            
        //parent.css('height', containerHeight);
        parent.css('width',  containerWidth);
        
        obj.css('width', contentLength * containerWidth);
        //alert(contentLength * containerWidth);
    }
        
    return this.each(function(){        
     
      var _this = $(this);
     // alert(_this.html());
      if(options) { 
        $.extend(settings, options);
      }
      
      containerHeight = $(window).height();
      containerWidth  = $(window).width();
	  
      _this.wrap('<div class="' + settings.classname + '"/>');
      
      var parent = _this.parent();
     
      parent.css('backgroundColor', settings.background); 
     
      _this.addClass("swipeContentHandler");
      //parent.prepend('<div class="swipeContentHandler"/>');
 
      var swipeContentHandler = _this.parent().find('.swipeContentHandler');
     
      init(_this, parent, swipeContentHandler);
      
     /* $(window).resize(function(){
        init(_this, parent, swipeContentHandler);   
      });
      */
      swipeContentHandler.bind('vmousedown',function(event){
        if(!this.mousedown){
            this.mousedown = true;
            this.mouseX = event.pageX;     
           
        }
        
        return false;
      });
      
      swipeContentHandler.bind('vmousemove',function(event){
        if(this.mousedown){
            xdiff = event.pageX - this.mouseX;
            _this.css('left', -contentCurrent * containerWidth + xdiff);
            
        }
        
        return false; 
      }); 
       
      swipeContentHandler.bind('vmouseup',function(event){
        this.mousedown = false; 
        if(!xdiff) return false;
        
        var fullWidth = parseInt(containerWidth);
        var halfWidth = fullWidth/2;
       
     
        if(-xdiff > halfWidth - fullWidth * settings.tolerance){
        	contentCurrent++;
        	contentCurrent = contentCurrent >= contentLength ? contentLength-1 : contentCurrent; 
            _this.animate({left: -contentCurrent * containerWidth}, settings.delay);
           
        }else if(xdiff > halfWidth - fullWidth * settings.tolerance){
        	contentCurrent--;
        	contentCurrent = contentCurrent < 0 ? 0 : contentCurrent;
            _this.animate({left: -contentCurrent * containerWidth}, settings.delay);  
          
        }else{
            _this.animate({left: -contentCurrent * containerWidth}, settings.delay);
           
        }
        //alert(contentCurrent);
     
        xdiff = 0;
        
    	try {
    		swipecallback(contentCurrent);
			} catch(err) {}
			
        return false; 
      });
      
      swipeContentHandler.bind('vmouseoit',function(event){
         swipeContentHandler.mouseup();
      });
      
    });
    
  };
})(jQuery);