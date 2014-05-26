/**
 * Fetches staff detail data from the Server and initalizes a new page in document to change to.
 *
 * @ param Int id ... ID of the Staff Member
 *
 */
function loadStaffDetails(id) {
	
	loadingIn();
	
	$.getJSON(CONFIG.SERVER.base+CONFIG.SERVER.staff+id)
		.done(function(data, status, jqXHR) {
			if(!isEmpty(data.exception))
				{ ajaxErrorHandler(data, status, jqXHR); return; }

			var name = data.name.split(", ");
			var div = '<div id="staff_'+id+'" data-role="page" data-theme="b" data-subpage="true" data-title="Mitarbeiter & Professoren" class="staffdetails">'+
								'	<div data-role="header" data-position="fixed" data-theme="b" data-tap-toggle="false" class="header">'+
								'		<a href="#" data-rel="back" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all"><i class="fa fa-reply fa-lg"></i></a>'+
								'		<h1>HTWK App</h1>'+
								'	</div>'+
								'	<div role="main" class="ui-content">'+
								'		<h1>'+data.degree+' '+name[1]+' '+name[0]+'</h1>'+
								'		<ul class="nativeDroidCards">'+
								'			<li>'+
								'				<!--<h2>Info</h2> BILD -->'+
								'				<img src="'+data.pictureData+'"/>'+
								'			</li>'+
								'			<li>'+
								'				<h1>Info</h1><hr/>'+
								'				<strong>Grad:</strong> '+data.degree+'<br/>'+
								'				<strong>Bereich:</strong> '+data.faculty+'<br/>'+
								'				<strong>Objekt:</strong> '+data.location+'<br/>'+
								'				<p>'+data.description+'</p>'+
								'			</li>'+
								'			<li>'+
								'				<h1>Kontakt</h1><hr/>'+
								'				<strong>E-Mail:</strong> <a href="mailto:'+data.email+'" class="ui-btn ui-btn-b ui-corner-all ui-mini ui-shadow">'+data.email+'</a><br/>'+
								'				<strong>Telefon:</strong> <a href="tel:'+data.telephone+'" class="ui-btn ui-btn-b ui-corner-all ui-mini ui-shadow">'+data.telephone+'</a><br/>'+
								'				<strong>Fax:</strong><br/><strong>'+data.telefax+'</strong>'+
								'			</li>'+
								'			<li>'+
								'				<h1>Links</h1><hr/>'+
								'				<a href="'+data.detailLink+'" class="ui-btn ui-btn-b ui-corner-all ui-mini ui-shadow external">Details zur Person</a>'+
								'				<a href="'+data.vcardLink+'" class="ui-btn ui-btn-b ui-corner-all ui-mini ui-shadow external">V-Card</a>'+
								'			</li>'+
								'		</ul>'+
								'	</div>'+
								'</div>';
		
			div = $(div).on("pagehide", function (){$(this).remove();});

			$( "body" )
				.append(div)
				.trigger("create");
		
			$.mobile.initializePage();
			$.mobile.changePage("#staff_"+id);
		
			loadingOut();
		})
		.fail(ajaxErrorHandler);
}
