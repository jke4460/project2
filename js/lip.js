$(document).ready(function() {
   
	var $visual = $('#slider div ul');
	var liWid = $visual.children().outerWidth(); //357
	var viewNum = 3;
	var totalNum = $visual.children().length; //6
	var moveSize = liWid * viewNum; //1071
	var current = 1;
	var max = Math.ceil(totalNum / viewNum); //2
	console.log(liWid, totalNum, moveSize, max);

	$visual.css("width", totalNum *liWid);

	$('#slider .control button').on('click', function () {
		if ( $visual.is(':animated') ) return false;
		var btnNum = $(this).index();
		console.log(btnNum);

		if (btnNum == 0 && current == 1) return false;
		else if (btnNum == 1 && current == max) return false;

		btnNum == 0? current-- : current++;

		$visual.stop().animate({marginLeft: (current - 1)* -moveSize}, 1000);
	});

	/* bestcolor-accordion */
	var $acco = $('#accordion .colorBox');

	$acco.find('dt').eq(0).addClass('on').children().attr({'aria-disabled':true, 'aria-expended':true}).end().siblings('dt').children().attr({'aria-disabled':false, 'aria-expended':false});

	$acco.find('dt button').on('click', function () {
		var display = $(this).parent().next().css('display');
		console.log(display);

		if (display == 'none') {
			$acco.find('dt.on').removeClass('on').children().attr({'aria-disabled':false, 'aria-expended':false}).end().next().stop().animate({width:0}, function () {
				$(this).css('display', 'none');
			});

			$(this).attr({'aria-diabled':true, 'aria-expended':true}).parent().addClass('on').next().css('display', 'block').stop().animate({width:480})
		}
	});

	/* product */
	var $tab = $('#tab');
	$tab.find('.btnwrap li:first-child').addClass('on').children().attr('aria-selected', true).parent().siblings().children().attr('aria-hidden', false);
	$tab.find('.lipKind').eq(0).css('display', 'block');

	$tab.find('.btnwrap li button').on('click', function () {
		var tgIdx = $(this).parent().index();
		console.log(tgIdx);

		$(this).attr('aria-selected', true).parent().addClass('on').siblings().removeClass('on').children().attr('aria-selected', false);

		$(this).closest('#tab').find('.lipKind').eq(tgIdx).show().attr('aria-hidden', false).siblings('.lipKind').hide().attr('aria-hidden', true);

		var tgPos = $(this).offset().top - 90;
		console.log(tgPos);

		$('html, body').stop().animate({scrollTop:tgPos}, 'slow');

	});
});