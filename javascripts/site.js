(function($) {

  $.fn.clickToScroll = function() {
    $(this).click(function(e) {
      e.preventDefault();
      var $targetContainer = $($(e.currentTarget).attr('href'));

      $('html, body').animate({scrollTop: $targetContainer.offset().top - 110});
    });
  }

  $.fn.registrationForm = function() {
    $form = $(this);
    $form.submit(function(e) {
      console.log('do some validations');
    });
  }

  $.fn.instaGrammer = function() {
    $(this).instagram({
      clientId: '0004dbf5e3114fdda0dab4d51426bc3d',
      count: 6
    });

    $('#instagram_feed').on('didLoadInstagram', function(e, response) {
      var $html = $("<ul></ul>");
      $.each(response.data, function(i, item) {
        var titleText = '';
        if (item.caption) {
          titleText = item.caption.text
        }
        $html.append("<li>" +
                     "<a href='" + item.link + "' title='" + titleText + "'>" + 
                     "<img src='" + item.images.low_resolution.url + "' />" +
                     "</a>" +
                     "</li>");
      });
      $(this).html($html);
    });
  }

  function loadAnalytics() {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-44125527-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }

  $(function() {
    loadAnalytics();
    $('header a').clickToScroll();
    $('form#registration_form').registrationForm();
    $('#instagram_feed').instaGrammer();
    $('header h1').height($(window).height()); // set a fixed height pre-animation
    $(window).coordinateScrolling();
  });
})(jQuery);

// use this to get a access token when the site is up
// https://api.instagram.com/oauth/authorize/?client_id=0004dbf5e3114fdda0dab4d51426bc3d&redirect_uri=http://localhost/primal_shift&response_type=code

