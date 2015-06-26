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