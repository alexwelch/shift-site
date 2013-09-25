(function($){
  $.ScrollingCoordinator = function(el, options){
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.lastScrollTop = 0;
    base.splashIsShowing = true;
    base.navigating = false;
    base.mobileBreakpoint = 640;

    base.init = function(){
      base.options = $.extend({},$.ScrollingCoordinator.defaultOptions, options);
      base.bindEvents();
    };

    base.bindEvents = function() {
      if ($(window).width() > base.mobileBreakpoint) {
        $(window).on('scroll', base.toggleSplashScreen);
      }
      base.$el.find('header a').on('click', base.handleNavClick);
    };

    base.toggleSplashScreen = function(e) {
      var scrollTop = $(window).scrollTop()

      if (base.isScrollingDown(scrollTop)) {
        if (!base.navigating && base.splashIsShowing && (scrollTop > base.options.scrollFromTopThreshold)) {
          base.hideSplash();
          base.scrollTo($('#about'));
        }
      } else {
        if (scrollTop <= 0) {
          base.showSplash();
        }
      }
    };

    base.handleNavClick = function(e) {
      e.preventDefault();
      base.navigating = true;
      var $targetContainer = $($(e.currentTarget).attr('href'));

      base.hideSplash();
      base.scrollTo($targetContainer, function() {
        base.navigating = false;
      });
    };

    base.scrollTo = function($targetContainer, hollaBack) {
      $('html, body').animate({scrollTop: $targetContainer.offset().top - 110}, 300, hollaBack);
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
