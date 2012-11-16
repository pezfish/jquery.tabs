/**
* jQuery Tabs
* Copyright (c) 2012 Kevin Doyle
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
**/

(function($, window, document, undefined){
	var Tabs = function(el, options){
		this.el = el;
		this.$el = $(el);
		this.options = options;
		this.metadata = this.$el.data("tabs-options");
	};

	var obj, url, current, index, temphash;

	Tabs.prototype = {
		defaults : {
			section : ".section",
			tab : "a",
			initial : 0,
			current : "current",
			onComplete : function(){},
			hideOnClick :false,
			changeURL : false,
			URLPrefix : "/tab/"
		},

		init : function(){
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			temphash = document.location.hash.split(this.config.URLPrefix)[1];

			this.$el.on("click", this.config.tab, $.proxy(this, "_switchTab"));
			
			if(this.config.initial !== null){
				if(this.config.changeURL && temphash !== undefined){
					index = $("#" + temphash).index(this.config.section);
				} else {
					if(typeof this.config.initial === "string"){
						index = $("#" + this.config.initial).index(this.config.section);
					} else if(typeof this.config.initial === "number"){
						index = this.config.initial;
					}
				}
				if(index >= $(this.config.section).length){
					index = 0;
				}
				this.$el.find(this.config.tab).eq(index).trigger("click");
			} else {
				$(this.config.section).hide();
			}
		},
		_switchTab : function(event){
			obj = $(event.currentTarget);
			url = obj.attr("href");
			current = this.$el.find("." + this.config.current);
			
			current.removeClass(this.config.current);
			if(obj[0] !== current[0]){
				obj.addClass(this.config.current);
				$(this.config.section).hide();
				$(url).show();

				if(this.config.changeURL){
					document.location.hash = _this.config.URLPrefix + url.slice(1);
				}
			} else if(this.config.hideOnClick){
				$(url).hide();
				if(this.config.changeURL){
					this._removeHash();
				}
			}
			
			this.config.onComplete.call(this);

			return false;
		},
		_removeHash : function() { 
			var scrollV, scrollH, loc = window.location;
			if ("pushState" in history) {
				history.pushState("", document.title, loc.pathname + loc.search);
			} else {
				scrollV = document.body.scrollTop;
				scrollH = document.body.scrollLeft;

				loc.hash = "";
				document.body.scrollTop = scrollV;
				document.body.scrollLeft = scrollH;
			}
		}
	};

	Tabs.defaults = Tabs.prototype.defaults;

	$.fn.tabs = function(options){
		return this.each(function(){
			new Tabs(this, options).init();
		});
	};
})(jQuery, window , document);