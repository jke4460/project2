$(document).ready(function () {
	function modal () {
		//모달 열기 클릭 이벤트
		$('#content #slider .open_btn').on('click', function (e) {
			e.preventDefault();
			
			//모달 닫기를 클릭한 경우 보내질 포커스를 변수에 저장
			var $tg = $(this);
			var $modalCnt = $( $(this).attr('href') );		//#modal1 => $('#modal1')
			var $closeBtn = $modalCnt.find('.close_btn');
		
			//1) 마스크만 동적생성 => 생성위치 변경:모달 바로 앞 형제
			$modalCnt.before('<div id="mask"></div>');
			
			//2) 열려진 브라우저 가운데 모달이 위치하도록 좌표지정
			$(window).on('resize', function () {
				var topPos = ($(this).height() - $modalCnt.outerHeight())/2;
				var leftPos = ($(this).width() - $modalCnt.outerWidth())/2;
				
				$modalCnt.css({top: topPos, left:leftPos});
			});
			$(window).trigger('resize');
			
			var $mask = $('#mask');
			
			//3) #mask, .modal_cnt를 눈에 보여지게 처리
			$mask.add($modalCnt).stop().fadeIn('fast');
			
			//4) 상세모달로 포커스 강제 이동
			$closeBtn.focus();
			
			/* 모달 닫기 이벤트 : 마스크와 모달은 서서히 사라지기 
			완료함수 => #mask remove, 모달 tabIndex제거, 열기 버튼으로 포커스 되돌려주기
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
			
			$closeBtn.on("keydown", function (e) {
				if (e.keyCode==9 && e.shiftKey || e.keyCode==9 && !e.shiftKey) {
					e.preventDefault();		//포커스 이동을 우선 막고 원하는 엘리먼트를 찾아 하단에서 포커스 이동시키기
					$(this).focus();
				}
			});


			//esc 키를 누르면 모달 닫기
			$(window).on('keydown', function (e) {
				if (e.keyCode==27) $closeBtn.click();
			});

		});

	}
	modal ();

	
});










