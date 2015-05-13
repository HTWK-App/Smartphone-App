function registerPush(){
	try {
		if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
			pushNotification.register(
				pushSuccessHandler,
				pushErrorHandler,
				{ "senderID":"1058861665734",
					"ecb":"onNotification"
				});
		} else {
			pushNotification.register(
				pushSuccessHandler,
				pushErrorHandler,
				{	"badge":"true",
	        "sound":"true",
	        "alert":"true",
					"ecb":"onNotification"
				});
		}
	} catch(err) { alert(err.message); }
}

function pushSuccessHandler (result) {
	alert('result = ' + result);
	//Push REGID to server
}

// result contains any error description text returned from the plugin call
function pushErrorHandler (error) {
	alert('error = ' + error);
}

// Android and Amazon Fire OS
function onNotification(e) {

	switch( e.event ){
		case 'registered':
			if ( e.regid.length > 0 ){
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
				deviceRegistered(e.regid);
			}
			break;

		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if ( e.foreground )	{
				console.log("Foreground Push");

			}	else {  // otherwise we were launched because the user touched a notification in the notification tray.
				if ( e.coldstart ){
					console.log("Coldstart Push");
				} else {
					console.log("Background Push");
				}
			}

			//$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			//Only works for GCM
			//$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			break;

		case 'error':
			console.log("Error: " + e.msg);
			break;

		default:
			console.log('An unknown event was received');
			break;
	}
}

function deviceRegistered(regid) {
    channel = regid.substr(regid.length - 8).toLowerCase();

    console.log(channel);

    /*pubnub.publish({
        channel: channel,
        message: {
            regid: regid
        }
    });

    pubnub.subscribe({
        channel: channel,
        callback: function(m) {
            console.log(m);
            t.classList.remove('gears');
            if(m.setting) {
                t.textContent = m.setting + '°';
            }
        }
    });*/
}

function unregisterPush(){
	pushNotification.unregister(pushSuccessHandler, pushErrorHandler, options);
}
