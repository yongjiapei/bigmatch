
$(function() {
	
	if($(window).width() > 950){
		Pc();
	}
	if($(window).width() > 768){
		Pb();
	}else{
		Wap();
	}
	
	function Pc(){
		$("#slider2").slider({
			width: 480, // width
			height: 50, // height
			sliderBg: "#222730", // 滑块背景颜色
			color: "#c4c4c4", // 文字颜色
			fontSize: 18, // 文字大小
			bgColor: "#fff", // 背景颜色
			textMsg: "请按住滑块，拖动到最右边", // 提示文字
			successMsg: "验证通过", // 验证成功提示文字
			successColor: "#10C0BC", // 滑块验证成功提示文字颜色
			time: 400, // 返回时间
			callback: function(result) { // 回调函数，true(成功),false(失败)
				//$("#result2").text(result);
				$(".ui-slider-text").css("background","none")
				$(".ui-slider-text").css("z-index","2")
                getNewCode();
			}
		});
		$('.ui-slider-btn').append('<i class="rightRow"></i>');
	}
	
	function Pb(){
		$("#slider2").slider({
			width: 680, // width
			height: 50, // height
			sliderBg: "#222730", // 滑块背景颜色
			color: "#c4c4c4", // 文字颜色
			fontSize: 18, // 文字大小
			bgColor: "#fff", // 背景颜色
			textMsg: "请按住滑块，拖动到最右边", // 提示文字
			successMsg: "验证通过", // 验证成功提示文字
			successColor: "#10C0BC", // 滑块验证成功提示文字颜色
			time: 400, // 返回时间
			callback: function(result) { // 回调函数，true(成功),false(失败)
				$(".ui-slider-text").css("background","none")
				$(".ui-slider-text").css("z-index","2")
                getNewCode();
			}
		});
		$('.ui-slider-btn').append('<i class="rightRow"></i>');
	}
	
	function Wap(){
		$("#slider2").slider({
			width: 280, // width
			height: 50, // height
			sliderBg: "#222730", // 滑块背景颜色
			color: "#c4c4c4", // 文字颜色
			fontSize: 18, // 文字大小
			bgColor: "#fff", // 背景颜色
			textMsg: "请按住滑块，拖动到最右边", // 提示文字
			successMsg: "验证通过", // 验证成功提示文字
			successColor: "#10C0BC", // 滑块验证成功提示文字颜色
			time: 400, // 返回时间
			callback: function(result) { // 回调函数，true(成功),false(失败)
				$(".ui-slider-text").css("background","none")
				$(".ui-slider-text").css("z-index","2")
                getNewCode();
			}
		});
		$('.ui-slider-btn').append('<i class="rightRow"></i>');
	}
	
})