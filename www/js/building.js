/**
 * Fetches building detail data from the Server and initalizes a new page in document to change to.
 *
 * @ param Event e
 *
 */
function buildingLoadBuildingDetails(id) {
	
	loadingIn();
	
	$.getJSON(CONFIG.SERVER.base+CONFIG.SERVER.builds+"/"+id)
		.done(function(data, status, jqXHR) {
			if(!isEmpty(data.exception))
				{ ajaxErrorHandler(data, status, jqXHR); return; }

			var desc = "";
		
			for(var d in data.description){
				if(!isEmpty(data.description[d]))
					desc += data.description[d] + "</br>";
			}
		
			var div ='<div id="building_'+id+'" data-role="page" data-theme="b" data-subpage="true" data-title="Gebäude" data-destination="'+data.latLng.replace(/ /, '')+'">'+
						'<div data-role="header" data-position="fixed" data-tap-toggle="false" data-theme="b" class="header">'+
							'<a href="#" data-rel="back" data-role="button" data-transition="slide" data-direction="reverse"><span class="icon-angle-left"></span></a>'+
							'<h1>HTWK App</h1>'+
						'</div>'+
						'<div data-role="content" class="inset">'+
							'<h1>'+data.fullName+'</h1>'+
							'<ul data-nativedroid-plugin="cards" class="nativeDroidCards">'+
								'<li data-cards-type="text" >'+
									'<p><img src="'+data.pictureData+'"/></p>'+
								'</li>'+
								'<li data-cards-type="text" >'+
									'<h1>Info</h1><hr>'+
									'<strong>Abkürzung: </strong>'+data.id+'<br/>'+
									'<strong>Adresse:</strong><br/>'+data.address+'<br/>'+
									'<p><br/>'+desc+'</p>'+
								'</li>'+
								'<li id="building_'+id+'_map" data-cards-type="traffic">'+
								/*"<li data-cards-type='traffic' data-cards-traffic-route='{\"from\":\"0.00000,0.000000\",\"to\":\""+data.latLng.replace(/ /, '')+"\",\"type\" : \"geolocation\"}'>"+*/
									'<div class="map-canvas"></div><div class="mapcontainer"></div>'+
									//'<a class="" href="maps:q='+data.address+'"><i class="icon-screenshot"></i>Navigation </a>'+
									'<a class="" href="http://maps.google.com/maps?daddr='+data.address+'"><i class="icon-screenshot"></i>Navigation </a>'+
								'</li>'+
							'</ul>'+
							'<br/>'+
							'<p>'+
								'<h5>'+
									'<strong>'+
										'Letzte Änderung:'+
									'</strong> '+
									createDateTimeStamp(new Date(data.lastChange))+
								'</h5>'+
							'</p>'+
						'</div>'+
					'</div>';

			div = $(div);
			div.find("div[data-role='content'] a").addClass("external");
		
			$( "body" )
				.append(div)
				.trigger("create");

			div.on("pageshow",function(){
				var thi = $(this);

				GMAPS.initGmap(thi.attr('data-destination').split(','),thi);
			})
			.on("pagehide", function(){
				$(this).remove();
			});
		
			$.mobile.initializePage();
			$.mobile.changePage("#building_"+id);
		
			loadingOut();
		})
		.fail(ajaxErrorHandler);
}
