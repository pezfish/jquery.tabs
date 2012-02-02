/**
* jQuery Tabs
* Copyright (c) 2011 Kevin Doyle
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
**/

(function($) {  
	$.fn.tabs = function(options) {
		var defaults = {
			tab: "a",
			section: ".section",
			initialIndex: 0,
			current: "current",
			onComplete: function() {},
			hideOnClick:false
		}
		return this.each(function() {
			if (options) {
				$.extend(defaults, options);
			}
			var el, obj, url, current, hash, title;
			el = $(this);
			el.delegate(defaults.tab, "click", onClick);
			function onClick(event){
				obj = $(event.currentTarget);
				url = obj.attr("href");
				current = el.find(defaults.tab+"."+defaults.current);
				
				if(!obj.hasClass(defaults.current)){
					if(url.substring(0,4) !== "http"){
						current.removeClass(defaults.current);
						obj.addClass(defaults.current);
						$(defaults.section).hide();
						$(url).show();
						defaults.onComplete.call(this);
						return false;
					}
				} else if(defaults.hideOnClick) {
					current.removeClass(defaults.current);
					$(url).hide();
					defaults.onComplete.call(this);
					return false;
				} else {
					return false;	
				}
			}
			if(defaults.initialIndex !== null){
				el.find(defaults.tab).eq(defaults.initialIndex).trigger("click");
			} else {
				$(defaults.section).hide();	
			}
		});
	}
})(jQuery);
