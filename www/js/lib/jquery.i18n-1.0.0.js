/**
 * i18n - Localization/Internationalization Plugin for jQuery.
 *
 * Beschreibung:
 * jQuery Plugin zur Uebersetzung von Webseiten auf Client-Seite.
 * Das Plugin nutzt eine vorgegebene CSS-Klasse, um alle sprachabhaengigen
 * Elemente zufinden. Zur Uebersetzung wird ein Objekt benoetigt, welches
 * die einzelnen Sprachen mit den Schluessel/Wert Paaren enthaelt.
 *
 * Description:
 * jQuery Plugin for Translation of Web Pages on the Client Side.
 * The Plugin uses a default CSS Class to find all language-dependent
 * Elements. To translate an Object is needed, which contains
 * the different Languages ​​with the Key/Value Pairs.
 *
 * @param String class ... CSS Class (Search Criterion)
 * @param String key_attr ... Data Attribute Name for Key Values
 * @param String lang ... Language Name (could be ISO-Code, FullName or what ever you like)
 *
 * @author Hubertus Willuhn
 * @version 1.0
 *
 * UTF-8
 *
 * CREATED 29.03.2014
 */

;(function($) {

	var __slice = Array.prototype.slice;

	function translate(o)
	{
		var opts = $.fn.i18n.defaults;
		var e, v;
	  
		for(var i=0, l=o.length;i<l;i++)
		{
			e = o.eq(i);
			
			v = $.fn.i18n._t(e.data(opts.key_attr), opts);

			if(e.data("title"))
				e.data("title", v)
			else e.html(v);
		}
		
		if($.isFunction(opts.callback))
			opts.callback.call(this);
		
		return o;
	};
	
	function printf(str, args)
	{
  		args = $.isArray(args) ? args : __slice.call(arguments, 1);
      
  		return str.replace(/([^%]|^)%(?:(\d+)\$)?s/g, function(p0, p, position) {
  			if (position) {
  				return p + args[parseInt(position)-1];
  			}
  				return p + args.shift();
  		}).replace(/%%s/g, '%s');
  	};
  
	$.fn.i18n = function(arg,callback)
	{
		var options = $.extend({},$.fn.i18n.defaults,arg,{callback:callback});

		// empty collection ?
		if(!this.length) return this;
		
		return translate($(this));
	};
	
	$.fn.i18n._setLang = function(lang_key, lang_set)
  	{
  		if(lang_set)
  			$.fn.i18n.defaults.lang_set = lang_set;
  		
  		if($.fn.i18n.defaults.lang_set.hasOwnProperty(lang_key))
  			$.fn.i18n.defaults.lang_key = lang_key;
  	};
  
  	$.fn.i18n._t = function(key, opts)
  	{
  		if(key==undefined || key==null) return "";
  		if(!opts) opts = $.fn.i18n.defaults;
  		
  		var i = key.indexOf(".");
  		
  		key = key?[key.substring(0,i),key.substring(i+1)]:[];
  		
  		return opts.lang_set[opts.lang_key][key[0]][key[1]];
  	};
  	
  	$.fn.i18n._texp = function(key, params)
  	{
  		var opts = $.fn.i18n.defaults;
  		var val;
  		
  		key = key?key.split("."):[];
  		
  		val = opts.lang_set[opts.lang_key][key[0]][key[1]];
  		
  		return (arguments.length<2?val:printf(val, arguments));
  	};
  
	// default settings
	$.fn.i18n.defaults = {
		lang_class: 'hasLang',
		key_attr: 'i18n',
		lang_key: 'de_DE',
		lang_set: {}
	};
})(jQuery);