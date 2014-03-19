/**
 * General Function Libary for small, "Every Day"-Work.
 * 
 * @author Hubertus Willuhn
 * @version 1.0
 * 
 * UTF-8
 */

// Capitalize first Letter in String
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

// Test if val is empty (for all Types)
function isEmpty(val) {
	return (val === "" || 
			val === {} || 
			val === null || 
			val === undefined || 
			(val instanceof Array && val.length === 0));
};

// Creates a DateStamp for Server Requests, Format: YYYYMMDD
function createServerDateStamp(date) {
	if(isEmpty(date)) date = new Date();
	
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	return yyyy+""+mm+""+dd;
};

//Creates a DateStamp for general Purposes, Format: WeedDay, dd.mm.yyyy
function createDateStamp(date) {
	if(isEmpty(date)) date = new Date();
	
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	return GLOBAL.DATE.weekdays[date.getDay()].name+', '+dd+'.'+mm+'.'+yyyy;
};

// Creates a DateTimeStamp, Format: dd.mm.yyyy hh:mm:ss
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

// Escaping HTML Special Chars like & or <>
function escape(str) {
	return str.replace(/&/g, "&amp;")
			  .replace(/</g, "&lt;")
			  .replace(/>/g, "&gt;")
			  .replace(/"/g, "&quot;")
			  .replace(/'/g, "&#039;");
};

function loadingIn() {
	$.mobile.loading( "show", {
	  text: "Daten werden abgerufen",
	  textVisible: true,
	  disabled: true,
	  theme: "b"
	});
};

function loadingOut() {
	$.mobile.loading("hide");
};
