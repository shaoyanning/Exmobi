
$(document).ready(function() {
	
	//点击事件
	$(".subMenu").click(function() {
		$('.subMenu').removeClass("active");
		var index = $('.subMenu').index(this);
		$(this).addClass("active");
		if(index==0){
			var srcselect = "../image/tab_news_press.png";
			var src = "../image/tab_watch_normal.png";
			$('.news_img').attr("src", srcselect);
			$('.watch_img').attr("src", src);
			
		}else{
			var srcselect = "../image/tab_watch_press.png";
			var src = "../image/tab_news_normal.png";
			$('.news_img').attr("src", src);
			$('.watch_img').attr("src", srcselect);
		}
		// content根据点击按钮加载不同的html
		var page = $(this).attr("data-src");
		if (page) {
			$("#content").load(page)
		}
	});
	// 自动点击第一个菜单
	$(".subMenu")[0].click();
});
/*content高度*/
function initSize() {
	var height = $(window).height() - $("header").height() - $("#description").height() - $("#menu").height();
	$("#content").height(height + "px");
}