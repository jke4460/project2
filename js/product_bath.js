var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = [];

$(document).ready(function () {
   /*
		slider
   */ 
  function minislider(tg) {

	var $visual = $(tg + " div ul");
	var $pageEle = $(tg + ' .control .page span');
	var $btn = $(tg + ' .control button');

	var liWid = $visual.children().outerWidth(true); //200 li 하나 크기
	var viewNum = 4; //한번에 보여질 li 개수
	var totalNum = $visual.children().length; //8
	var moveSize = liWid * viewNum; //200x4 = 800
	var current = 1;
	var max = Math.ceil(totalNum / viewNum); //올림하여 정수로 반환 4
	//console.log(liWid, totalNum, moveSize, max);

	/* 버튼 클릭전 초기화 컨텐츠 */
	$visual.css("width", totalNum * liWid);
	$pageEle.first().text(current); //1
	$pageEle.last().text(max); //5

	console.log(tg);
	/* 이전버튼과 다음버튼을 클릭하는 이벤트를 한번에 선언 */
	$btn.on('click', function () {
	  //1-1) 동작이 실행되지 않고 멈추어야 하는 케이스 제어
	  if ($visual.is(':animated')) return false;

	  //1-2) 이전버튼은 가장 처음(if), 다음버튼은 가장 마직막에서 멈추기(else if)
	  var btnNum = $(this).index();
	  // console.log(btnNum);    //0:이전, 1:다음

	  if (btnNum == 0 && current == 1) return false;
	  else if (btnNum == 1 && current == max) return false;

	  //2) current 변수를 이전버튼은 1씩 감소, 다음버튼은 1씩 증가
	  /* 
	  삼항조건연산자 : 조건식의 결과가 참 또는 거짓일때 각각 다른 실행문을 수행시킨다
	  조건식? 실행문1 : 실행문2;
	  조건식이 참일 경우 실행문1 수행
	  조건식이 거짓일 경우 실행문2 수행
	  */
	  btnNum == 0 ? current-- : current++;

	  //3) 현재페이지 텍스트 변경
	  $pageEle.first().text(current);

	  //4) $visual을 animate()
	  $visual.stop().animate({
		marginLeft: (current - 1) * -moveSize
	  }, 1000);
	});
  }

  minislider('#slider1');
  minislider('#slider2');
  minislider('#slider3');

  /*
	#uppercut에 bubble 생성
  */
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	$('#container').width(WIDTH).height(HEIGHT);
	canvas = document.getElementById('demo');
	$(canvas).attr('width', WIDTH).attr('height', HEIGHT);
	con = canvas.getContext('2d');
	for (var i = 0; i < 100; i++) {
		pxs[i] = new Circle();
		pxs[i].reset();
	}
	setInterval(draw, 60);
});

function draw() {
  con.clearRect(0, 0, WIDTH, HEIGHT);
  for (var i = 0; i < pxs.length; i++) {
	pxs[i].fade();
	pxs[i].move();
	pxs[i].draw();
  }
}

function Circle() {
  this.s = {
	ttl: 8000,
	xmax: 3,
	ymax: 2,
	rmax: 200,
	rt: 1,
	xdef: 960,
	ydef: 540,
	xdrift: 2,
	ydrift: 2,
	random: true,
	blink: true
  };

  // fill vars
  var crFill = [
	['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)'],
	['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)'],
	['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)'],
	['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)']
  ];

  // opacity var
  var opacityFill = "." + Math.floor(Math.random() * 5) + 1;

  this.reset = function () {
	this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
	this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
	this.r = ((this.s.rmax - 1) * Math.random()) + 1;
	this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
	this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);
	this.hl = (this.s.ttl / 60) * (this.r / this.s.rmax);
	this.rt = Math.random() * this.hl;
	this.s.rt = Math.random() + 1;
	this.stop = Math.random() * 0.2 + 0.4;
	this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
	this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
	this.opacityFill = opacityFill;

	this.currentColor = Math.floor(Math.random() * crFill.length);
  };

  this.fade = function () {
	this.rt += this.s.rt;
  };

  this.draw = function () {
	if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
	  this.s.rt = this.s.rt * -1;
	} else if (this.rt >= this.hl) {
	  this.reset();
	}
	con.beginPath();
	con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
	con.globalAlpha = opacityFill;
	var newo = 1 - (this.rt / this.hl);
	var cr = this.r * newo;

	gradient = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
	gradient.addColorStop(0.0, crFill[(this.currentColor)][1]);
	gradient.addColorStop(0.7, crFill[(this.currentColor)][1]);
	gradient.addColorStop(1.0, crFill[(this.currentColor)][0]);

	con.fillStyle = gradient;
	con.fill();

	con.closePath();
  };

  this.move = function () {
	this.x += (this.rt / this.hl) * this.dx;
	this.y += (this.rt / this.hl) * this.dy;
	if (this.x > WIDTH || this.x < 0) {
	  this.dx *= -1;
	}
	if (this.y > HEIGHT || this.y < 0) {
	  this.dy *= -1;
	}
  };

  this.getX = function () {
	return this.x;
  };
  this.getY = function () {
	return this.y;
  };
}

/*
	
*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
	'.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();