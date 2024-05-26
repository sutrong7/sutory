$(function () {
    let $width = $(window).width();
    let $point = 1280;
    if ($width <= $point) {
        $('.gallery_tab').addClass('scroll-x')
    } else {
        return false;
    }

    $(window).resize(function () {
        let $width = $(window).width();
        if ($width <= $point) {
            $('.gallery_tab').addClass('scroll-x')
        } else {
            $('.gallery_tab').removeClass('scroll-x')
        }
    })
});