(function($){
  $.ScrollingCoordinator = function(el, options){
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.lastScrollTop = 0;
    base.splashIsShowing = true;

    base.init = function(){
      base.options = $.extend({},$.ScrollingCoordinator.defaultOptions, options);
      base.bindEvents();
    };

    base.bindEvents = function() {
      $(window).on('scroll', base.toggleSplashScreen);
    };

    base.toggleSplashScreen = function(e) {
      var scrollTop = $(window).scrollTop()

      if (base.isScrollingDown(scrollTop)) {
        if (base.splashIsShowing && (scrollTop > base.options.scrollFromTopThreshold)) {
          base.hideSplash();
          $('nav a:first-child').click();
        }
      } else {
        if (scrollTop <= 0) {
          base.showSplash();
        }
      }
    };

    base.hideSplash = function() {
      $('body').removeClass('splash');
      base.splashIsShowing = false;
    };

    base.showSplash = function() {
      $('body').addClass('splash');
      base.splashIsShowing = true;
    };

    base.isScrollingDown = function(scrollTop) {
      return (scrollTop > base.lastScrollTop);
    };


    base.init();
  };

  $.ScrollingCoordinator.defaultOptions = {
    scrollFromTopThreshold: 30
  };

  $.fn.coordinateScrolling = function(options){
    return this.each(function(){
      (new $.ScrollingCoordinator(this, options));
    });
  };
})(jQuery);
