$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() == 0) {
            $('#nav-floater').fadeIn(200);
            $('.navbar').removeClass('mini-nav');
        } else {
            $('#nav-floater').fadeOut(200);
            if ($(window).innerWidth() >= 768) {
                $('.navbar').addClass('mini-nav');
            }
        }
    });
    $('.menu-toggle').on('click', function () {
        if ($('#mobile-nav').hasClass('open')) {
            $('.menu-toggle').removeClass('open');
            $('#mobile-nav').removeClass('open');
        } else {
            $('.menu-toggle').addClass('open');
            $('#mobile-nav').addClass('open');
        }
    });
    $('#tools-btn').on('click', function () {
        $(this).toggleClass('open');
        $('.tools-list').slideToggle(200);
    });
    $('#connect-btn').on('click', function () {
        $(this).toggleClass('open');
        $('.connect-list').slideToggle(200);
    });
});
