(function($){
  $.RegistrationForm = function(el, options){
    var base = this;
    base.$el = $(el);
    base.el = el;

    base.init = function(){
      base.options = $.extend({},$.RegistrationForm.defaultOptions, options);
      base.bindEvents();
    };

    base.bindEvents = function() {
      base.$el.on('submit', base.handleSubmit);
      base.$el.on('blur', 'input, select', base.checkForErrors);
    };

    base.handleSubmit = function(e) {
      e.preventDefault();
      if (base.isValid()) {
        base.$el.submit();
        base.displaySuccessMessage();
      }
    };

    base.checkForErrors = function(e) {
      var $target = $(e.currentTarget);
      switch ($target.attr('name')) {
        case 'name':
          base.validateName($target);
          break;
        case 'email':
          base.validateEmail($target);
          break;
        case 'count':
          base.validateCount($target);
          break;
        default:
          console.log('no error input to check');
      }
    };


    base.checkEmailFormat = function(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    base.validateEmail = function($input) {
      if (base.checkEmailFormat($input.val())) {
        base.markFieldAsValid($input);
      } else {
        base.markFieldAsInvalid($input);
      }
    };

    base.validateCount = function($input) {
      console.log('count');
      var val = $input.val();
      if (!!val && parseInt(val)) {
        base.markFieldAsValid($input);
      } else {
        base.markFieldAsInvalid($input);
      }
    };

    base.validateName = function($input) {
      if ($input.val().length > 0) {
        base.markFieldAsValid($input);
      } else {
        base.markFieldAsInvalid($input);
      }
    };

    base.markFieldAsInvalid = function($input) {
      $input.addClass('invalid');
      // $input.next('.error-explanation').text('you must enter a name');
    }

    base.markFieldAsValid = function($input) {
      $input.removeClass('invalid');
    }

    base.displaySuccessMessage = function() {
      console.log('good job');
    };

    base.isValid = function() {

    };

    base.init();
  };

  $.RegistrationForm.defaultOptions = {
  };

  $.fn.registrationForm = function(options){
    return this.each(function(){
      (new $.RegistrationForm(this, options));
    });
  };
})(jQuery);
