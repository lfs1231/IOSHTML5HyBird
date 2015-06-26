
/* JavaScript content from js/jquery/iscroll/iscrollutil.js in folder common */
/**
 * 上拉更新页面，下拉加载更多数据
 * 
 * @param {}
 *            $wrapper
 * @return {}
 */
function buildBasicIscroll5($wrapper) {
	myScroll = new IScroll('#wrapper', { mouseWheel: true });
	
	return myScroll;
}