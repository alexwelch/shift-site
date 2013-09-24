(function($) {

  $.fn.instaGrammer = function() {
    $(this).instagram({
      userId: 543154332,
      count: 6,
      accessToken: '543154332.297d5f8.53e1cd11502242e696c014e4b1a2e58d',
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
    $('form#registration_form').registrationForm();
    $('#instagram_feed').instaGrammer();
    $('header h1').height($(window).height()); // set a fixed height pre-animation
    $('body').coordinateScrolling();
  });
})(jQuery);
