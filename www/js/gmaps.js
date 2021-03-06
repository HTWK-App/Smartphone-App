'use strict';
var GMAPS = {
  destination: [],
  mapcontainer: null,

  initGmap: function(dest, cont) {
    GMAPS.destination = dest;
    GMAPS.mapcontainer = cont;
    var options = {
      timeout: 30000,
      maximumAge: 7000,
      enableHighAccuracy: true
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(GMAPS.onGeoGetSuccess, GMAPS.onGeoGetFail, options);
    } else {
      GMAPS.onGeoGetFail();
    }
  },

  onGeoGetFail: function(error) {
    var dest = new google.maps.LatLng(GMAPS.destination[0], GMAPS.destination[1]);
    var mapOptions = {
      disableDefaultUI: true,
      draggable: false,
      keyboardShortcuts: false,
      scrollwheel: false,
      center: dest,
      zoom: 16
    };
    var map = new google.maps.Map(GMAPS.mapcontainer.find('.map-canvas')[0], mapOptions);
    var marker = new google.maps.Marker({
      position: dest,
      map: map
    });
    //GMAPS.mapcontainer.find(".map-canvas").parent().empty().append("<p>Eine Karte kann nicht angezeigt werden, da die Ortsbestimmung fehgeschlagen ist.</p>");
  },

  onGeoGetSuccess: function(pos) {
    GMAPS.calcRoute([parseFloat(pos.coords.latitude), parseFloat(pos.coords.longitude)]);
  },

  calcRoute: function(position) {

    var directionsService = new google.maps.DirectionsService();
    var mapOptions = {
      zoom: 7,
      disableDefaultUI: true,
      draggable: false,
      keyboardShortcuts: false,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.WALKING
    };
    var map = new google.maps.Map(GMAPS.mapcontainer.find('.map-canvas')[0], mapOptions);
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });
    var start = new google.maps.LatLng(position[0], position[1]);
    var end = new google.maps.LatLng(GMAPS.destination[0], GMAPS.destination[1]);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {

      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }
};
