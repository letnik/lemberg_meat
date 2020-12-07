// animated hamburger
jQuery(document).ready(function( $ ) {
  if(document.documentElement.clientWidth < 993) {
    $('.hamburger').on('click', function() {
      $(this).toggleClass('opened');
      $('#id').fadeToggle();
    });
  }
});

// popup
$(document).ready(function () {

  $('.popup-open').on('click', function() {

    var popUpData = $(this).data('popupName');
      popUpId = document.getElementById(popUpData);

    $(popUpId).fadeIn();
    $(popUpId).addClass('popup-animated');

  });

  $('.popup-close, .popup-close-bg').on('click', function() {

    var popUpData = $(this).data('popupName');
      popUpId = document.getElementById(popUpData);

    $(popUpId).fadeOut();
    $(popUpId).removeClass('popup-animated');

  });

});


// top line add class .active
$(document).ready(function(){

  $(window).scroll(function() {
    winPos = $(window).scrollTop();
    if (winPos >= 80) {
      $('#header').addClass('active');
    }
    else {
      $('#header').removeClass('active');
    }
  });

});


// if LENDING Cache selectors
$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 65
        }, 600, 'swing', function () {
            window.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#header .nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 65 <= scrollPos && refElement.position().top  - 65 + refElement.height() > scrollPos) {
            $('#heder .nav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


// popup + data
$(document).ready(function () {

  $('.popup-data-open').on('click', function() {

    var popUpData = $(this).data('popupName');
      popUpId = document.getElementById(popUpData);

    $(popUpId).fadeIn();
    $(popUpId).addClass('popup-animated');

    var data1         = $(this).find('.data-1').html(),
        data2         = $(this).find('.data-2').html();


    $('.popup-data-content').html(
      '<div class="d-flex jc-center ai-center">\
          <div class="d-block">\
            <div class="d-block">' + data1 + '</div>\
            <div class="d-block">' + data2 + '</div>\
          </div>\
        </div>'
    )

  });

  $('.popup-close, .popup-close-bg').on('click', function() {

    var popUpData = $(this).data('popupName');
      popUpId = document.getElementById(popUpData);

    $(popUpId).fadeOut();
    $(popUpId).removeClass('popup-animated');

  });

});

