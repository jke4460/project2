$(document).ready(function () {
	var $store = $('#store > .area');
	var $sidoEle = $('#sidoList li');
	var tgIdx;
	var imgSrc;
	var once = true;
	var choice2Txt;
	var dep2_arry = new Array(17);

	dep2_arry[0] = ['강릉시', '동해시', '삼척시', '속초시', '원주시', '태백시'];
	dep2_arry[1] = ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '여주시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'];
	dep2_arry[2] = ['거제시', '김해시', '밀양시', '사천시', '양산시', '진주시', '창원시', '통영시'];
	dep2_arry[3] = ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '포항시'];
	dep2_arry[4] = ['광산구', '남구', '동구', '북구', '서구'];
	dep2_arry[5] = ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'];
	dep2_arry[6] = ['대덕구', '동구', '서구', '유성구', '중구'];
	dep2_arry[7] = ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'];
	dep2_arry[8] = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
	dep2_arry[9] = [];
	dep2_arry[10] = ['남구', '동구', '북구', '울주군', '중구'];
	dep2_arry[11] = ['강화군', '계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구'];
	dep2_arry[12] = ['광양시', '나주시', '목포시', '순천시', '여수시'];
	dep2_arry[13] = ['군산시', '김제시', '남원시', '익산시', '전주시', '정읍시'];
	dep2_arry[14] = ['서귀포시', '제주시'];
	dep2_arry[15] = ['계룡시', '공주시', '논산시', '당진시', '보령시', '서산시', '아산시', '천안시'];
	dep2_arry[16] = ['제천시', '청주시', '충주시'];

	$store.find('.map map area').on({
		mouseenter:function () {
			tgIdx = $(this).data('num');
			if (once) changeMap();
		},
		click:function (e) {
			e.preventDefault();
			once = false;
			$sidoEle.eq(tgIdx).addClass('on').siblings().removeClass('on');
			changeMap();
			changeCity2();
		}
	});
	$sidoEle.find('a').on('click', function (e) {
		e.preventDefault();
		tgIdx = $(this).parent().index();
		$sidoEle.eq(tgIdx).addClass('on').siblings().removeClass('on');
		changeMap();
		changeCity2();
	});
	function changeMap () {
		imgSrc = '../images/customer/map' + tgIdx + '.jpg';
		//console.log(imgSrc);
		$store.find('.map img').attr({src:imgSrc});
	};
	function changeCity2 () {
		choice2Txt = '';
		choice2Txt += '<ul>';
		for (var i= 0; i < dep2_arry[tgIdx].length;i++) {
			choice2Txt += '<li>';
			choice2Txt += '<a href="">' +dep2_arry[tgIdx][i] + '</a>';
			choice2Txt += '</li>';
		} 
		choice2Txt += '</ul>';
		//console.log(choice2Txt);
		$store.find('.choice2').html(choice2Txt);
	};
	$(document).on('click','#store .choice2 ul li a',function (e) {
		e.preventDefault();
	});
});