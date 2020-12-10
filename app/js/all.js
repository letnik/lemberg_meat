jQuery(document).ready(function( $ ) {

    $('.hamburger').on('click', function() {
        $(this).toggleClass('opened');
        $('.nav-humburger').fadeToggle();
    });

});