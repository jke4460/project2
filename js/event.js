$(document).ready(function () {
	/* 슬라이더 제어 */
	var $slider = $('#mainslider');
	var $visEle = $slider.find('> .visual li');
	var $indiEle = $slider.find('> .indicator li');
	var currentNum = 0;
	var nextNum;
	var sliderTimer;
	$indiEle.eq(0).addClass('on');
	$slider.find('.play_stop .play').hide();
	/* 인디케이터제어 */
	$indiEle.children().on('click', function (e) {
		
		e.preventDefault();
		nextNum = $(this).parent().index();
	   //console.log(nextNum);

	   clearInterval(sliderTimer);
	   $slider.find('.play_stop .play').show().siblings().hide();
	   if(currentNum == nextNum) return false;

	   active ();
	});

	function active(){
		$indiEle.eq(nextNum).addClass('on').siblings().removeClass('on');
		$visEle.eq(currentNum).css('left', 0).stop().animate({left:'-100%'});
		$visEle.eq(nextNum).css('left', '100%').stop().animate({left:0});

		currentNum = nextNum;
	}
	function playTimer (){
		sliderTimer = setInterval(function () {
			nextNum = currentNum +1;
			if (nextNum ==3) nextNum =0;
			active();
		},3000)
	}
	playTimer();
	/* 다음, 이전 버튼 */
	$slider.find('.prev_next button').on('click', function () {
		var btnNum = $(this).index();

		btnNum == 0? nextNum = currentNum - 1 : nextNum = currentNum + 1;
		console.log(btnNum, nextNum, currentNum);
		if (nextNum == -1) nextNum = 2;
		else if (nextNum == 3) nextNum = 0;
		$indiEle.eq(nextNum).children().click();
	});
	/* 시작, 멈춤버튼 */
	$slider.find('.play_stop button').on('click',  function () {
		var btnNum = $(this).index();

		btnNum == 0? playTimer () : clearInterval(sliderTimer);
		$(this).hide().siblings().show();
	});
	/* 구매하기 호버시, 위치 제어 */
	var $whiteEle = $('#content .white_pr ul');

	$whiteEle.find("button").on({
		mouseenter:function () {
			$(this).closest('li').addClass('on');
		},
		mouseleave:function () {
			$(this).closest('li').removeClass('on');
		}
	
	});
	var $product= $('#product ');
	var $proEle = $product.find('> ul li') ;
	$proEle.find('a').on({
		mouseenter:function () {
			$(this).parent().addClass('on');
		},
		mouseleave:function() {
			$(this).parent().removeClass('on');
		}
	});
});