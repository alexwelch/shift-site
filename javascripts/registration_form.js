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
      base.$el.on('change', 'input, select', base.checkForErrors);
    };

    base.handleSubmit = function(e) {
      if (base.isValid()) {
        base.displaySuccessMessage();
      } else {
        e.preventDefault();
      }
    };

    base.checkForErrors = function(e) {
      var $target = $(e.currentTarget);
      base.validateInput($target);
    };

    base.validateInput = function($target) {
      switch ($target.attr('name')) {
        case 'name':
          return base.validateName($target);
        case 'email':
          return base.validateEmail($target);
        case 'count':
          $target.removeClass('with-placeholder');
          return base.validateCount($target);
        default:
          break;
      }
    };


    base.checkEmailFormat = function(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    base.validateEmail = function($input) {
      if (base.checkEmailFormat($input.val())) {
        base.markFieldAsValid($input);
        return true;
      } else {
        base.markFieldAsInvalid($input);
        return false;
      }
    };

    base.validateCount = function($input) {
      var val = $input.val();
      if (!!val && parseInt(val)) {
        base.markFieldAsValid($input);
        return true;
      } else {
        base.markFieldAsInvalid($input);
        return false;
      }
    };

    base.validateName = function($input) {
      if ($input.val().length > 0) {
        base.markFieldAsValid($input);
        return true;
      } else {
        base.markFieldAsInvalid($input);
        return false;
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
      var name = base.$el.find('input[name="name"]').val();
      base.$el.find('input[type="submit"]').prop('disabled', true).val('sent!');
      base.$el.find('.thank-you-text').text('We think ' + name + ' is super cool for planning to attend the Shift art auction.');
    };

    base.isValid = function() {
      var invalidCount = 0;
      var $inputs = base.$el.find('input[type=text], select');
      $inputs.each(function(i, el) {
        if (!base.validateInput($(el))) {
          invalidCount++;
        }
      });
      return invalidCount == 0;
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
