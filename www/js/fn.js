/**
 * General Function Libary for small, "Every Day"-Work.
 * 
 * @author Hubertus Willuhn
 * 
 * UTF-8
 */

/**
 * Capitalize first Letter in String.
 * 
 * @param String str
 * 
 * @return String
 */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Test if val is empty (for all Types).
 * 
 * @param mixed val
 * 
 * @return Boolean
 */
function isEmpty(val) {
	return (val === "" || 
			val === {} || 
			val === null || 
			val === undefined || 
			(val instanceof Array && val.length === 0));
}

/**
 * Creates a DateStamp for Server Requests, Format: YYYYMMDD.
 * 
 * @param Date date
 * 
 * @return String
 */
function createServerDateStamp(date) {
	if(isEmpty(date)) date = new Date();
	
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	return yyyy+""+mm+""+dd;
}

/**
 * Creates a DateStamp for general Purposes, Format: Weekday, dd.mm.yyyy.
 * 
 * @param Date date
 * 
 * @return String
 */
function createDateStamp(date) {
	if(isEmpty(date)) date = new Date();
	
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	return GLOBAL.DATE.weekdays[date.getDay()].name+', '+dd+'.'+mm+'.'+yyyy;
}

/**
 * Creates a DateStamp.
 * 
 * @param Date date
 * @param String format
 * 
 * @see GLOBAL.DATE.formats
 * 
 * @return String, formatted DateStamp
 */
function formatDate(date, format) {
	return createServerDateStamp(date).replace(GLOBAL.DATE.formats.regexp, format);
}

/**
 * Creates a DateTimeStamp, Format: dd.mm.yyyy hh:mm:ss.
 * 
 * @param Date date
 * 
 * @return String
 */
function createDateTimeStamp(date) {
	if(isEmpty(date)) date = new Date();
	
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear(); 
	var hh = date.getHours();
	var mi = date.getMinutes();
	var ss = date.getSeconds();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	if(hh<10) hh="0"+hh;
	if(mi<10) mi="0"+mi;
	if(ss<10) ss="0"+ss;
	
	return (dd+"."+mm+"."+yyyy+" "+hh+":"+mi+":"+ss);	
}

/**
 * Computes the Dates of the Week (per Day).
 * 
 * @param Date date
 * 
 * @return Array[Date]
 */
function getWeek(date) {
	var week = new Array(5);
	
	// Today is a Sunday?
	if (date.getDay() === 0 )
	{
		date.setDate(date.getDate() + 1);
	}
	// Today is a Saturday?
	else if(date.getDay() == 6)
	{
		date.setDate(date.getDate() + 2);
	}
	
	// Reset to Monday
	date.setDate(date.getDate()-date.getDay()+1);
	
	week[0] = new Date(date);

	for (var i = 1; i < 5; i++) {
		week[i] = new Date(date.setDate(date.getDate()+1));
	}

	return week;
}

/**
 * Returns the Weekday defined by the given Date,
 * this Function is used by Services that needs Monday to Friday only!
 * 
 * @param Date date
 * 
 * @see GLOBAL.DATE.weekdays
 * 
 * @return Weekday Object
 */
function getWeekDay(date) {
	if (date.getDay() === 0 || date.getDay() == 6)
	{
		return GLOBAL.DATE.weekdays[1];
	}
	else
	{
		return GLOBAL.DATE.weekdays[date.getDay()];
	}
}

/**
 * Escaping HTML Special Chars like & or <>.
 * 
 * @param String str
 * 
 * @return escaped String
 */
