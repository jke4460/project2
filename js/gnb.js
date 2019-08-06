$(document).ready(function() {
    var $gnb = $('#gnb > ul');
    var dep1 = $('body').data('dep-one') -1;
    var dep2 = $('body').data('dep-two') -1;
    var $lang = $('#gnb').next('.lang').find('ul');
    console.log(dep1,dep2);

    $gnb.find('> li > div').hide();


    $gnb.find('> li > a').on('mouseenter focus', function() {
        $gnb.find('> li.on').removeClass('on').children('div').hide();
        $(this).next().show().parent().addClass('on');
    });

    $gnb.on('mouseleave', function() {
        $gnb.find('> li.on').removeClass('on').children('div').hide();
        if (dep1 >= 0) $gnb.children().eq(dep1).addClass('on').find('div ul li').eq(dep2).addClass('on');
    });

    $gnb.find('a:first, a:last').on('blur', function() {
        setTimeout(function () {
            if ( !$gnb.find('a').is(':focus') ) $gnb.trigger('mouseleave');
        }, )
    });

    $gnb.trigger('mouseleave');

    var timer = 0;
    $(window).on('scroll', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            if( $(this).scrollTop() >= 50) $('#header').addClass('scroll');
            else $('#header').removeClass('scroll');
        })
    });
});