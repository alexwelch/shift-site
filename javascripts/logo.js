(function($) {
  $(function(){
    $("#logo").load('images/logo.svg',function(response){
      $(this).addClass("svg-loaded");

      if(!response){
        // failed to load
      }
    });
  });
})(jQuery);
