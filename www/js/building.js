/**
 * Fetches building detail data from the Server and initalizes a new page in document to change to.
 *
 * @ param Event e
 *
 */
'use strict';

function buildingLoadBuildingDetails(id) {
  if (WURFL.is_mobile) {
    analytics.trackView('building#' + id);
  }
  loadingIn();

  $.getJSON(CONFIG.SERVER.base + CONFIG.SERVER.builds + '/' + id)
    .done(function(data, status, jqXHR) {

      var desc = isEmpty(data.description[0]) ? '' : data.description[0] + '</br>';

      var div = '<div id="building_' + id + '" data-role="page" data-theme="b" data-subpage="true" data-title="Gebäude" data-destination="' + data.latLng.replace(/ /, '') + '">' +
        '	<div data-role="header" data-position="fixed" data-theme="b" data-tap-toggle="false" class="header">' +
        '		<a href="#" data-rel="back" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all"><i class="fa fa-reply fa-lg"></i></a>' +
        '		<h1>HTWK App</h1>' +
        '	</div>' +
        '	<div role="main" class="ui-content">' +
        '		<h1>' + data.fullName + '</h1>' +
        '		<ul class="nativeDroidCards">' +
        '			<li>' +
        '				<p><img src="' + data.pictureData + '"/></p>' +
        '			</li>' +
        '			<li>' +
        '				<h1>Info</h1><hr>' +
        '				<strong>Abkürzung: </strong>' + data.id + '<br/>' +
        '				<strong>Adresse:</strong><br/>' + data.address + '<br/>' +
        '				<p><br/>' + desc + '</p>' +
        '				<h5>' +
        '					<strong>Letzte Änderung:</strong>' + createDateTimeStamp(new Date(data.lastChange)) +
        '				</h5>' +
        '			</li>' +
        '			<li id="building_' + id + '_map">' +
        '				<div class="map-canvas"></div><div class="mapcontainer"></div>' +
        '				<a class="external ui-btn ui-btn-b" href="http://maps.google.com/maps?daddr=' + data.address + '"><i class="fa fa-crosshairs fa-lg"></i> Navigation</a>' +
        '			</li>' +
        '		</ul>' +
        '	</div>' +
        '</div>';

      div = $(div);

      $('body')
        .append(div)
        .trigger('create');

      div.on('pageshow', function() {
        var thi = $(this);

        GMAPS.initGmap(thi.attr('data-destination').split(','), thi);
      })
      .on('pagehide', function() {
        $(this).remove();
      });

      $.mobile.initializePage();
      $.mobile.changePage('#building_' + id);

      loadingOut();
    })
    .fail(ajaxErrorHandler);
}
