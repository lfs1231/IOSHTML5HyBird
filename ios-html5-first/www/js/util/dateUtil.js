
 
 //获取系统时间  
function getSysTime(param){  
    var date = new Date();  
    var sysTime = date.getFullYear() + "-" + (getFormat(date.getMonth()+1)) + "-" +  (getFormat(date.getDate())) + " " + (getFormat(date.getHours())) + ":"+ (getFormat(date.getMinutes())) + ":" + (getFormat(date.getSeconds()));  
    return sysTime;
}  
  
//格式化日期  
function getFormat(time){  
    if(time.toString().length == 1){  
        time = "0"+time  
    }  
    return time;  
}  
  

 //计算时间差  
 function showInterval(begintime_ms,endtime_ms){  
    if(endtime_ms < begintime_ms){
    	return '';
    }
 	
	var timeInternal=endtime_ms-begintime_ms;  //时间差的毫秒数  
	  
	//计算出相差天数  
	var days=Math.floor(timeInternal/(24*3600*1000))  
	   
	//计算出小时数  
	  
	var leave1=timeInternal%(24*3600*1000)    //计算天数后剩余的毫秒数  
	var hours=Math.floor(leave1/(3600*1000))  
	//计算相差分钟数  
	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
	var minutes=Math.floor(leave2/(60*1000))  
	//计算相差秒数  
	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
	var seconds=Math.round(leave3/1000) ;
	
	var returnTimeDesc="";
	if(days > 0){
		returnTimeDesc+=days+"天 ";
	}
	
	if (hours > 0) {
		returnTimeDesc+=hours+"小时 ";
	}
	
	if (minutes > 0) {
		returnTimeDesc+=minutes+"分钟 ";
	}
	
	if(days==0 && hours==0 && minutes==0) {
		returnTimeDesc="刚刚";
	}
	
	return returnTimeDesc;
 }  