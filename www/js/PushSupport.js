// This Code is Android/Amazon-FireOS ONLY!!!

function registerPush(){
	if(CONFIG.PUSH.registered === false && CONFIG.PUSH.enabled === true){
		if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
			pushNotification.register(
				pushSuccessHandler,
				pushErrorHandler,
				{ "senderID": CONFIG.PUSH.senderId,
					"ecb":"onNotificationGCM"
				});
		}
	}
}

// result contains a description text returned from the plugin call
function pushSuccessHandler (result) {}

// result contains any error description text returned from the plugin call
function pushErrorHandler (error) {
	// Fail silently --> User can't do anything
}

// Android and Amazon Fire OS
function onNotificationGCM(e) {

	switch( e.event ){

		case 'registered':
			if ( e.regid.length > 0 ){
				$.ajax({
					method: "PUT",
					data: JSON.stringify({regid: e.regid}),
					url: CONFIG.SERVER.base + CONFIG.SERVER.pushnotification + "regid/" + e.regid,
					})
				 .done(function(data, textstatus, jqXHR) {
						CONFIG.PUSH.regid = e.regid;
						CONFIG.PUSH.registered = true;
					})
					.fail(function(jqxhr, textstatus, error) {
						//jqxhr.status: 409 - Regid is already made available to the server
						// Fail silently --> User can't do anything
					});
			}
			break;

		case 'message':

			if ( e.foreground )	{
				// notification happened while we were in the foreground. Push will be 	processed immediatly
				alert("Foreground-Push: " + JSON.stringify(e.payload.message));
			}	else {  // otherwise we were launched because the user touched a notification in the notification tray. Push will be 	processed when the App starts, inside the proper method
				if ( e.coldstart ){
					alert("Coldstart-Push"); //Notification in Notification Area
				} else {
					alert("Background-Push"); //Notification in Notification Area
				}
			}

			//MSG: e.payload.message
			//Only works for GCM --> MESSAGE -> MSGCNT: e.payload.msgcnt
			break;

		case 'error':
			//alert("PushError: " + e.msg);
			break;

		default:
			//alert('An unknown event was received');
			break;
	}
}

function unregisterPush(){
	pushNotification.unregister(pushSuccessUnregisterHandler, pushErrorHandler);
}

function pushSuccessUnregisterHandler(result){
	$.ajax({
		method: 'DELETE',
		data: JSON.stringify({regid: CONFIG.PUSH.regid}),
		url: CONFIG.SERVER.base + CONFIG.SERVER.pushnotification + "regid/" + CONFIG.PUSH.regid,
		})
		.done(function(msg) {
			CONFIG.PUSH.regid = "";
			CONFIG.PUSH.registered = false;
			//callback to inform user over success or error
		})
		.fail(function(jqxhr, textstatus, error) {
			//callback to inform user over success or error
		});
}
