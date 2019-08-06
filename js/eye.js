$(document).ready(function () {
	var $visual = $('#slider ul');
	var liWid = $visual.children().outerWidth(true); //li 하나 넓이 280
	var viewNum = 4;
	var totalNum = $visual.children().length; //8
	var moveSize = liWid * viewNum; 
	var max = Math.ceil(totalNum / viewNum);
	var $eyeEle = $('#box1 ul');
	var $eyeEle2 = $('#box2 ul');
	var $browEle = $('#brow_button li');
	var current = 1;
	/* 배경이미지바꾸기 */
	$browEle.find('a').on('click', function () {
		var tg = $(this).parent().index()+1;
		$(this).parents('#brow2').removeClass().addClass('bg' + tg);
		//console.log(tg);
		return false;
	});
		var $win = $(window);
		var $fade =$('.fade');
		var timer = 0;

		//(스크롤시)fade in, right, left
		$win.on('scroll', function () {
			var scrollT =$(this).scrollTop();
			clearTimeout(timer);                
			timer = setTimeout(function () {
				$fade.each(function () {

					if(scrollT > $(this).offset().top-600) $(this).addClass('on');
					else $(this).removeClass('on');
			});
			}, 100);
			
		});

	/* eyeline호버 */
	$eyeEle.find('img').on({
		mouseenter:function () {
			$(this).addClass('on');
		},
		mouseleave:function () {
			$(this).removeClass('on');
		}
	});
	$eyeEle2.find('img').on({
		mouseenter:function () {
			$(this).addClass('on');
		},
		mouseleave:function () {
			$(this).removeClass('on');
		}
	});
	/* 이전버튼 클릭 */
	$('#slider #prev').on('click', function () {
		if ($visual.is(":animated")) return false;
		current--;
		if(current <1) current = max;
		$visual.stop().animate({left:(current-1) * -moveSize}, 1000);
	});
	/* 다음 버튼 클릭 */
	$('#slider #next').on('click', function () {
		//alert();
		if($visual.is(':animated')) return false;
		current ++;
		if(current > max) current =1;
		$visual.stop().animate({left:(current-1) * -moveSize}, 1000);
	});
});