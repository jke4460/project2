$(document).ready(function() {
	/* 슬라이더 */
	var $slider = $('#mainslider');
	var $visEle = $slider.find('> .visual > li');
	var $indiEle = $slider.find('> .indicator > li');
	var current = 0;
	var nextNum;
	var timer;

	$indiEle.eq(0).addClass('on');
	$slider.find('.play_stop .play').hide();

	$indiEle.children().on('click', function  (e) {
		e.preventDefault();
		nextNum = $(this).parent().index();
		console.log(nextNum);

		clearInterval(timer);
		if (current == nextNum) return false;
		
		active ();
	});

	function active () {
		$indiEle.eq(nextNum).addClass('on').siblings().removeClass('on');

		$visEle.eq(current).css('left', 0).stop().animate({left: '-100%'});
		$visEle.eq(nextNum).css('left', '100%').stop().animate({left: 0});

		current = nextNum;
	}
	
	function playTimer () {
		timer = setInterval(function () {
			nextNum = current + 1;  //증감연산을 작성하면 오류, 현재 nextNum의 값은 0,1,2
			if (nextNum == 3) nextNum = 0;

			//.indicator li에 .on 제어, .visual li animate()
			active ();
			}, 3000);
		}
	playTimer ();


	$slider.find('.prev_next button').on('click', function () {
		var btnNum = $(this).index();
		console.log(btnNum);

		btnNum == 0? nextNum = current -1 : nextNum = current + 1;
		if (nextNum == -1) nextNum = 2;
		else if (nextNum == 3) nextNum = 0;

		$indiEle.eq(nextNum).children().click();
	});

	$slider.find('.play_stop button').on('click', function () {
		var btnNum = $(this).index();
		console.log(btnNum);

		btnNum == 0? playTimer () : clearInterval(timer);

		$(this).hide().siblings().show();
	});


	$slider.find('[data-link="first"], [data-link="last"]').on('blur', function () {
		setTimeout(function () {
			if (!$slider.find('a, button').is(':focus')) playTimer();
		}, 10);
	});

	/* fade */
	var scrollT;
	var Mtimer = 0;

	$(window).on('scroll', function () {
		clearTimeout(Mtimer);

		Mtimer = setTimeout(function () {
		scrollT = $(this).scrollTop();
		console.log(scrollT);

		$('.fade').each(function () {
			if (scrollT > $(this).offset().top-500) $(this).stop().animate({opacity: 1, filter: 'Alpha(opacity=100)', top: 0});
			else $(this).stop().animate({opacity: 0, filter: 'Alpha(opacity=0)', top: 20});
			
		});
		
		}, 100);
		
	});
	
});