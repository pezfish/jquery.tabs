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
		this.obj = '';
		this.url = '';
		this.current = '';
		this.index = '';
		this.temphash = '';
	};

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
			this.temphash = document.location.hash.split(this.config.URLPrefix)[1];
			this.$el.on("click", this.config.tab, $.proxy(this, "_switchTab"));
			
			if(this.config.initial !== null){
				if(this.config.changeURL && this.temphash !== undefined){
					this.index = $("#" + this.temphash).index(this.config.section);
				} else {
					if(typeof this.config.initial === "string"){
						this.index = $("#" + this.config.initial).index(this.config.section);
					} else if(typeof this.config.initial === "number"){
						this.index = this.config.initial;
					}
				}
				if(this.index >= $(this.config.section).length){
					this.index = 0;
				}
				this.$el.find(this.config.tab).eq(this.index).trigger("click");
			} else {
				$(this.config.section).hide();
			}
		},
		_switchTab : function(event){
			this.obj = $(event.currentTarget);
			this.url = this.obj.attr("href");
			this.current = this.$el.find(this.config.tab+"." + this.config.current);

			if(this.obj[0] !== this.current[0]){
				this.current.removeClass(this.config.current);
				
				this.obj.addClass(this.config.current);
				$(this.config.section).hide();
				$(this.url).show();
				
				if(this.config.changeURL){
					document.location.hash = this.config.URLPrefix + this.url.slice(1);
				}
			} else if(this.config.hideOnClick){
				this.obj.removeClass(this.config.current);
				$(this.url).hide();
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