function escape(str) {
	return str.replace(/&/g, "&amp;")
			  .replace(/</g, "&lt;")
			  .replace(/>/g, "&gt;")
			  .replace(/"/g, "&quot;")
			  .replace(/'/g, "&#039;");
}

/**
 * Show Loading-Spinner.
 * 
 * @param String msg
 * @param Boolean textonly ... indicates whether Spinner will be shown or not
 */
function loadingIn(msg, textonly) {
	if(isEmpty(textonly)) {
		textonly = false;
	}
	if(isEmpty(msg)) { 
		msg = "Daten werden abgerufen";
	}
	
	$.mobile.loading("show", {
	  text: msg,
	  textVisible: true,
	  textonly: textonly,
	  disabled: true,
	  theme: "a"
	});
}

/**
 * Hide Loading-Spinner.
 */
function loadingOut() {
	$.mobile.loading("hide");
}

function openSignInDialog(success) {	
	$( "#signInDialog_Btn_Save" )
		.off()
		.on("click", {callback:success}, function (e) {
			saveUsernamePassword($("#signInDialogUsername").val(),
								 $("#signInDialogPassword").val(),
								 function() {
									$( "#signInDialog" ).popup("close");	
									if($.isFunction(e.data.callback))
										e.data.callback.call(this);
								 });
		 });

	$( "#signInDialog" )
		.css("display", "block")
		.popup("open", { positionTo: "window", transition: "pop" });
}

/**
 * Save Username and Password.
 * 
 * @param String username
 * @param String password
 * @param Function done ... Success Callback
 * @param Function fail ... Failure Callback
 */
function saveUsernamePassword(username, password, done, fail) {
	loadingIn("Ihre Einstellungen werden gespeichert...");
	
	CONFIG.AUTH.username = username;
	CONFIG.AUTH.checking = true;
	
	$.post(CONFIG.SERVER.base+CONFIG.SERVER.auth+"?username="+username+"&password="+password)
	 .done(function(data, status, jqXHR) {
		CONFIG.AUTH.credentials = data.encryptedCredentials;
		CONFIG.AUTH.salt = data.salt;
		
		loadingOut();
		loadingIn("Es wird geprüft, ob ihre Daten korrekt sind...");
		
		$.getJSON(CONFIG.SERVER.base+CONFIG.SERVER.mailg+"?credentials="+CONFIG.AUTH.credentials+"&salt="+CONFIG.AUTH.salt+"&offset=1")
		 .done(function(data, status, jqXHR) {
			 	loadingOut();
				if(!isEmpty(data.exception)) {
					CONFIG.AUTH.username = "";
					CONFIG.AUTH.credentials = "";
					CONFIG.AUTH.salt = "";
					CONFIG.AUTH.correct = false;
					CONFIG.AUTH.checking = false;
					loadingIn("Ihre Daten waren inkorrekt. Bitte versuchen Sie es erneut!", true);
				}
				else {
					CONFIG.AUTH.correct = true;
					CONFIG.AUTH.checking = false;
					localStorage.setItem("username", CONFIG.AUTH.username);
					localStorage.setItem("credentials", CONFIG.AUTH.credentials);
					localStorage.setItem("salt", CONFIG.AUTH.salt);
					loadingIn("Ihre Daten waren korrekt und wurden gespeichert!", true);
				}
				setTimeout(loadingOut, 3000);
				
				if($.isFunction(done) && CONFIG.AUTH.correct) done.call(this);
				if($.isFunction(fail) && !CONFIG.AUTH.correct) fail.call(this);
		  });
	  });
}

/**
 * Open Links in Devices native Browser.
 * 
 * @param Event e ... Click-Event of Link
 */
function openInExternalBrowser(e) {
	window.open($(e.target).attr("href"), "_system", "location=yes");
	e.preventDefault(); 
}

function loadParameters(){
	var help = localStorage.getItem("username");
	if(!isEmpty(help)) CONFIG.AUTH.username = help;
	help = localStorage.getItem("credentials");
	if(!isEmpty(help)) CONFIG.AUTH.credentials = help;
	help = localStorage.getItem("salt");
	if(!isEmpty(help)) CONFIG.AUTH.salt = help;
	help = localStorage.getItem("email");
	if(!isEmpty(help)) CONFIG.AUTH.email = help;
	help = localStorage.getItem("language");
	if(!isEmpty(help)) CONFIG.LANGUAGE.set = help;
	help = localStorage.getItem("defaultFeed");
	if(!isEmpty(help)) CONFIG.NEWS.defaultFeed = help;
	help = localStorage.getItem("defaultCanteen");
	if(!isEmpty(help)) CONFIG.MENSA.defaultCanteen = help;
	help = localStorage.getItem("timetable");
	if(!isEmpty(help)) CONFIG.TIMETABLE = JSON.parse(help);

	delete loadParameters;
}

function saveParameters(){
	localStorage.setItem("username", CONFIG.AUTH.username);
	localStorage.setItem("credentials", CONFIG.AUTH.credentials);
	localStorage.setItem("salt", CONFIG.AUTH.salt);
	localStorage.setItem("email", CONFIG.AUTH.email);
	localStorage.setItem("language", CONFIG.LANGUAGE.set);
	localStorage.setItem("defaultFeed", CONFIG.NEWS.defaultFeed);
	localStorage.setItem("defaultCanteen", CONFIG.MENSA.defaultCanteen);
	localStorage.setItem("timetable", JSON.stringify(CONFIG.TIMETABLE));
}

function ajaxErrorHandler(data, status, jqXHR, callback){
	loadingOut();
	var text = "Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut!";
	loadingIn(text,true);
	$( "#menu" ).panel( "open");
	setTimeout(loadingOut, 4000);
	if($.isFunction(callback))
		callback.call(this);
}
