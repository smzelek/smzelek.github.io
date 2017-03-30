var MOBILE_SIZE = 768;

function isScrolledPast (el) {
  var rect = el[0].getBoundingClientRect();
  //console.log(el.height());
  return (rect.top < -100);
}

function fontResize() {
  var fontSize = $(".profile").width() * 0.15;
  $(".social-badge>a").css('font-size', fontSize);
}

function floatProfile() {
  var scrollAmt = $(window).scrollTop();
  if (window.innerWidth < MOBILE_SIZE)
    $('.profile').css('margin-top', 0);
  else {
    $('.profile').css('margin-top', $(window).scrollTop());
  }
}

function showSummary() {
  return;
  if (window.innerWidth < MOBILE_SIZE)
  {
    $('.summaryarea').hide();
  }
  else {
    var summary = "";
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $('.bio').find('.section').each(function() {
        summary += $(this).find('.summary').html();
      });
    }
    else {
      $('.bio').find('.section').each(function() {
        if (isScrolledPast($(this)))
        {
          summary += $(this).find('.summary').html();
        }
      });
    }

    $('.summaryarea').html(summary);
    $('.summaryarea').show();
  }
}

$(window).resize(function () {
  showSummary();
  floatProfile();
  fontResize();
});

$(document).ready(function () {
  fontResize();
  showSummary();
});

$(window).scroll(function () {
  showSummary();
  floatProfile();
});
