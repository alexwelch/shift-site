(function($) {

  $.fn.clickToScroll = function() {
    $(this).click(function(e) {
      e.preventDefault();
      var $targetContainer = $($(e.currentTarget).attr('href'));

      $('html, body').animate({scrollTop: $targetContainer.offset().top - 20});
    });
  }

  $.fn.registrationForm = function() {
    $form = $(this);
    $form.submit(function(e) {
      console.log('do some validations');
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
  });
})(jQuery);
