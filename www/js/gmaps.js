			var fromLat;
			var fromLng;
			var toLat;
			var toLng;
			var mapcontainer;
			var map;

			var directionsDisplay;
			var directionsService;

			function onGeoGetSuccess (p){
//				alert("geosuccess");
				fromLat = parseFloat(p.coords.latitude);
				fromLng = parseFloat(p.coords.longitude);
				calcRoute();
				
			}
			function onGeoGetFail(e){
				alert("geofail");
			}
			function calcRoute() {
				//alert("calcRoute");
				start = new google.maps.LatLng(fromLat, fromLng);
				end = new google.maps.LatLng(toLat, toLng);
				var request = {
					origin: start,
					destination: end,
					travelMode: google.maps.TravelMode.WALKING
				};
				directionsService.route(request, function(response, status) {
					console.log(response);
					if (status == google.maps.DirectionsStatus.OK) {
					  directionsDisplay.setDirections(response);
					}
				});
			}
			function initGmap(){
				//alert("initGmap");
				navigator.geolocation.getCurrentPosition(onGeoGetSuccess, onGeoGetFail,{timeout:30000,enableHighAccuracy: true, maximumAge: 0});
				//alert("end init");
				directionsService = new google.maps.DirectionsService();

				var mapOptions = {
					zoom: 7,
					disableDefaultUI : true,
					draggable : false,
					keyboardShortcuts : false,
					scrollwheel : false,
					mapTypeId: google.maps.MapTypeId.WALKING
				}				
				map = new google.maps.Map(mapcontainer.find(".map-canvas")[0], mapOptions);
				var rendererOptions = {
					map: map
				}				
				directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
				
			}
