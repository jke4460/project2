$(document).ready(function(){
	/* 캘린더 */
	//var now =new Date(2019,5,30);
	var now =new Date();
	var yy = now.getFullYear();
	var mm = now.getMonth() + 1;
	var dd = now.getDate();
	var nowDate = yy + '-' + mm + '-' + dd;
	console.log(nowDate);

	//현재달의 마지막 날짜 구하기
	//12개월의 마지막 날짜를 배열에 미리 저장
	var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//윤년의 조건을 만족한다면 2월은 28일이 아니라 29일이 된다. 4의배수 &&  100의배수가 아니라면 ||  400의배수라면
	if (  yy%4 == 0 &&  yy%100 != 0 ||  yy%400 == 0) last[1] = 29;
	var lastDate = last[mm-1];     //30
	//console.log(last, lastDate);
	
	$("#datepicker").datepicker({
		dateFormat : "yy-m-d",	//yy:2016, y:16 / mm:05, m:5 / dd:01, d1 보여지는 날짜 형식 변경
		showMonthAfterYear: true,

		monthNames : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],			//월 정식명칭=>반드시 작성
		monthNamesShort : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],	//월 약식명칭

		dayNames : ["일","월","화","수","목","금","토"],			//요일 정식명칭
		dayNamesShort : ["일","월","화","수","목","금","토"],	//요일 약식명칭
		dayNamesMin : ["일","월","화","수","목","금","토"]		//요일 최소명칭(필수)
	});

	//for문을 순회하면서 데이터를 체크 , 날짜 선언  2019.6.5가정
	var sum = 0;		//현재까지 .on의 개수
	var coupon = 0;
	var selectDate = [1,3,4,7,10,12,15,16,18,20,22,25,27,28,30];
	//var selectDate = [1,3,4,6,7,8,9,10,12,15,16,18,20,21,22,23,25,27,28,30]; //19일
	//var selectDate = [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
	for (var i=1; i<dd; i++) {		//1일 부터 오늘 직전까지만 비교 1,2,3,4
		for (var j=0; j<selectDate.length; j++) {		//배열에 담긴 날짜와 비교하기
			if (i == selectDate[j]) {
				sum++;
				//console.log(i, sum);
				$("a.ui-state-default").eq(i-1).addClass('on').append('<span class="blind">출석완료</span>');
				$('#totalTxt').text(sum);		//전체 출석도장 개수
				//전체 쿠폰 개수
				if (sum <= 10) $('#couponTxt').text(Math.floor(sum/5));	
				else if (sum >= 20) $('#couponTxt').text(3);	
			}
		}
	}
	$('a.ui-state-active').append('<span class="blind">출석 도장 찍기</span>');

	//a click
	$("a.ui-state-default").on('click', function () {
		var className = $(this).attr('class');
		//console.log(className);
		//indexOf() 일치하는 문자열이 있는지 인덱스번호를 반환, 만약 없다면 -1
		if (className.indexOf('ui-state-active')>-1) {
			$(this).addClass('on').find('.blind').remove().end().append('<span class="blind">출석완료</span>');
			sum++;
			console.log(sum, lastDate);
			$('#totalTxt').text(sum);	//전체 출석도장 개수에 추가하기
			//전체 쿠폰 개수에 추가하기
			if (sum <= 10) $('#couponTxt').text(Math.floor(sum/5));	
			else if (sum >= 20 && sum < lastDate) $('#couponTxt').text(3);	
			else if (sum == lastDate) $('#couponTxt').text(4);

		}
		return false;
	});

});