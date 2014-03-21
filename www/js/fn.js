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
};

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
};

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
};

/**
 * Creates a DateStamp for general Purposes, Format: WeedDay, dd.mm.yyyy.
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
};

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
};

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
	if (date.getDay() == 0 )
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
};

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
};

/**
 * Show Loading-Spinner.
 */
function loadingIn() {
	$.mobile.loading( "show", {
	  text: "Daten werden abgerufen",
	  textVisible: true,
	  disabled: true,
	  theme: "b"
	});
};

/**
 * Hide Loading-Spinner.
 */
function loadingOut() {
	$.mobile.loading("hide");
};
