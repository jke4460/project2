$(document).ready(function () {
	var $indList = $('#indicator ul li');
	var $cnt = $('#container section');
	var timerResize;

	//동영상 제어
	$('#cnt1 .box').stop().delay(6000).animate({opacity: 0});

	$indList.eq(0).addClass('on')

	$(window).on('resize',function  () {
		clearTimeout(timerResize);

		timerResize = setTimeout(function () {
			var cntHei=$(window).height();
			//console.log($(window).height(), cntHei);
			$cnt.css('height',cntHei);
		}, 10);
	});

	$(window).trigger('resize');

	/* #gnb */
	$('#header #btn_nav').on('click', function() {
		$(this).next().show();
	});
	
	$('#header #hide #btn_close').on('click', function() {
		$(this).parent('#hide').hide();
	});

	var $gnb = $('#hide > #gnb > ul');
	var $dep2 = $gnb.find('>li > ul'); //$gnb.find('li > ul') 여서 #gnb 하위모든 ul로 인식됨

	$dep2.hide();

	$gnb.find('> li > a').on('mouseenter focus', function() {
		$gnb.find('> li.on').removeClass('on').children('ul').hide();
		$(this).next().show().parent().addClass('on');
	});

	$gnb.on('mouseleave', function() {
		$gnb.find('> li.on').removeClass('on').children('ul').hide();
	});
	
	$dep2.find('> li > a').on('mouseenter focus', function() {
		$dep2.find('> li.on').removeClass('on').children('ul').hide();
		$(this).next().show().parent().addClass('on')
	});

	$dep2.on('mouseleave', function() {
		console.log('$dep2 mouseleave');
		$dep2.find('> li.on').removeClass('on').children('ul').hide();
	});


	/* #indicator */
	$indList.children().on('click', function() {
		var tg = $(this).attr('href');
		var tgPos = $(tg).offset().top;
		console.log(tg,tgPos);

		$('html, body').stop().animate({scrollTop: tgPos});
		$(this).parent().addClass('on').siblings().removeClass('on')
		return false;
	});
	//스크롤시 인디케이터 li의 활성화 처리
	$('#btn_nav').addClass('white');
	$(window).on('scroll', function () {
		var scrollT = $(this).scrollTop();
		$indList.children().each(function (idx) {
			if (scrollT >= $cnt.eq(idx).offset().top) $(this).parent().addClass('on').siblings().removeClass('on');
		});

		//주메뉴 열기 버튼 색상 변경도 추가 처리
		if ((scrollT >= $cnt.eq(0).offset().top && scrollT < $cnt.eq(1).offset().top) || (scrollT >= $cnt.eq(3).offset().top && scrollT < $cnt.eq(4).offset().top)) {
			$('#btn_nav').removeClass().addClass('white');
		}else {
			$('#btn_nav').removeClass().addClass('dark');
		}
	});

	/* #cnt4 belleBlack */
	var arr = [];
	for (var i = 1; i<=5;i++){
		arr.push(document.querySelector('#line'+ i).getTotalLength());
	}
	//console.log(arr);
	//b:687, e:500, l:732, l:732, e:500
	
	function overEffect () {
		var $btnEle = $('#cnt4 ul li');

		$btnEle.on({
			focusin : function () {
				$(this).addClass('on');
			},
			focusout : function () {
				$(this).removeClass('on');
			} 
		});
	}

	overEffect ();

	/* #cnt4 Event */
	$('#cnt5 > div').on({
		mouseenter:function () {
			$(this).children('.hidden').addClass('on').parent().addClass('on');
		},
		mouseleave:function () {
			$(this).children('.hidden').removeClass('on').parent().removeClass('on');
		}
	});
});