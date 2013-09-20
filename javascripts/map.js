(function() {
  var ShiftMap = function() {
    var base = this;

    this.map = null;

    base.location = new google.maps.LatLng(39.772131, -104.98194799999999);

    base.mapOptions = {
      zoom: 14,
      center: base.location,
      scrollwheel: false,
      streetViewControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    base.init = function() {
      google.maps.event.addDomListener(window, 'load', base.load);
    };

    base.load = function() {
      base.map = new google.maps.Map(document.getElementById('map'), base.mapOptions);

      base.setMarker();
    };

    base.setMarker = function() {
      var marker = new google.maps.Marker({
        position: base.location,
        map: base.map,
        title: 'ReFuel'
      });
    };

    base.init();
  }

  new ShiftMap;
})();
