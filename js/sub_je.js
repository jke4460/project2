$(document).ready(function() {
    /* ============== 공통 ============== */
    var scrollT;
    var timer = 0;
  
    var $starB = $('#bestCnt2 > div > .review_sum > div');
    var $starR = $('#reviewCnt4 > div > #reviewList > tbody > .row > td');
    
    $starB.each(function() {
        if ($(this).children().hasClass('four')) $(this).find('> div > span').text('별점 5점 중 4점');
        else if ($(this).children().hasClass('three')) $(this).find('> div > span').text('별점 5점 중 3점');
        else if ($(this).children().hasClass('two')) $(this).find('> div > span').text('별점 5점 중 2점');
        else if ($(this).children().hasClass('one')) $(this).find('> div > span').text('별점 5점 중 1점');
        else $(this).find('> div > span').text('별점 5점 만점');
    });

    $starR.each(function() {
        if ($(this).children().hasClass('four')) $(this).find('> div > span').text('별점 5점 중 4점');
        else if ($(this).children().hasClass('three')) $(this).find('> div > span').text('별점 5점 중 3점');
        else if ($(this).children().hasClass('two')) $(this).find('> div > span').text('별점 5점 중 2점');
        else if ($(this).children().hasClass('one')) $(this).find('> div > span').text('별점 5점 중 1점');
        else $(this).find('> div > span').text('별점 5점 만점');
    });

    $(window).on('scroll', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            scrollT = $(this).scrollTop();
            //console.log(scrollT);
            
            $('#bestCnt1 .fade').each(function() {
              //console.log($(this).offset().top);
                if (scrollT > $(this).offset().top - 1000) $(this).addClass('on');
                else $(this).removeClass('on');
            });
            $('.fade').each(function() {
                // 4) if (), else : 스크롤바가 움직인 거리와 자기자신의 수직 전역 위치를 비교 => addClass(), removeClass()
                //console.log($(this).offset().top);
                  if (scrollT > $(this).offset().top - 500) $(this).addClass('on');
                  else $(this).removeClass('on');
              });
        }, 100);
    });

    /* ============== brand.html ============== */
    var $btnIntro = $('#brandCnt4 .btn_intro');
    var $introPg = $('#brandCnt4 #introPg');
    var viewNum = 0;			//0,1,2,3
    var nextNum;
    var $pgTg;
        
    $btnIntro.children().on('mouseenter focus', function() {
        btnIntroNum = $(this).index();
        //console.log(btnIntroNum);
        if (btnIntroNum == 0) $(this).find('> img').attr({src: '../images/brand/logo_white_g.png'}).parent().next().find('> img').attr({src: '../images/brand/logo_black_b.png'});
        else if (btnIntroNum == 1) $(this).find('> img').attr({src: '../images/brand/logo_black_w.png'}).parent().prev().find('> img').attr({src: '../images/brand/logo_white_w.png'});
    });

    $btnIntro.children().on('mouseleave', function() {
        btnIntroNum = $(this).index();

        if (btnIntroNum == 0) $(this).find('> img').attr({src: '../images/brand/logo_white_w.png'});
        else if (btnIntroNum == 1) $(this).find('> img').attr({src: '../images/brand/logo_black_b.png'});
    });

    $btnIntro.children().on('click', function() {
        $pgTg = $introPg.children().eq($(this).index());
        //console.log($(this).index(), $pgTg); //0 => #whitePg, 1 => #blackPg

        if ($(this).index() == 0) $(this).parent().next().find('> #whitePg').show().siblings().hide();
        else if ($(this).index() == 1) $(this).parent().next().find('> #blackPg').show().siblings().hide();

        $pgTg.find('.bgbox div').eq(0).css({opacity: 0, filter: 'Alpha(opacity=0)'}).animate({opacity: 1, filter: 'Alpha(opacity=100)'}, 1000);

        $('html, body').stop().animate({scrollTop: $(this).parent().next().offset().top - 50}, 500)
    });

    $introPg.on('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();
        var wheelNum = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
        //console.log(wheelNum); //음수:down, 양수:up

        if ( $pgTg.find('.bgbox div').is(':animated') ) return false;

        if (wheelNum < 0) {
            if (viewNum < 3) {
                nextNum = viewNum+1;
                txtMove ();
            }
            else if (viewNum == 3) {			
                $('html, body').stop().animate({scrollTop: $('#brandCnt5').offset().top});
            }
        }
        
        else if (wheelNum > 0) {
                if (viewNum > 0) {
                    nextNum = viewNum-1;
                    txtMove ();
                }
                else if (viewNum == 0) {
                    $('html, body').stop().animate({scrollTop: $('#brandCnt4').offset().top - 90});
                }
        };

        function txtMove () {
            $pgTg.find('.bgbox div').eq(viewNum).css({display: 'block', top: 0}).stop().animate({top: -100,opacity: 0, filter: 'Alpha(opacity=0)'}, 600, function  () {
                $(this).css({display: 'none'});
                viewNum = nextNum;
                $pgTg.find('.bgbox div').eq(viewNum).css({display: 'block', top: 100}).stop().animate({top: 0,opacity: 1, filter: 'Alpha(opacity=100)'}, 600);
            });
        };
    });

    /* ============== review.html ============== */
    //#reviewCnt2 #cosTab
    var $reviewTab = $('#cosTab .btn_tab1');
    var $btnTab = $reviewTab.find('> li > ul');
    
    $btnTab.hide();
    
    $reviewTab.find('> li > button').on('mouseenter focus', function() {
        $reviewTab.find('> li.on').removeClass('on').children('ul').hide();
        $(this).next().show().parent().addClass('on');
    });

    $reviewTab.on('mouseleave', function() {
        $reviewTab.find('li.on').removeClass('on').children('ul').hide();
    });

    $btnTab.find('> li > button').on('mouseenter focus', function() {
        $(this).parent().addClass('on');
    });

    $btnTab.children().on('mouseleave', function() {
        $btnTab.find('> li.on').removeClass('on');
    });

    //#reviewCnt2 #cosSlider
    var $ctg = $('#cosSlider .slider_wrap ul');
    var liWid = $ctg.children().outerWidth();		//li 하나의 너비 :  266
    var totalNum = $ctg.children().length;			//전체 li 개수
    var current = 1;		//지금 보여지는 슬라이더 번호
	var tgIdx = 6;			//All이 먼저 선택	

	var partNum = new Array($ctg.length);
    for (var i = 0; i < $ctg.length; i++) {
        partNum[i] = $ctg.eq(i).children().length;
        $ctg.eq(i).css({width: partNum[i] * liWid});
    };
	partNum.push(totalNum);		//All에서 추출한 totalNum 변수값을 배열의 마지막에 추가 저장, html 에서 All버튼에  data-tgindex="6" 삽입
    //console.log(partNum); //(7) [3, 4, 6, 4, 4, 2, 23]

	//초기설정
    $('#cosSlider .slider_wrap').css({width:totalNum * liWid});		//최초 로딩시 div.slider_wrap의 너비
	$('#cosTab > ul > li.btn_line1').addClass('on');							//All 버튼 초기활성화

	//탭버튼 클릭시 .slider_wrap 배치시키기
    $btnTab.find('> li > button').add('#tab11').on('click', function() {
		current = 1; //다른 탭을 클릭하였다면 current 값이 변경되어 있으므로 다시 초기화
        tgIdx = $(this).data('tgindex');
        console.log(tgIdx);
		$('#cosSlider .slider_wrap').css({width: partNum[tgIdx]* liWid}).stop().animate({marginLeft: 0});
		if (tgIdx == 6) $ctg.show();
        else $ctg.eq(tgIdx).show().siblings().hide();
    });

	//이전과 다음버튼 클릭시
    $('#reviewCnt2 .control button').on('click', function() {
        if ($('#cosSlider .slider_wrap').is(':animated')) return false;

        var btnNum = $(this).index();
        //console.log(btnNum, Math.ceil(partNum[tgIdx] / 4), current);

        if (btnNum == 0 && current <= 1) return false;
        else if (btnNum == 1 && current >= Math.ceil(partNum[tgIdx] / 4)) return false;

        btnNum == 0? current-- : current++;
        $('#cosSlider .slider_wrap').stop().animate({marginLeft: -1064 * (current - 1)}, 1000);
    });




    $ctg.find('.eye2').addClass('on').children().attr('aria-selected', true).parent().siblings().children().attr('aria-selected', false).parents('ul').siblings().find('> li > button').attr('aria-selected', false);
    $('.cntwrap > #eye2').show().attr('aria-hidden', false).siblings().hide().attr('aria-hidden', true);

    $ctg.find('> li > button').on('click', function() {
        var ctgIdx = $(this).parent().index();
        console.log(ctgIdx);

        $(this).attr('aria-selected', true).parent().addClass('on').siblings().removeClass('on').children().attr('aria-selected', false);

        $(this).parents('#reviewCnt2').next('.cntwrap').children().eq(ctgIdx).show().attr('aria-hidden', false).siblings().hide().attr('aria-hidden', true);
    });
    
    //#reviewCnt3 
    function modal () {
        //모달 열기 클릭 이벤트
        $('.cntwrap > div > .review_cnt3 > .photo_list > li > .open_btn').on('click', function (e) {
            e.preventDefault();
            
            //모달 닫기를 클릭한 경우 보내질 포커스를 변수에 저장
            var $tg = $(this);
            var $modalCnt = $( $(this).attr('href') );		//#modal1 => $('#modal1')
            var $closeBtn = $modalCnt.find('.close_btn');
            //console.log($modalCnt);

            //1) 마스크만 동적생성 => 생성위치 변경:모달 바로 앞 형제
            $modalCnt.before('<div class="mask"></div>');
            
            //2) 열려진 브라우저 가운데 모달이 위치하도록 좌표지정
            $(window).on('resize', function () {
                var topPos = ($(this).height() - $modalCnt.outerHeight())/2;
                var leftPos = ($(this).width() - $modalCnt.outerWidth())/2;
                console.log(topPos, leftPos);
                $modalCnt.css({top: topPos, left:leftPos});
            });
            $(window).trigger('resize');
            
            var $mask = $('.mask');
            
            //3) #mask, .modal_cnt를 눈에 보여지게 처리
            $mask.add($modalCnt).stop().fadeIn('fast');
            
            /* 모달 닫기 이벤트 : 마스크와 모달은 서서히 사라지기 
            완료함수 => .mask remove, 모달 tabIndex제거, 열기 버튼으로 포커스 되돌려주기
            display:none prev(), next()로 선택이 X
            */
            $closeBtn.on('click', function () {
                $mask.add($modalCnt).stop().fadeOut('fast', function () {
                    $mask.remove();
                    $tg.focus();
                });
            });
            
            $mask.on('click', function () {
                $closeBtn.click();
            });	
            
            /* 포커스가 모달 밖으로 위치하면 사용자의 편의성을 위해 모달 닫기 => 처리 안함 
            대신 첫번째 영역에서 shift+tab을 누르면 모달의 마지막으로 포커스를 보내고
            마지막 영역에서 tab을 누르면 모달의 처음으로 포커스를 되돌려 순환하게 한다 = > 닫기를 누르기 전에는 포커스를 밖으로 나가게 하지 않는다
            */
            
            //esc 키를 누르면 모달 닫기
            $(window).on('keydown', function (e) {
                if (e.keyCode==27) $closeBtn.click();
            });
        });
    };
    modal ();
});