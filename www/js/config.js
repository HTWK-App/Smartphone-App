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
		// LIVE
		//base: "",
		// DEMO
		//base: "http://benjaminwestphal.de:9091/htwk/",
		base: "http://gateway.westphal.im:5001/app/",
		// LOCAL
		//base: "http://localhost:8080/app/",
		staff: "info/staff/",
		builds: "info/building",
		sport: "info/sport",
		news: "news",
		mensa: "mensa",
		timetable: "timetable/",
		auth: "auth",
		qis: "qis/get",
		mailg: "mailbox/get",
		mailn: "mailbox/new",
		mails: "mailbox/send",
	},
	LANGUAGE: {
		availableShort: ["de_DE","en_EN"],
		availableLong: ["Deutsch","English"],
		set: "de_DE"
	},
	TIMETABLE: {
		semester: null,
		showDocentFullName: false,
		faculty : [
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
		           }
		          ]
	},
	FACULTY: {
		prof: false,
		name: "",
		matrikel: ""
	},
	NEWS: {
		defaultImage: "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",
		defaultFeed: "rss.htwk.4"
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
	DEMO: {
		username: "",
		password: "",
		credentials: "",
		salt: ""
	},
	INIT: {
		news: false,
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
};
