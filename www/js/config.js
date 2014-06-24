/**
 * Configuration File for general Settings and global Constants or Fields.
 *
 * @author Hubertus Willuhn
 * @version 1.0
 *
 * UTF-8
 */

var CONFIG = {

	SERVER: {
		// LIVE *****
		base: "http://141.57.21.45:8080/",
		// LOCAL *****
		//base: "http://localhost:8080/app/",
		staff: "info/staff/",
		builds: "info/building",
		sport: "info/sport",
		academical: "info/academical/",
		news: "news",
		weather: "weather?location=",
		mensa: "mensa",
		timetable: "timetable/",
		auth: "auth",
		qis: "qis/get",
		room: "room/",
		mailg: "mailbox/get",
		mailn: "mailbox/new",
		mails: "mailbox/send",
		pushnotification: "auth/push"
	},
	LANGUAGE: {
		availableShort: ["de_DE","en_EN"],
		availableLong: ["Deutsch","English"],
		set: "de_DE"
	},
	AUTH: {
		username: "",
		password: "",
		credentials: "",
		salt: "",
		checking: false,
		correct: false
	},
	PUSH: {
		senderId: "1058861665734",
		enabled: false,
		regid: "",
		registered: false,
		STATUS: {
			1000: "pushRequest",
			2000: "newNews",
			4001: "newMail"
		}
	},

	GENERAL: {
		student: true,
		name: ""
	},
	TIMETABLE: {
		semester: null,
		showDocentFullName: false,
		faculty : [
		           /*{
		        	   id : "fb",
		        	   groups : [
		        	             {
                	            	 id : "13BI1-B",
                	            	 courses : {
                	            		 "a852385b44c1bc6f78287a455c5832fa" : "Hydromechanik",
                	            		 "d8f0a7990b00594587c3dbe9fe798804" : "2501 Baustofflehre II",
                	            		 "584f5fb2f1e9024511b02e4e5b0bdb1a" : "AK Baukonstruktion"
                	            	 }
                	             }
                	            ]
				   },
		           {
		        	   id : "fimn",
		        	   groups : [
		        	             {
		        	            	 id : "13IN1-B",
		        	            	 courses : {
		        	            		 "ccf84be64a0e72a25b298ea645b2949f" : "Algorithmen und Datenstrukturen",
		        	            		 "475aae75a1df900faf9a79f6f61bfe8f" : "Englisch",
		        	            		 "98dff33f0fc0eb9e093950488badc976" : "Anwendungsorientierte Programmierung"
		        	            	 }
		        	             },
		        	             {
		        	            	 id : "13MI1-B",
		        	            	 courses : {
		        	            		 "43f39a31eaea91afd83069530b7a5681" : "Medientheorie",
		        	            		 "2b078e012c9165d5c81f5c707c76b0f8" : "2030 Digitaltechnik MIB 2.FS (pf)",
		        	            		 "f4513fc36fe008a4a9cb9f0a20ba8e0a" : "Physik",
		        	            		 "f6ff37e22b74021f0064dba0fa49887d" : "Frei!"
		        	            	 }
		        	             }
		        	            ]
		           }*/
		          ],
		temporary: []
	},
	NEWS: {
		defaultFeed: "rss.htwk.3"
	},
	MENSA: {
		defaultCanteen: 118
	},
	AJAX: {
		scriptCharset: "utf-8",
		contentType: "application/json; charset=utf-8",
		headers: {
			"Accept" : "application/json; charset=utf-8",
			"Content-Type": "application/json; charset=utf-8"
		}
	}
};

var GLOBAL = {
	SCREEN: {
		height: 0,
		width: 0
	},
	INIT: {
		news: false,
		index: false,
		timetable: false,
		mensa: false,
		mail: false,
		qis: false,
		sport: false,
		staff: false,
		builds: false,
		wlan: false,
		info: false,
		room: false,
		settings: false
	},
	DATE: {
		formats: {
			regexp: /(\d{4})(\d{2})(\d{2})/,
			// RegExp Result from YYYYMMDD
			en: "$1-$2-$3",
			de: "$3.$2.$1"
		},
		weekdays: {
			0: { id: "Son" , name: "Sonntag"},
			1: { id: "Mon" , name: "Montag"},
			2: { id: "Tue" , name: "Dienstag"},
			3: { id: "Wed" , name: "Mittwoch"},
			4: { id: "Thu" , name: "Donnerstag"},
			5: { id: "Fri" , name: "Freitag"},
			6: { id: "Sat" , name: "Samstag"}
		},
		currentWeek: null
	},
	NEWS: {
		titles: {
			"rss.digiboard": "HTWK Digiboard",
			"rss.eit.1" : "EIT Kolloquien-Termine",
			"rss.eit.2" : "EIT Kolloquien-Nachrichten",
			"rss.htwk.1" : "HTWK Veranstaltungen",
			"rss.htwk.2" : "HTWK Stellenausschreibungen",
			"rss.htwk.3" : "HTWK Nachrichten",
			"rss.imn.1" : "IMN Nachrichten",
			"rss.imn.2" : "IMN Verteidigungen",
			"rss.imn.3" : "IMN Termine",
			"rss.me.1" : "ME Fachschaftsrat",
			"rss.medien" : "ME Nachrichten",
			"rss.sport" : "Sportportal",
			"rss.stura" : "HTWK Studentenrat",
			"rss.wiwi" : "WiWi Fachschaftsrats-Termine",
			"rss.lvz.news" : "LVZ Leipzig Nachrichten"
			}
	},
	MAIL: {
		filter: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
	}
};
