(function(a){"use strict";var b=function(a,c,d){var e=document.createElement("img"),f,g;return e.onerror=c,e.onload=function(){g&&b.revokeObjectURL(g),c(b.scale(e,d))},window.Blob&&a instanceof Blob||window.File&&a instanceof File?f=g=b.createObjectURL(a):f=a,f?(e.src=f,e):b.readFile(a,function(a){e.src=a})},c=window.createObjectURL&&window||window.URL&&URL||window.webkitURL&&webkitURL;b.scale=function(a,b){b=b||{};var c=document.createElement("canvas"),d=Math.max((b.minWidth||a.width)/a.width,(b.minHeight||a.height)/a.height);return d>1&&(a.width=parseInt(a.width*d,10),a.height=parseInt(a.height*d,10)),d=Math.min((b.maxWidth||a.width)/a.width,(b.maxHeight||a.height)/a.height),d<1&&(a.width=parseInt(a.width*d,10),a.height=parseInt(a.height*d,10)),!b.canvas||!c.getContext?a:(c.width=a.width,c.height=a.height,c.getContext("2d").drawImage(a,0,0,a.width,a.height),c)},b.createObjectURL=function(a){return c?c.createObjectURL(a):!1},b.revokeObjectURL=function(a){return c?c.revokeObjectURL(a):!1},b.readFile=function(a,b){if(window.FileReader&&FileReader.prototype.readAsDataURL){var c=new FileReader;return c.onload=function(a){b(a.target.result)},c.readAsDataURL(a),c}return!1},typeof define!="undefined"&&define.amd?define(function(){return b}):a.loadImage=b})(this);

/**
 * Coin Slider - Unique jQuery Image Slider
 * @version: 1.0 - (2010/04/04)
 * @requires jQuery v1.2.2 or later 
 * @author Ivan Lazarevic
 * Examples and documentation at: http://workshop.rs/projects/coin-slider/
 
 * Licensed under MIT licence:
 *   http://www.opensource.org/licenses/mit-license.php
**/

(function($){var params=new Array;var order=new Array;var images=new Array;var links=new Array;var linksTarget=new Array;var titles=new Array;var interval=new Array;var imagePos=new Array;var appInterval=new Array;var squarePos=new Array;var reverse=new Array;$.fn.coinslider=$.fn.CoinSlider=function(options){init=function(el){order[el.id]=new Array();images[el.id]=new Array();links[el.id]=new Array();linksTarget[el.id]=new Array();titles[el.id]=new Array();imagePos[el.id]=0;squarePos[el.id]=0;reverse[el.id]=1;params[el.id]=$.extend({},$.fn.coinslider.defaults,options);$.each($('#'+el.id+' img'),function(i,item){images[el.id][i]=$(item).attr('src');links[el.id][i]=$(item).parent().is('a')?$(item).parent().attr('href'):'';linksTarget[el.id][i]=$(item).parent().is('a')?$(item).parent().attr('target'):'';titles[el.id][i]=$(item).next().is('span')?$(item).next().html():'';$(item).hide();$(item).next().hide();});$(el).css({'background-image':'url('+images[el.id][0]+')','width':params[el.id].width,'height':params[el.id].height,'position':'relative','background-position':'top left'}).wrap("<div class='coin-slider' id='coin-slider-"+el.id+"' />");$('#'+el.id).append("<div class='cs-title' id='cs-title-"+el.id+"' style='position: absolute; bottom:0; left: 0; z-index: 1000;'></div>");$.setFields(el);if(params[el.id].navigation)
$.setNavigation(el);$.transition(el,0);$.transitionCall(el);}
$.setFields=function(el){tWidth=sWidth=parseInt(params[el.id].width/params[el.id].spw);tHeight=sHeight=parseInt(params[el.id].height/params[el.id].sph);counter=sLeft=sTop=0;tgapx=gapx=params[el.id].width-params[el.id].spw*sWidth;tgapy=gapy=params[el.id].height-params[el.id].sph*sHeight;for(i=1;i<=params[el.id].sph;i++){gapx=tgapx;if(gapy>0){gapy--;sHeight=tHeight+1;}else{sHeight=tHeight;}
for(j=1;j<=params[el.id].spw;j++){if(gapx>0){gapx--;sWidth=tWidth+1;}else{sWidth=tWidth;}
order[el.id][counter]=i+''+j;counter++;if(params[el.id].links)
$('#'+el.id).append("<a href='"+links[el.id][0]+"' class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></a>");else
$('#'+el.id).append("<div class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></div>");$("#cs-"+el.id+i+j).css({'background-position':-sLeft+'px '+(-sTop+'px'),'left':sLeft,'top':sTop});sLeft+=sWidth;}
sTop+=sHeight;sLeft=0;}
$('.cs-'+el.id).mouseover(function(){$('#cs-navigation-'+el.id).show();});$('.cs-'+el.id).mouseout(function(){$('#cs-navigation-'+el.id).hide();});$('#cs-title-'+el.id).mouseover(function(){$('#cs-navigation-'+el.id).show();});$('#cs-title-'+el.id).mouseout(function(){$('#cs-navigation-'+el.id).hide();});if(params[el.id].hoverPause){$('.cs-'+el.id).mouseover(function(){params[el.id].pause=true;});$('.cs-'+el.id).mouseout(function(){params[el.id].pause=false;});$('#cs-title-'+el.id).mouseover(function(){params[el.id].pause=true;});$('#cs-title-'+el.id).mouseout(function(){params[el.id].pause=false;});}};$.transitionCall=function(el){clearInterval(interval[el.id]);delay=params[el.id].delay+params[el.id].spw*params[el.id].sph*params[el.id].sDelay;interval[el.id]=function(){$.transition(el)}}//setInterval(function(){$.transition(el)},delay)
$.transition=function(el,direction){if(params[el.id].pause==true)return;$.effect(el);squarePos[el.id]=0;appInterval[el.id]=setInterval(function(){$.appereance(el,order[el.id][squarePos[el.id]])},params[el.id].sDelay);$(el).css({'background-repeat': 'no-repeat','background-position': '50% 50%','background-image':'url('+images[el.id][imagePos[el.id]]+')'});if(typeof(direction)=="undefined")
imagePos[el.id]++;else
if(direction=='prev')
imagePos[el.id]--;else
imagePos[el.id]=direction;if(imagePos[el.id]==images[el.id].length){imagePos[el.id]=0;}
if(imagePos[el.id]==-1){imagePos[el.id]=images[el.id].length-1;}
$('.cs-button-'+el.id).removeClass('cs-active');$('#cs-button-'+el.id+"-"+(imagePos[el.id]+1)).addClass('cs-active');if(titles[el.id][imagePos[el.id]]){$('#cs-title-'+el.id).css({'opacity':0}).animate({'opacity':params[el.id].opacity},params[el.id].titleSpeed);$('#cs-title-'+el.id).html(titles[el.id][imagePos[el.id]]);}else{$('#cs-title-'+el.id).css('opacity',0);}};$.appereance=function(el,sid){$('.cs-'+el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);if(squarePos[el.id]==params[el.id].spw*params[el.id].sph){clearInterval(appInterval[el.id]);return;}
$('#cs-'+el.id+sid).css({opacity:0,'background-color':'#fff','background-position':'50% 50%','background-repeat': 'no-repeat','background-image':'url('+images[el.id][imagePos[el.id]]+')'});$('#cs-'+el.id+sid).animate({opacity:1},300);squarePos[el.id]++;};$.setNavigation=function(el){$(el).append("<div id='cs-navigation-"+el.id+"'></div>");$('#cs-navigation-'+el.id).hide();$('#cs-navigation-'+el.id).append("<a href='#' id='cs-prev-"+el.id+"' class='cs-prev'>prev</a>");$('#cs-navigation-'+el.id).append("<a href='#' id='cs-next-"+el.id+"' class='cs-next'>next</a>");$('#cs-prev-'+el.id).css({'position':'absolute','top':params[el.id].height/2-15,'left':0,'z-index':1001,'line-height':'30px','opacity':params[el.id].opacity}).click(function(e){e.preventDefault();$.transition(el,'prev');$.transitionCall(el);}).mouseover(function(){$('#cs-navigation-'+el.id).show()});$('#cs-next-'+el.id).css({'position':'absolute','top':params[el.id].height/2-15,'right':0,'z-index':1001,'line-height':'30px','opacity':params[el.id].opacity}).click(function(e){e.preventDefault();$.transition(el);$.transitionCall(el);}).mouseover(function(){$('#cs-navigation-'+el.id).show()});$("<div id='cs-buttons-"+el.id+"' class='cs-buttons'></div>").appendTo($('#coin-slider-'+el.id));for(k=1;k<images[el.id].length+1;k++){$('#cs-buttons-'+el.id).append("<a href='#' class='cs-button-"+el.id+"' id='cs-button-"+el.id+"-"+k+"'>"+k+"</a>");}
$.each($('.cs-button-'+el.id),function(i,item){$(item).click(function(e){$('.cs-button-'+el.id).removeClass('cs-active');$(this).addClass('cs-active');e.preventDefault();$.transition(el,i);$.transitionCall(el);})});$('#cs-navigation-'+el.id+' a').mouseout(function(){$('#cs-navigation-'+el.id).hide();params[el.id].pause=false;});$("#cs-buttons-"+el.id).css({'left':'50%','margin-left':-images[el.id].length*15/2-5,'position':'relative'});}
$.effect=function(el){effA=['random','swirl','rain','straight'];if(params[el.id].effect=='')
eff=effA[Math.floor(Math.random()*(effA.length))];else
eff=params[el.id].effect;order[el.id]=new Array();if(eff=='random'){counter=0;for(i=1;i<=params[el.id].sph;i++){for(j=1;j<=params[el.id].spw;j++){order[el.id][counter]=i+''+j;counter++;}}
$.random(order[el.id]);}
if(eff=='rain'){$.rain(el);}
if(eff=='swirl')
$.swirl(el);if(eff=='straight')
$.straight(el);reverse[el.id]*=-1;if(reverse[el.id]>0){order[el.id].reverse();}}
$.random=function(arr){var i=arr.length;if(i==0)return false;while(--i){var j=Math.floor(Math.random()*(i+1));var tempi=arr[i];var tempj=arr[j];arr[i]=tempj;arr[j]=tempi;}}
$.swirl=function(el){var n=params[el.id].sph;var m=params[el.id].spw;var x=1;var y=1;var going=0;var num=0;var c=0;var dowhile=true;while(dowhile){num=(going==0||going==2)?m:n;for(i=1;i<=num;i++){order[el.id][c]=x+''+y;c++;if(i!=num){switch(going){case 0:y++;break;case 1:x++;break;case 2:y--;break;case 3:x--;break;}}}
going=(going+1)%4;switch(going){case 0:m--;y++;break;case 1:n--;x++;break;case 2:m--;y--;break;case 3:n--;x--;break;}
check=$.max(n,m)-$.min(n,m);if(m<=check&&n<=check)
dowhile=false;}}
$.rain=function(el){var n=params[el.id].sph;var m=params[el.id].spw;var c=0;var to=to2=from=1;var dowhile=true;while(dowhile){for(i=from;i<=to;i++){order[el.id][c]=i+''+parseInt(to2-i+1);c++;}
to2++;if(to<n&&to2<m&&n<m){to++;}
if(to<n&&n>=m){to++;}
if(to2>m){from++;}
if(from>to)dowhile=false;}}
$.straight=function(el){counter=0;for(i=1;i<=params[el.id].sph;i++){for(j=1;j<=params[el.id].spw;j++){order[el.id][counter]=i+''+j;counter++;}}}
$.min=function(n,m){if(n>m)return m;else return n;}
$.max=function(n,m){if(n<m)return m;else return n;}
this.each(function(){init(this);});};$.fn.coinslider.defaults={width:565,height:290,spw:7,sph:5,delay:3000,sDelay:30,opacity:0.7,titleSpeed:500,effect:'',navigation:true,links:true,hoverPause:true};})(jQuery);

/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget 1.12
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($, undefined){

var multiselectID = 0;

$.widget("ech.multiselect", {
	
	// default options
	options: {
		header: true,
		height: 175,
		minWidth: 225,
		classes: '',
		checkAllText: 'Check all',
		uncheckAllText: 'Uncheck all',
		noneSelectedText: 'Select options',
		selectedText: '# selected',
		selectedList: 0,
		show: '',
		hide: '',
		autoOpen: false,
		multiple: true,
		position: {}
	},

	_create: function(){
		var el = this.element.hide(),
			o = this.options;
		
		this.speed = $.fx.speeds._default; // default speed for effects
		this._isOpen = false; // assume no
	
		var 
			button = (this.button = $('<button type="button"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>'))
				.addClass('ui-multiselect ui-widget ui-state-default ui-corner-all')
				.addClass( o.classes )
				.attr({ 'title':el.attr('title'), 'aria-haspopup':true, 'tabIndex':el.attr('tabIndex') })
				.insertAfter( el ),
			
			buttonlabel = (this.buttonlabel = $('<span />'))
				.html( o.noneSelectedText )
				.appendTo( button ),
				
			menu = (this.menu = $('<div />'))
				.addClass('ui-multiselect-menu ui-widget ui-widget-content ui-corner-all')
				.addClass( o.classes )
				.appendTo( document.body ),
				
			header = (this.header = $('<div />'))
				.addClass('ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix')
				.appendTo( menu ),
				
			headerLinkContainer = (this.headerLinkContainer = $('<ul />'))
				.addClass('ui-helper-reset')
				.html(function(){
					if( o.header === true ){
						return '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + '</span></a></li>';
					} else if(typeof o.header === "string"){
						return '<li>' + o.header + '</li>';
					} else {
						return '';
					}
				})
				.append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>')
				.appendTo( header ),
			
			checkboxContainer = (this.checkboxContainer = $('<ul />'))
				.addClass('ui-multiselect-checkboxes ui-helper-reset')
				.appendTo( menu );
		
		// perform event bindings
		this._bindEvents();
		
		// build menu
		this.refresh( true );
		
		// some addl. logic for single selects
		if( !o.multiple ){
			menu.addClass('ui-multiselect-single');
		}
	},
	
	_init: function(){
		if( this.options.header === false ){
			this.header.hide();
		}
		if( !this.options.multiple ){
			this.headerLinkContainer.find('.ui-multiselect-all, .ui-multiselect-none').hide();
		}
		if( this.options.autoOpen ){
			this.open();
		}
		if( this.element.is(':disabled') ){
			this.disable();
		}
	},
	
	refresh: function( init ){
		var el = this.element,
			o = this.options,
			menu = this.menu,
			checkboxContainer = this.checkboxContainer,
			optgroups = [],
			html = "",
			id = el.attr('id') || multiselectID++; // unique ID for the label & option tags
		
		// build items
		el.find('option').each(function( i ){
			var $this = $(this), 
				parent = this.parentNode,
				title = this.innerHTML,
				description = this.title,
				value = this.value,
				inputID = 'ui-multiselect-' + (this.id || id + '-option-' + i),
				isDisabled = this.disabled,
				isSelected = this.selected,
				labelClasses = [ 'ui-corner-all' ],
				optLabel;
			
			// is this an optgroup?
			if( parent.tagName === 'OPTGROUP' ){
				optLabel = parent.getAttribute( 'label' );
				
				// has this optgroup been added already?
				if( $.inArray(optLabel, optgroups) === -1 ){
					html += '<li class="ui-multiselect-optgroup-label"><a href="#">' + optLabel + '</a></li>';
					optgroups.push( optLabel );
				}
			}
		
			if( isDisabled ){
				labelClasses.push( 'ui-state-disabled' );
			}

			// browsers automatically select the first option
			// by default with single selects
			if( isSelected && !o.multiple ){
				labelClasses.push( 'ui-state-active' );
			}
			
			html += '<li class="' + (isDisabled ? 'ui-multiselect-disabled' : '') + '">';
			
			// create the label
			html += '<label for="' + inputID + '" title="' + description + '" class="' + labelClasses.join(' ') + '">';
			html += '<input id="' + inputID + '" name="multiselect_' + id + '" type="' + (o.multiple ? "checkbox" : "radio") + '" value="' + value + '" title="' + title + '"';

			// pre-selected?
			if( isSelected ){
				html += ' checked="checked"';
				html += ' aria-selected="true"';
			}

			// disabled?
			if( isDisabled ){
				html += ' disabled="disabled"';
				html += ' aria-disabled="true"';
			}

			// add the title and close everything off
			html += ' /><span>' + title + '</span></label></li>';
		});
		
		// insert into the DOM
		checkboxContainer.html( html );

		// cache some moar useful elements
		this.labels = menu.find('label');
		this.inputs = this.labels.children('input');
		
		// set widths
		this._setButtonWidth();
		this._setMenuWidth();
		
		// remember default value
		this.button[0].defaultValue = this.update();
		
		// broadcast refresh event; useful for widgets
		if( !init ){
			this._trigger('refresh');
		}
	},
	
	// updates the button text. call refresh() to rebuild
	update: function(){
		var o = this.options,
			$inputs = this.inputs,
			$checked = $inputs.filter(':checked'),
			numChecked = $checked.length,
			value;
		
		if( numChecked === 0 ){
			value = o.noneSelectedText;
		} else {
			if($.isFunction( o.selectedText )){
				value = o.selectedText.call(this, numChecked, $inputs.length, $checked.get());
			} else if( /\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList){
				value = $checked.map(function(){ return $(this).next().html(); }).get().join(', ');
			} else {
				value = o.selectedText.replace('#', numChecked).replace('#', $inputs.length);
			}
		}
		
		this.buttonlabel.html( value );
		return value;
	},
	
	// binds events
	_bindEvents: function(){
		var self = this, button = this.button;
		
		function clickHandler(){
			self[ self._isOpen ? 'close' : 'open' ]();
			return false;
		}
		
		// webkit doesn't like it when you click on the span :(
		button
			.find('span')
			.bind('click.multiselect', clickHandler);
		
		// button events
		button.bind({
			click: clickHandler,
			keypress: function( e ){
				switch(e.which){
					case 27: // esc
					case 38: // up
					case 37: // left
						self.close();
						break;
					case 39: // right
					case 40: // down
						self.open();
						break;
				}
			},
			mouseenter: function(){
				if( !button.hasClass('ui-state-disabled') ){
					$(this).addClass('ui-state-hover');
				}
			},
			mouseleave: function(){
				$(this).removeClass('ui-state-hover');
			},
			focus: function(){
				if( !button.hasClass('ui-state-disabled') ){
					$(this).addClass('ui-state-focus');
				}
			},
			blur: function(){
				$(this).removeClass('ui-state-focus');
			}
		});

		// header links
		this.header
			.delegate('a', 'click.multiselect', function( e ){
				// close link
				if( $(this).hasClass('ui-multiselect-close') ){
					self.close();
			
				// check all / uncheck all
				} else {
					self[ $(this).hasClass('ui-multiselect-all') ? 'checkAll' : 'uncheckAll' ]();
				}
			
				e.preventDefault();
			});
		
		// optgroup label toggle support
		this.menu
			.delegate('li.ui-multiselect-optgroup-label a', 'click.multiselect', function( e ){
				e.preventDefault();
				
				var $this = $(this),
					$inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input:visible:not(:disabled)'),
					nodes = $inputs.get(),
					label = $this.parent().text();

				// trigger event and bail if the return is false
				if( self._trigger('beforeoptgrouptoggle', e, { inputs:nodes, label:label }) === false ){
					return;
				}
				
				// toggle inputs
				self._toggleChecked(
					$inputs.filter(':checked').length !== $inputs.length,
					$inputs
				);

				self._trigger('optgrouptoggle', e, {
				    inputs: nodes,
				    label: label,
				    checked: nodes[0].checked
				});
			})
			.delegate('label', 'mouseenter.multiselect', function(){
				if( !$(this).hasClass('ui-state-disabled') ){
					self.labels.removeClass('ui-state-hover');
					$(this).addClass('ui-state-hover').find('input').focus();
				}
			})
			.delegate('label', 'keydown.multiselect', function( e ){
				e.preventDefault();
				
				switch(e.which){
					case 9: // tab
					case 27: // esc
						self.close();
						break;
					case 38: // up
					case 40: // down
					case 37: // left
					case 39: // right
						self._traverse(e.which, this);
						break;
					case 13: // enter
						$(this).find('input')[0].click();
						break;
				}
			})
			.delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function( e ){
				var $this = $(this),
					val = this.value,
					checked = this.checked,
					tags = self.element.find('option');
				
				// bail if this input is disabled or the event is cancelled
				if( this.disabled || self._trigger('click', e, { value: val, text: this.title, checked: checked }) === false ){
					e.preventDefault();
					return;
				}

				// make sure the input has focus. otherwise, the esc key
				// won't close the menu after clicking an item.
				$this.focus();
				
				// toggle aria state
				$this.attr('aria-selected', checked);
				
				// change state on the original option tags
				tags.each(function(){
					if( this.value === val ){
						this.selected = checked;
					} else if( !self.options.multiple ){
						this.selected = false;
					}
				});
				
				// some additional single select-specific logic
				if( !self.options.multiple ){
					self.labels.removeClass('ui-state-active');
					$this.closest('label').toggleClass('ui-state-active', checked );
					
					// close menu
					self.close();
				}

				// fire change on the select box
				self.element.trigger("change");
				
				// setTimeout is to fix multiselect issue #14 and #47. caused by jQuery issue #3827
				// http://bugs.jquery.com/ticket/3827 
				setTimeout($.proxy(self.update, self), 10);
			});

		// close each widget when clicking on any other element/anywhere else on the page
		$(document).bind('mousedown.multiselect', function( e ){
			if(self._isOpen && !$.contains(self.menu[0], e.target) && !$.contains(self.button[0], e.target) && e.target !== self.button[0]){
				self.close();
			}
		});

		// deal with form resets.  the problem here is that buttons aren't
		// restored to their defaultValue prop on form reset, and the reset
		// handler fires before the form is actually reset.  delaying it a bit
		// gives the form inputs time to clear.
		$(this.element[0].form).bind('reset.multiselect', function(){
			setTimeout($.proxy(self.refresh, self), 10);
		});
	},

	// set button width
	_setButtonWidth: function(){
		var width = this.element.outerWidth(),
			o = this.options;
			
		if( /\d/.test(o.minWidth) && width < o.minWidth){
			width = o.minWidth;
		}
		
		// set widths
		this.button.width( width );
	},
	
	// set menu width
	_setMenuWidth: function(){
		var m = this.menu,
			width = this.button.outerWidth()-
				parseInt(m.css('padding-left'),10)-
				parseInt(m.css('padding-right'),10)-
				parseInt(m.css('border-right-width'),10)-
				parseInt(m.css('border-left-width'),10);
				
		m.width( width || this.button.outerWidth() );
	},
	
	// move up or down within the menu
	_traverse: function( which, start ){
		var $start = $(start),
			moveToLast = which === 38 || which === 37,
			
			// select the first li that isn't an optgroup label / disabled
			$next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)')[ moveToLast ? 'last' : 'first']();
		
		// if at the first/last element
		if( !$next.length ){
			var $container = this.menu.find('ul').last();
			
			// move to the first/last
			this.menu.find('label')[ moveToLast ? 'last' : 'first' ]().trigger('mouseover');
			
			// set scroll position
			$container.scrollTop( moveToLast ? $container.height() : 0 );
			
		} else {
			$next.find('label').trigger('mouseover');
		}
	},

	// This is an internal function to toggle the checked property and
	// other related attributes of a checkbox.
	//
	// The context of this function should be a checkbox; do not proxy it.
	_toggleState: function( prop, flag ){
		return function(){
			if( !this.disabled ) {
				this[ prop ] = flag;
			}

			if( flag ){
				this.setAttribute('aria-selected', true);
			} else {
				this.removeAttribute('aria-selected');
			}
		};
	},

	_toggleChecked: function( flag, group ){
		var $inputs = (group && group.length) ?  group : this.inputs,
			self = this;

		// toggle state on inputs
		$inputs.each(this._toggleState('checked', flag));

		// give the first input focus
		$inputs.eq(0).focus();
		
		// update button text
		this.update();
		
		// gather an array of the values that actually changed
		var values = $inputs.map(function(){
			return this.value;
		}).get();

		// toggle state on original option tags
		this.element
			.find('option')
			.each(function(){
				if( !this.disabled && $.inArray(this.value, values) > -1 ){
					self._toggleState('selected', flag).call( this );
				}
			});

		// trigger the change event on the select
		if( $inputs.length ) {
			this.element.trigger("change");
		}
	},

	_toggleDisabled: function( flag ){
		this.button
			.attr({ 'disabled':flag, 'aria-disabled':flag })[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');
		
		var inputs = this.menu.find('input');
		var key = "ech-multiselect-disabled";

		if(flag) {
			// remember which elements this widget disabled (not pre-disabled)
			// elements, so that they can be restored if the widget is re-enabled.
			inputs = inputs.filter(':enabled')
				.data(key, true)
		} else {
			inputs = inputs.filter(function() {
				return $.data(this, key) === true;
			}).removeData(key);
		}

		inputs
			.attr({ 'disabled':flag, 'arial-disabled':flag })
			.parent()[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');

		this.element
			.attr({ 'disabled':flag, 'aria-disabled':flag });
	},
	
	// open the menu
	open: function( e ){
		var self = this,
			button = this.button,
			menu = this.menu,
			speed = this.speed,
			o = this.options;
		
		// bail if the multiselectopen event returns false, this widget is disabled, or is already open 
		if( this._trigger('beforeopen') === false || button.hasClass('ui-state-disabled') || this._isOpen ){
			return;
		}
		
		var $container = menu.find('ul').last(),
			effect = o.show,
			pos = button.offset();
		
		// figure out opening effects/speeds
		if( $.isArray(o.show) ){
			effect = o.show[0];
			speed = o.show[1] || self.speed;
		}
		
		// set the scroll of the checkbox container
		$container.scrollTop(0).height(o.height);
		
		// position and show menu
		if( $.ui.position && !$.isEmptyObject(o.position) ){
			o.position.of = o.position.of || button;
			
			menu
				.show()
				.position( o.position )
				.hide()
				.show( effect, speed );
		
		// if position utility is not available...
		} else {
			menu.css({ 
				top: pos.top + button.outerHeight(),
				left: pos.left
			}).show( effect, speed );
		}
		
		// select the first option
		// triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
		// will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
		this.labels.eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');
		
		button.addClass('ui-state-active');
		this._isOpen = true;
		this._trigger('open');
	},
	
	// close the menu
	close: function(){
		if(this._trigger('beforeclose') === false){
			return;
		}
	
		var o = this.options, effect = o.hide, speed = this.speed;
		
		// figure out opening effects/speeds
		if( $.isArray(o.hide) ){
			effect = o.hide[0];
			speed = o.hide[1] || this.speed;
		}
	
		this.menu.hide(effect, speed);
		this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
		this._isOpen = false;
		this._trigger('close');
	},

	enable: function(){
		this._toggleDisabled(false);
	},
	
	disable: function(){
		this._toggleDisabled(true);
	},
	
	checkAll: function( e ){
		this._toggleChecked(true);
		this._trigger('checkAll');
	},
	
	uncheckAll: function(){
		this._toggleChecked(false);
		this._trigger('uncheckAll');
	},
	
	getChecked: function(){
		return this.menu.find('input').filter(':checked');
	},
	
	destroy: function(){
		// remove classes + data
		$.Widget.prototype.destroy.call( this );
		
		this.button.remove();
		this.menu.remove();
		this.element.show();
		
		return this;
	},
	
	isOpen: function(){
		return this._isOpen;
	},
	
	widget: function(){
		return this.menu;
	},

	getButton: function(){
	  return this.button;
  },
	
	// react to option changes after initialization
	_setOption: function( key, value ){
		var menu = this.menu;
		
		switch(key){
			case 'header':
				menu.find('div.ui-multiselect-header')[ value ? 'show' : 'hide' ]();
				break;
			case 'checkAllText':
				menu.find('a.ui-multiselect-all span').eq(-1).text(value);
				break;
			case 'uncheckAllText':
				menu.find('a.ui-multiselect-none span').eq(-1).text(value);
				break;
			case 'height':
				menu.find('ul').last().height( parseInt(value,10) );
				break;
			case 'minWidth':
				this.options[ key ] = parseInt(value,10);
				this._setButtonWidth();
				this._setMenuWidth();
				break;
			case 'selectedText':
			case 'selectedList':
			case 'noneSelectedText':
				this.options[key] = value; // these all needs to update immediately for the update() call
				this.update();
				break;
			case 'classes':
				menu.add(this.button).removeClass(this.options.classes).addClass(value);
				break;
			case 'multiple':
				menu.toggleClass('ui-multiselect-single', !value);
				this.options.multiple = value;
				this.element[0].multiple = value;
				this.refresh();
		}
		
		$.Widget.prototype._setOption.apply( this, arguments );
	}
});

})(jQuery);


/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.4
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery UI MultiSelect widget
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($){
	var rEscape = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;
	
	$.widget("ech.multiselectfilter", {
		
		options: {
			label: "Filter:",
			width: null, /* override default width set in css file (px). null will inherit */
			placeholder: "Enter keywords",
			autoReset: false
		},
		
		_create: function(){
			var self = this,
				opts = this.options,
				instance = (this.instance = $(this.element).data("multiselect")),
				
				// store header; add filter class so the close/check all/uncheck all links can be positioned correctly
				header = (this.header = instance.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter")),
				
				// wrapper elem
				wrapper = (this.wrapper = $('<div class="ui-multiselect-filter">'+(opts.label.length ? opts.label : '')+'<input placeholder="'+opts.placeholder+'" type="search"' + (/\d/.test(opts.width) ? 'style="width:'+opts.width+'px"' : '') + ' /></div>').prependTo( this.header ));

			// reference to the actual inputs
			this.inputs = instance.menu.find('input[type="checkbox"], input[type="radio"]');
			
			// build the input box
			this.input = wrapper
			.find("input")
			.bind({
				keydown: function( e ){
					// prevent the enter key from submitting the form / closing the widget
					if( e.which === 13 ){
						e.preventDefault();
					}
				},
				keyup: $.proxy(self._handler, self),
				click: $.proxy(self._handler, self)
			});
			
			// cache input values for searching
			this.updateCache();
			
			// rewrite internal _toggleChecked fn so that when checkAll/uncheckAll is fired,
			// only the currently filtered elements are checked
			instance._toggleChecked = function(flag, group){
				var $inputs = (group && group.length) ?
						group :
						this.labels.find('input'),
					
					_self = this,

					// do not include hidden elems if the menu isn't open.
					selector = self.instance._isOpen ?
						":disabled, :hidden" :
						":disabled";

				$inputs = $inputs.not( selector ).each(this._toggleState('checked', flag));
				
				// update text
				this.update();
				
				// figure out which option tags need to be selected
				var values = $inputs.map(function(){
					return this.value;
				}).get();
				
				// select option tags
				this.element
					.find('option')
					.filter(function(){
						if( !this.disabled && $.inArray(this.value, values) > -1 ){
							_self._toggleState('selected', flag).call( this );
						}
					});
			};
			
			// rebuild cache when multiselect is updated
			var doc = $(document).bind("multiselectrefresh", function(){
				self.updateCache();
				self._handler();
			});

			// automatically reset the widget on close?
			if(this.options.autoReset) {
				doc.bind("multiselectclose", $.proxy(this._reset, this));
			}
		},
		
		// thx for the logic here ben alman
		_handler: function( e ){
			var term = $.trim( this.input[0].value.toLowerCase() ),
			
				// speed up lookups
				rows = this.rows, inputs = this.inputs, cache = this.cache;
			
			if( !term ){
				rows.show();
			} else {
				rows.hide();
				
				var regex = new RegExp(term.replace(rEscape, "\\$&"), 'gi');
				
				this._trigger( "filter", e, $.map(cache, function(v, i){
					if( v.search(regex) !== -1 ){
						rows.eq(i).show();
						return inputs.get(i);
					}
					
					return null;
				}));
			}

			// show/hide optgroups
			this.instance.menu.find(".ui-multiselect-optgroup-label").each(function(){
				var $this = $(this);
				var isVisible = $this.nextUntil('.ui-multiselect-optgroup-label').filter(function(){
				  return $.css(this, "display") !== 'none';
				}).length;
				
				$this[ isVisible ? 'show' : 'hide' ]();
			});
		},

		_reset: function() {
			this.input.val('').trigger('keyup');
		},
		
		updateCache: function(){
			// each list item
			this.rows = this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");
			
			// cache
			this.cache = this.element.children().map(function(){
				var self = $(this);
				
				// account for optgroups
				if( this.tagName.toLowerCase() === "optgroup" ){
					self = self.children();
				}
				
				return self.map(function(){
					return this.innerHTML.toLowerCase();
				}).get();
			}).get();
		},
		
		widget: function(){
			return this.wrapper;
		},
		
		destroy: function(){
			$.Widget.prototype.destroy.call( this );
			this.input.val('').trigger("keyup");
			this.wrapper.remove();
		}
	});
})(jQuery);


// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview
 * some functions for browser-side pretty printing of code contained in html.
 * <p>
 *
 * For a fairly comprehensive set of languages see the
 * <a href="http://google-code-prettify.googlecode.com/svn/trunk/README.html#langs">README</a>
 * file that came with this source.  At a minimum, the lexer should work on a
 * number of languages including C and friends, Java, Python, Bash, SQL, HTML,
 * XML, CSS, Javascript, and Makefiles.  It works passably on Ruby, PHP and Awk
 * and a subset of Perl, but, because of commenting conventions, doesn't work on
 * Smalltalk, Lisp-like, or CAML-like languages without an explicit lang class.
 * <p>
 * Usage: <ol>
 * <li> include this source file in an html page via
 *   {@code <script type="text/javascript" src="/path/to/prettify.js"></script>}
 * <li> define style rules.  See the example page for examples.
 * <li> mark the {@code <pre>} and {@code <code>} tags in your source with
 *    {@code class=prettyprint.}
 *    You can also use the (html deprecated) {@code <xmp>} tag, but the pretty
 *    printer needs to do more substantial DOM manipulations to support that, so
 *    some css styles may not be preserved.
 * </ol>
 * That's it.  I wanted to keep the API as simple as possible, so there's no
 * need to specify which language the code is in, but if you wish, you can add
 * another class to the {@code <pre>} or {@code <code>} element to specify the
 * language, as in {@code <pre class="prettyprint lang-java">}.  Any class that
 * starts with "lang-" followed by a file extension, specifies the file type.
 * See the "lang-*.js" files in this directory for code that implements
 * per-language file handlers.
 * <p>
 * Change log:<br>
 * cbeust, 2006/08/22
 * <blockquote>
 *   Java annotations (start with "@") are now captured as literals ("lit")
 * </blockquote>
 * @requires console
 * @overrides window
 */

// JSLint declarations
/*global console, document, navigator, setTimeout, window */

/**
 * Split {@code prettyPrint} into multiple timeouts so as not to interfere with
 * UI events.
 * If set to {@code false}, {@code prettyPrint()} is synchronous.
 */
window['PR_SHOULD_USE_CONTINUATION'] = true;

/** the number of characters between tab columns */
window['PR_TAB_WIDTH'] = 8;

/** Walks the DOM returning a properly escaped version of innerHTML.
  * @param {Node} node
  * @param {Array.<string>} out output buffer that receives chunks of HTML.
  */
window['PR_normalizedHtml']

/** Contains functions for creating and registering new language handlers.
  * @type {Object}
  */
  = window['PR']

/** Pretty print a chunk of code.
  *
  * @param {string} sourceCodeHtml code as html
  * @return {string} code as html, but prettier
  */
  = window['prettyPrintOne']
/** Find all the {@code <pre>} and {@code <code>} tags in the DOM with
  * {@code class=prettyprint} and prettify them.
  * @param {Function?} opt_whenDone if specified, called when the last entry
  *     has been finished.
  */
  = window['prettyPrint'] = void 0;

/** browser detection. @extern @returns false if not IE, otherwise the major version. */
window['_pr_isIE6'] = function () {
  var ieVersion = navigator && navigator.userAgent &&
      navigator.userAgent.match(/\bMSIE ([678])\./);
  ieVersion = ieVersion ? +ieVersion[1] : false;
  window['_pr_isIE6'] = function () { return ieVersion; };
  return ieVersion;
};


(function () {
  // Keyword lists for various languages.
  var FLOW_CONTROL_KEYWORDS =
      "break continue do else for if return while ";
  var C_KEYWORDS = FLOW_CONTROL_KEYWORDS + "auto case char const default " +
      "double enum extern float goto int long register short signed sizeof " +
      "static struct switch typedef union unsigned void volatile ";
  var COMMON_KEYWORDS = C_KEYWORDS + "catch class delete false import " +
      "new operator private protected public this throw true try typeof ";
  var CPP_KEYWORDS = COMMON_KEYWORDS + "alignof align_union asm axiom bool " +
      "concept concept_map const_cast constexpr decltype " +
      "dynamic_cast explicit export friend inline late_check " +
      "mutable namespace nullptr reinterpret_cast static_assert static_cast " +
      "template typeid typename using virtual wchar_t where ";
  var JAVA_KEYWORDS = COMMON_KEYWORDS +
      "abstract boolean byte extends final finally implements import " +
      "instanceof null native package strictfp super synchronized throws " +
      "transient ";
  var CSHARP_KEYWORDS = JAVA_KEYWORDS +
      "as base by checked decimal delegate descending event " +
      "fixed foreach from group implicit in interface internal into is lock " +
      "object out override orderby params partial readonly ref sbyte sealed " +
      "stackalloc string select uint ulong unchecked unsafe ushort var ";
  var JSCRIPT_KEYWORDS = COMMON_KEYWORDS +
      "debugger eval export function get null set undefined var with " +
      "Infinity NaN ";
  var PERL_KEYWORDS = "caller delete die do dump elsif eval exit foreach for " +
      "goto if import last local my next no our print package redo require " +
      "sub undef unless until use wantarray while BEGIN END ";
  var PYTHON_KEYWORDS = FLOW_CONTROL_KEYWORDS + "and as assert class def del " +
      "elif except exec finally from global import in is lambda " +
      "nonlocal not or pass print raise try with yield " +
      "False True None ";
  var RUBY_KEYWORDS = FLOW_CONTROL_KEYWORDS + "alias and begin case class def" +
      " defined elsif end ensure false in module next nil not or redo rescue " +
      "retry self super then true undef unless until when yield BEGIN END ";
  var SH_KEYWORDS = FLOW_CONTROL_KEYWORDS + "case done elif esac eval fi " +
      "function in local set then until ";
  var ALL_KEYWORDS = (
      CPP_KEYWORDS + CSHARP_KEYWORDS + JSCRIPT_KEYWORDS + PERL_KEYWORDS +
      PYTHON_KEYWORDS + RUBY_KEYWORDS + SH_KEYWORDS);

  // token style names.  correspond to css classes
  /** token style for a string literal */
  var PR_STRING = 'str';
  /** token style for a keyword */
  var PR_KEYWORD = 'kwd';
  /** token style for a comment */
  var PR_COMMENT = 'com';
  /** token style for a type */
  var PR_TYPE = 'typ';
  /** token style for a literal value.  e.g. 1, null, true. */
  var PR_LITERAL = 'lit';
  /** token style for a punctuation string. */
  var PR_PUNCTUATION = 'pun';
  /** token style for a punctuation string. */
  var PR_PLAIN = 'pln';

  /** token style for an sgml tag. */
  var PR_TAG = 'tag';
  /** token style for a markup declaration such as a DOCTYPE. */
  var PR_DECLARATION = 'dec';
  /** token style for embedded source. */
  var PR_SOURCE = 'src';
  /** token style for an sgml attribute name. */
  var PR_ATTRIB_NAME = 'atn';
  /** token style for an sgml attribute value. */
  var PR_ATTRIB_VALUE = 'atv';

  /**
   * A class that indicates a section of markup that is not code, e.g. to allow
   * embedding of line numbers within code listings.
   */
  var PR_NOCODE = 'nocode';

  /** A set of tokens that can precede a regular expression literal in
    * javascript.
    * http://www.mozilla.org/js/language/js20/rationale/syntax.html has the full
    * list, but I've removed ones that might be problematic when seen in
    * languages that don't support regular expression literals.
    *
    * <p>Specifically, I've removed any keywords that can't precede a regexp
    * literal in a syntactically legal javascript program, and I've removed the
    * "in" keyword since it's not a keyword in many languages, and might be used
    * as a count of inches.
    *
    * <p>The link a above does not accurately describe EcmaScript rules since
    * it fails to distinguish between (a=++/b/i) and (a++/b/i) but it works
    * very well in practice.
    *
    * @private
    */
  var REGEXP_PRECEDER_PATTERN = function () {
      var preceders = [
          "!", "!=", "!==", "#", "%", "%=", "&", "&&", "&&=",
          "&=", "(", "*", "*=", /* "+", */ "+=", ",", /* "-", */ "-=",
          "->", /*".", "..", "...", handled below */ "/", "/=", ":", "::", ";",
          "<", "<<", "<<=", "<=", "=", "==", "===", ">",
          ">=", ">>", ">>=", ">>>", ">>>=", "?", "@", "[",
          "^", "^=", "^^", "^^=", "{", "|", "|=", "||",
          "||=", "~" /* handles =~ and !~ */,
          "break", "case", "continue", "delete",
          "do", "else", "finally", "instanceof",
          "return", "throw", "try", "typeof"
          ];
      var pattern = '(?:^^|[+-]';
      for (var i = 0; i < preceders.length; ++i) {
        pattern += '|' + preceders[i].replace(/([^=<>:&a-z])/g, '\\$1');
      }
      pattern += ')\\s*';  // matches at end, and matches empty string
      return pattern;
      // CAVEAT: this does not properly handle the case where a regular
      // expression immediately follows another since a regular expression may
      // have flags for case-sensitivity and the like.  Having regexp tokens
      // adjacent is not valid in any language I'm aware of, so I'm punting.
      // TODO: maybe style special characters inside a regexp as punctuation.
    }();

  // Define regexps here so that the interpreter doesn't have to create an
  // object each time the function containing them is called.
  // The language spec requires a new object created even if you don't access
  // the $1 members.
  var pr_amp = /&/g;
  var pr_lt = /</g;
  var pr_gt = />/g;
  var pr_quot = /\"/g;
  /** like textToHtml but escapes double quotes to be attribute safe. */
  function attribToHtml(str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;')
        .replace(pr_quot, '&quot;');
  }

  /** escapest html special characters to html. */
  function textToHtml(str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;');
  }


  var pr_ltEnt = /&lt;/g;
  var pr_gtEnt = /&gt;/g;
  var pr_aposEnt = /&apos;/g;
  var pr_quotEnt = /&quot;/g;
  var pr_ampEnt = /&amp;/g;
  var pr_nbspEnt = /&nbsp;/g;
  /** unescapes html to plain text. */
  function htmlToText(html) {
    var pos = html.indexOf('&');
    if (pos < 0) { return html; }
    // Handle numeric entities specially.  We can't use functional substitution
    // since that doesn't work in older versions of Safari.
    // These should be rare since most browsers convert them to normal chars.
    for (--pos; (pos = html.indexOf('&#', pos + 1)) >= 0;) {
      var end = html.indexOf(';', pos);
      if (end >= 0) {
        var num = html.substring(pos + 3, end);
        var radix = 10;
        if (num && num.charAt(0) === 'x') {
          num = num.substring(1);
          radix = 16;
        }
        var codePoint = parseInt(num, radix);
        if (!isNaN(codePoint)) {
          html = (html.substring(0, pos) + String.fromCharCode(codePoint) +
                  html.substring(end + 1));
        }
      }
    }

    return html.replace(pr_ltEnt, '<')
        .replace(pr_gtEnt, '>')
        .replace(pr_aposEnt, "'")
        .replace(pr_quotEnt, '"')
        .replace(pr_nbspEnt, ' ')
        .replace(pr_ampEnt, '&');
  }

  /** is the given node's innerHTML normally unescaped? */
  function isRawContent(node) {
    return 'XMP' === node.tagName;
  }

  var newlineRe = /[\r\n]/g;
  /**
   * Are newlines and adjacent spaces significant in the given node's innerHTML?
   */
  function isPreformatted(node, content) {
    // PRE means preformatted, and is a very common case, so don't create
    // unnecessary computed style objects.
    if ('PRE' === node.tagName) { return true; }
    if (!newlineRe.test(content)) { return true; }  // Don't care
    var whitespace = '';
    // For disconnected nodes, IE has no currentStyle.
    if (node.currentStyle) {
      whitespace = node.currentStyle.whiteSpace;
    } else if (window.getComputedStyle) {
      // Firefox makes a best guess if node is disconnected whereas Safari
      // returns the empty string.
      whitespace = window.getComputedStyle(node, null).whiteSpace;
    }
    return !whitespace || whitespace === 'pre';
  }

  function normalizedHtml(node, out) {
    switch (node.nodeType) {
      case 1:  // an element
        var name = node.tagName.toLowerCase();
        out.push('<', name);
        for (var i = 0; i < node.attributes.length; ++i) {
          var attr = node.attributes[i];
          if (!attr.specified) { continue; }
          out.push(' ');
          normalizedHtml(attr, out);
        }
        out.push('>');
        for (var child = node.firstChild; child; child = child.nextSibling) {
          normalizedHtml(child, out);
        }
        if (node.firstChild || !/^(?:br|link|img)$/.test(name)) {
          out.push('<\/', name, '>');
        }
        break;
      case 2: // an attribute
        out.push(node.name.toLowerCase(), '="', attribToHtml(node.value), '"');
        break;
      case 3: case 4: // text
        out.push(textToHtml(node.nodeValue));
        break;
    }
  }

  /**
   * Given a group of {@link RegExp}s, returns a {@code RegExp} that globally
   * matches the union o the sets o strings matched d by the input RegExp.
   * Since it matches globally, if the input strings have a start-of-input
   * anchor (/^.../), it is ignored for the purposes of unioning.
   * @param {Array.<RegExp>} regexs non multiline, non-global regexs.
   * @return {RegExp} a global regex.
   */
  function combinePrefixPatterns(regexs) {
    var capturedGroupIndex = 0;

    var needToFoldCase = false;
    var ignoreCase = false;
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.ignoreCase) {
        ignoreCase = true;
      } else if (/[a-z]/i.test(regex.source.replace(
                     /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
        needToFoldCase = true;
        ignoreCase = false;
        break;
      }
    }

    function decodeEscape(charsetPart) {
      if (charsetPart.charAt(0) !== '\\') { return charsetPart.charCodeAt(0); }
      switch (charsetPart.charAt(1)) {
        case 'b': return 8;
        case 't': return 9;
        case 'n': return 0xa;
        case 'v': return 0xb;
        case 'f': return 0xc;
        case 'r': return 0xd;
        case 'u': case 'x':
          return parseInt(charsetPart.substring(2), 16)
              || charsetPart.charCodeAt(1);
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7':
          return parseInt(charsetPart.substring(1), 8);
        default: return charsetPart.charCodeAt(1);
      }
    }

    function encodeEscape(charCode) {
      if (charCode < 0x20) {
        return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
      }
      var ch = String.fromCharCode(charCode);
      if (ch === '\\' || ch === '-' || ch === '[' || ch === ']') {
        ch = '\\' + ch;
      }
      return ch;
    }

    function caseFoldCharset(charSet) {
      var charsetParts = charSet.substring(1, charSet.length - 1).match(
          new RegExp(
              '\\\\u[0-9A-Fa-f]{4}'
              + '|\\\\x[0-9A-Fa-f]{2}'
              + '|\\\\[0-3][0-7]{0,2}'
              + '|\\\\[0-7]{1,2}'
              + '|\\\\[\\s\\S]'
              + '|-'
              + '|[^-\\\\]',
              'g'));
      var groups = [];
      var ranges = [];
      var inverse = charsetParts[0] === '^';
      for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
        var p = charsetParts[i];
        switch (p) {
          case '\\B': case '\\b':
          case '\\D': case '\\d':
          case '\\S': case '\\s':
          case '\\W': case '\\w':
            groups.push(p);
            continue;
        }
        var start = decodeEscape(p);
        var end;
        if (i + 2 < n && '-' === charsetParts[i + 1]) {
          end = decodeEscape(charsetParts[i + 2]);
          i += 2;
        } else {
          end = start;
        }
        ranges.push([start, end]);
        // If the range might intersect letters, then expand it.
        if (!(end < 65 || start > 122)) {
          if (!(end < 65 || start > 90)) {
            ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
          }
          if (!(end < 97 || start > 122)) {
            ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
          }
        }
      }

      // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
      // -> [[1, 12], [14, 14], [16, 17]]
      ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
      var consolidatedRanges = [];
      var lastRange = [NaN, NaN];
      for (var i = 0; i < ranges.length; ++i) {
        var range = ranges[i];
        if (range[0] <= lastRange[1] + 1) {
          lastRange[1] = Math.max(lastRange[1], range[1]);
        } else {
          consolidatedRanges.push(lastRange = range);
        }
      }

      var out = ['['];
      if (inverse) { out.push('^'); }
      out.push.apply(out, groups);
      for (var i = 0; i < consolidatedRanges.length; ++i) {
        var range = consolidatedRanges[i];
        out.push(encodeEscape(range[0]));
        if (range[1] > range[0]) {
          if (range[1] + 1 > range[0]) { out.push('-'); }
          out.push(encodeEscape(range[1]));
        }
      }
      out.push(']');
      return out.join('');
    }

    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
      // Split into character sets, escape sequences, punctuation strings
      // like ('(', '(?:', ')', '^'), and runs of characters that do not
      // include any of the above.
      var parts = regex.source.match(
          new RegExp(
              '(?:'
              + '\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'  // a character set
              + '|\\\\u[A-Fa-f0-9]{4}'  // a unicode escape
              + '|\\\\x[A-Fa-f0-9]{2}'  // a hex escape
              + '|\\\\[0-9]+'  // a back-reference or octal escape
              + '|\\\\[^ux0-9]'  // other escape sequence
              + '|\\(\\?[:!=]'  // start of a non-capturing group
              + '|[\\(\\)\\^]'  // start/emd of a group, or line start
              + '|[^\\x5B\\x5C\\(\\)\\^]+'  // run of other characters
              + ')',
              'g'));
      var n = parts.length;

      // Maps captured group numbers to the number they will occupy in
      // the output or to -1 if that has not been determined, or to
      // undefined if they need not be capturing in the output.
      var capturedGroups = [];

      // Walk over and identify back references to build the capturedGroups
      // mapping.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          // groups are 1-indexed, so max group index is count of '('
          ++groupIndex;
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            capturedGroups[decimalValue] = -1;
          }
        }
      }

      // Renumber groups and reduce capturing groups to non-capturing groups
      // where possible.
      for (var i = 1; i < capturedGroups.length; ++i) {
        if (-1 === capturedGroups[i]) {
          capturedGroups[i] = ++capturedGroupIndex;
        }
      }
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          ++groupIndex;
          if (capturedGroups[groupIndex] === undefined) {
            parts[i] = '(?:';
          }
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            parts[i] = '\\' + capturedGroups[groupIndex];
          }
        }
      }

      // Remove any prefix anchors so that the output will match anywhere.
      // ^^ really does mean an anchored match though.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        if ('^' === parts[i] && '^' !== parts[i + 1]) { parts[i] = ''; }
      }

      // Expand letters to groupts to handle mixing of case-sensitive and
      // case-insensitive patterns if necessary.
      if (regex.ignoreCase && needToFoldCase) {
        for (var i = 0; i < n; ++i) {
          var p = parts[i];
          var ch0 = p.charAt(0);
          if (p.length >= 2 && ch0 === '[') {
            parts[i] = caseFoldCharset(p);
          } else if (ch0 !== '\\') {
            // TODO: handle letters in numeric escapes.
            parts[i] = p.replace(
                /[a-zA-Z]/g,
                function (ch) {
                  var cc = ch.charCodeAt(0);
                  return '[' + String.fromCharCode(cc & ~32, cc | 32) + ']';
                });
          }
        }
      }

      return parts.join('');
    }

    var rewritten = [];
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.global || regex.multiline) { throw new Error('' + regex); }
      rewritten.push(
          '(?:' + allowAnywhereFoldCaseAndRenumberGroups(regex) + ')');
    }

    return new RegExp(rewritten.join('|'), ignoreCase ? 'gi' : 'g');
  }

  var PR_innerHtmlWorks = null;
  function getInnerHtml(node) {
    // inner html is hopelessly broken in Safari 2.0.4 when the content is
    // an html description of well formed XML and the containing tag is a PRE
    // tag, so we detect that case and emulate innerHTML.
    if (null === PR_innerHtmlWorks) {
      var testNode = document.createElement('PRE');
      testNode.appendChild(
          document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
      PR_innerHtmlWorks = !/</.test(testNode.innerHTML);
    }

    if (PR_innerHtmlWorks) {
      var content = node.innerHTML;
      // XMP tags contain unescaped entities so require special handling.
      if (isRawContent(node)) {
        content = textToHtml(content);
      } else if (!isPreformatted(node, content)) {
        content = content.replace(/(<br\s*\/?>)[\r\n]+/g, '$1')
            .replace(/(?:[\r\n]+[ \t]*)+/g, ' ');
      }
      return content;
    }

    var out = [];
    for (var child = node.firstChild; child; child = child.nextSibling) {
      normalizedHtml(child, out);
    }
    return out.join('');
  }

  /** returns a function that expand tabs to spaces.  This function can be fed
    * successive chunks of text, and will maintain its own internal state to
    * keep track of how tabs are expanded.
    * @return {function (string) : string} a function that takes
    *   plain text and return the text with tabs expanded.
    * @private
    */
  function makeTabExpander(tabWidth) {
    var SPACES = '                ';
    var charInLine = 0;

    return function (plainText) {
      // walk over each character looking for tabs and newlines.
      // On tabs, expand them.  On newlines, reset charInLine.
      // Otherwise increment charInLine
      var out = null;
      var pos = 0;
      for (var i = 0, n = plainText.length; i < n; ++i) {
        var ch = plainText.charAt(i);

        switch (ch) {
          case '\t':
            if (!out) { out = []; }
            out.push(plainText.substring(pos, i));
            // calculate how much space we need in front of this part
            // nSpaces is the amount of padding -- the number of spaces needed
            // to move us to the next column, where columns occur at factors of
            // tabWidth.
            var nSpaces = tabWidth - (charInLine % tabWidth);
            charInLine += nSpaces;
            for (; nSpaces >= 0; nSpaces -= SPACES.length) {
              out.push(SPACES.substring(0, nSpaces));
            }
            pos = i + 1;
            break;
          case '\n':
            charInLine = 0;
            break;
          default:
            ++charInLine;
        }
      }
      if (!out) { return plainText; }
      out.push(plainText.substring(pos));
      return out.join('');
    };
  }

  var pr_chunkPattern = new RegExp(
      '[^<]+'  // A run of characters other than '<'
      + '|<\!--[\\s\\S]*?--\>'  // an HTML comment
      + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'  // a CDATA section
      // a probable tag that should not be highlighted
      + '|<\/?[a-zA-Z](?:[^>\"\']|\'[^\']*\'|\"[^\"]*\")*>'
      + '|<',  // A '<' that does not begin a larger chunk
      'g');
  var pr_commentPrefix = /^<\!--/;
  var pr_cdataPrefix = /^<!\[CDATA\[/;
  var pr_brPrefix = /^<br\b/i;
  var pr_tagNameRe = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/;

  /** split markup into chunks of html tags (style null) and
    * plain text (style {@link #PR_PLAIN}), converting tags which are
    * significant for tokenization (<br>) into their textual equivalent.
    *
    * @param {string} s html where whitespace is considered significant.
    * @return {Object} source code and extracted tags.
    * @private
    */
  function extractTags(s) {
    // since the pattern has the 'g' modifier and defines no capturing groups,
    // this will return a list of all chunks which we then classify and wrap as
    // PR_Tokens
    var matches = s.match(pr_chunkPattern);
    var sourceBuf = [];
    var sourceBufLen = 0;
    var extractedTags = [];
    if (matches) {
      for (var i = 0, n = matches.length; i < n; ++i) {
        var match = matches[i];
        if (match.length > 1 && match.charAt(0) === '<') {
          if (pr_commentPrefix.test(match)) { continue; }
          if (pr_cdataPrefix.test(match)) {
            // strip CDATA prefix and suffix.  Don't unescape since it's CDATA
            sourceBuf.push(match.substring(9, match.length - 3));
            sourceBufLen += match.length - 12;
          } else if (pr_brPrefix.test(match)) {
            // <br> tags are lexically significant so convert them to text.
            // This is undone later.
            sourceBuf.push('\n');
            ++sourceBufLen;
          } else {
            if (match.indexOf(PR_NOCODE) >= 0 && isNoCodeTag(match)) {
              // A <span class="nocode"> will start a section that should be
              // ignored.  Continue walking the list until we see a matching end
              // tag.
              var name = match.match(pr_tagNameRe)[2];
              var depth = 1;
              var j;
              end_tag_loop:
              for (j = i + 1; j < n; ++j) {
                var name2 = matches[j].match(pr_tagNameRe);
                if (name2 && name2[2] === name) {
                  if (name2[1] === '/') {
                    if (--depth === 0) { break end_tag_loop; }
                  } else {
                    ++depth;
                  }
                }
              }
              if (j < n) {
                extractedTags.push(
                    sourceBufLen, matches.slice(i, j + 1).join(''));
                i = j;
              } else {  // Ignore unclosed sections.
                extractedTags.push(sourceBufLen, match);
              }
            } else {
              extractedTags.push(sourceBufLen, match);
            }
          }
        } else {
          var literalText = htmlToText(match);
          sourceBuf.push(literalText);
          sourceBufLen += literalText.length;
        }
      }
    }
    return { source: sourceBuf.join(''), tags: extractedTags };
  }

  /** True if the given tag contains a class attribute with the nocode class. */
  function isNoCodeTag(tag) {
    return !!tag
        // First canonicalize the representation of attributes
        .replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,
                 ' $1="$2$3$4"')
        // Then look for the attribute we want.
        .match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/);
  }

  /**
   * Apply the given language handler to sourceCode and add the resulting
   * decorations to out.
   * @param {number} basePos the index of sourceCode within the chunk of source
   *    whose decorations are already present on out.
   */
  function appendDecorations(basePos, sourceCode, langHandler, out) {
    if (!sourceCode) { return; }
    var job = {
      source: sourceCode,
      basePos: basePos
    };
    langHandler(job);
    out.push.apply(out, job.decorations);
  }

  /** Given triples of [style, pattern, context] returns a lexing function,
    * The lexing function interprets the patterns to find token boundaries and
    * returns a decoration list of the form
    * [index_0, style_0, index_1, style_1, ..., index_n, style_n]
    * where index_n is an index into the sourceCode, and style_n is a style
    * constant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to
    * all characters in sourceCode[index_n-1:index_n].
    *
    * The stylePatterns is a list whose elements have the form
    * [style : string, pattern : RegExp, DEPRECATED, shortcut : string].
    *
    * Style is a style constant like PR_PLAIN, or can be a string of the
    * form 'lang-FOO', where FOO is a language extension describing the
    * language of the portion of the token in $1 after pattern executes.
    * E.g., if style is 'lang-lisp', and group 1 contains the text
    * '(hello (world))', then that portion of the token will be passed to the
    * registered lisp handler for formatting.
    * The text before and after group 1 will be restyled using this decorator
    * so decorators should take care that this doesn't result in infinite
    * recursion.  For example, the HTML lexer rule for SCRIPT elements looks
    * something like ['lang-js', /<[s]cript>(.+?)<\/script>/].  This may match
    * '<script>foo()<\/script>', which would cause the current decorator to
    * be called with '<script>' which would not match the same rule since
    * group 1 must not be empty, so it would be instead styled as PR_TAG by
    * the generic tag rule.  The handler registered for the 'js' extension would
    * then be called with 'foo()', and finally, the current decorator would
    * be called with '<\/script>' which would not match the original rule and
    * so the generic tag rule would identify it as a tag.
    *
    * Pattern must only match prefixes, and if it matches a prefix, then that
    * match is considered a token with the same style.
    *
    * Context is applied to the last non-whitespace, non-comment token
    * recognized.
    *
    * Shortcut is an optional string of characters, any of which, if the first
    * character, gurantee that this pattern and only this pattern matches.
    *
    * @param {Array} shortcutStylePatterns patterns that always start with
    *   a known character.  Must have a shortcut string.
    * @param {Array} fallthroughStylePatterns patterns that will be tried in
    *   order if the shortcut ones fail.  May have shortcuts.
    *
    * @return {function (Object)} a
    *   function that takes source code and returns a list of decorations.
    */
  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
    var shortcuts = {};
    var tokenizer;
    (function () {
      var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns);
      var allRegexs = [];
      var regexKeys = {};
      for (var i = 0, n = allPatterns.length; i < n; ++i) {
        var patternParts = allPatterns[i];
        var shortcutChars = patternParts[3];
        if (shortcutChars) {
          for (var c = shortcutChars.length; --c >= 0;) {
            shortcuts[shortcutChars.charAt(c)] = patternParts;
          }
        }
        var regex = patternParts[1];
        var k = '' + regex;
        if (!regexKeys.hasOwnProperty(k)) {
          allRegexs.push(regex);
          regexKeys[k] = null;
        }
      }
      allRegexs.push(/[\0-\uffff]/);
      tokenizer = combinePrefixPatterns(allRegexs);
    })();

    var nPatterns = fallthroughStylePatterns.length;
    var notWs = /\S/;

    /**
     * Lexes job.source and produces an output array job.decorations of style
     * classes preceded by the position at which they start in job.source in
     * order.
     *
     * @param {Object} job an object like {@code
     *    source: {string} sourceText plain text,
     *    basePos: {int} position of job.source in the larger chunk of
     *        sourceCode.
     * }
     */
    var decorate = function (job) {
      var sourceCode = job.source, basePos = job.basePos;
      /** Even entries are positions in source in ascending order.  Odd enties
        * are style markers (e.g., PR_COMMENT) that run from that position until
        * the end.
        * @type {Array.<number|string>}
        */
      var decorations = [basePos, PR_PLAIN];
      var pos = 0;  // index into sourceCode
      var tokens = sourceCode.match(tokenizer) || [];
      var styleCache = {};

      for (var ti = 0, nTokens = tokens.length; ti < nTokens; ++ti) {
        var token = tokens[ti];
        var style = styleCache[token];
        var match = void 0;

        var isEmbedded;
        if (typeof style === 'string') {
          isEmbedded = false;
        } else {
          var patternParts = shortcuts[token.charAt(0)];
          if (patternParts) {
            match = token.match(patternParts[1]);
            style = patternParts[0];
          } else {
            for (var i = 0; i < nPatterns; ++i) {
              patternParts = fallthroughStylePatterns[i];
              match = token.match(patternParts[1]);
              if (match) {
                style = patternParts[0];
                break;
              }
            }

            if (!match) {  // make sure that we make progress
              style = PR_PLAIN;
            }
          }

          isEmbedded = style.length >= 5 && 'lang-' === style.substring(0, 5);
          if (isEmbedded && !(match && typeof match[1] === 'string')) {
            isEmbedded = false;
            style = PR_SOURCE;
          }

          if (!isEmbedded) { styleCache[token] = style; }
        }

        var tokenStart = pos;
        pos += token.length;

        if (!isEmbedded) {
          decorations.push(basePos + tokenStart, style);
        } else {  // Treat group 1 as an embedded block of source code.
          var embeddedSource = match[1];
          var embeddedSourceStart = token.indexOf(embeddedSource);
          var embeddedSourceEnd = embeddedSourceStart + embeddedSource.length;
          if (match[2]) {
            // If embeddedSource can be blank, then it would match at the
            // beginning which would cause us to infinitely recurse on the
            // entire token, so we catch the right context in match[2].
            embeddedSourceEnd = token.length - match[2].length;
            embeddedSourceStart = embeddedSourceEnd - embeddedSource.length;
          }
          var lang = style.substring(5);
          // Decorate the left of the embedded source
          appendDecorations(
              basePos + tokenStart,
              token.substring(0, embeddedSourceStart),
              decorate, decorations);
          // Decorate the embedded source
          appendDecorations(
              basePos + tokenStart + embeddedSourceStart,
              embeddedSource,
              langHandlerForExtension(lang, embeddedSource),
              decorations);
          // Decorate the right of the embedded section
          appendDecorations(
              basePos + tokenStart + embeddedSourceEnd,
              token.substring(embeddedSourceEnd),
              decorate, decorations);
        }
      }
      job.decorations = decorations;
    };
    return decorate;
  }

  /** returns a function that produces a list of decorations from source text.
    *
    * This code treats ", ', and ` as string delimiters, and \ as a string
    * escape.  It does not recognize perl's qq() style strings.
    * It has no special handling for double delimiter escapes as in basic, or
    * the tripled delimiters used in python, but should work on those regardless
    * although in those cases a single string literal may be broken up into
    * multiple adjacent string literals.
    *
    * It recognizes C, C++, and shell style comments.
    *
    * @param {Object} options a set of optional parameters.
    * @return {function (Object)} a function that examines the source code
    *     in the input job and builds the decoration list.
    */
  function sourceDecorator(options) {
    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
    if (options['tripleQuotedStrings']) {
      // '''multi-line-string''', 'single-line-string', and double-quoted
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
           null, '\'"']);
    } else if (options['multiLineStrings']) {
      // 'multi-line-string', "multi-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
           null, '\'"`']);
    } else {
      // 'single-line-string', "single-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,
           /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
           null, '"\'']);
    }
    if (options['verbatimStrings']) {
      // verbatim-string-literal production from the C# grammar.  See issue 93.
      fallthroughStylePatterns.push(
          [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    if (options['hashComments']) {
      if (options['cStyleComments']) {
        // Stop C preprocessor declarations at an unclosed open comment
        shortcutStylePatterns.push(
            [PR_COMMENT, /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,
             null, '#']);
        fallthroughStylePatterns.push(
            [PR_STRING,
             /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,
             null]);
      } else {
        shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
      }
    }
    if (options['cStyleComments']) {
      fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
      fallthroughStylePatterns.push(
          [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    if (options['regexLiterals']) {
      var REGEX_LITERAL = (
          // A regular expression literal starts with a slash that is
          // not followed by * or / so that it is not confused with
          // comments.
          '/(?=[^/*])'
          // and then contains any number of raw characters,
          + '(?:[^/\\x5B\\x5C]'
          // escape sequences (\x5C),
          +    '|\\x5C[\\s\\S]'
          // or non-nesting character sets (\x5B\x5D);
          +    '|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+'
          // finally closed by a /.
          + '/');
      fallthroughStylePatterns.push(
          ['lang-regex',
           new RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
           ]);
    }

    var keywords = options['keywords'].replace(/^\s+|\s+$/g, '');
    if (keywords.length) {
      fallthroughStylePatterns.push(
          [PR_KEYWORD,
           new RegExp('^(?:' + keywords.replace(/\s+/g, '|') + ')\\b'), null]);
    }

    shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);
    fallthroughStylePatterns.push(
        // TODO(mikesamuel): recognize non-latin letters and numerals in idents
        [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
        [PR_TYPE,        /^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/, null],
        [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
        [PR_LITERAL,
         new RegExp(
             '^(?:'
             // A hex number
             + '0x[a-f0-9]+'
             // or an octal or decimal number,
             + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
             // possibly in scientific notation
             + '(?:e[+\\-]?\\d+)?'
             + ')'
             // with an optional modifier like UL for unsigned long
             + '[a-z]*', 'i'),
         null, '0123456789'],
        [PR_PUNCTUATION, /^.[^\s\w\.$@\'\"\`\/\#]*/, null]);

    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
  }

  var decorateSource = sourceDecorator({
        'keywords': ALL_KEYWORDS,
        'hashComments': true,
        'cStyleComments': true,
        'multiLineStrings': true,
        'regexLiterals': true
      });

  /** Breaks {@code job.source} around style boundaries in
    * {@code job.decorations} while re-interleaving {@code job.extractedTags},
    * and leaves the result in {@code job.prettyPrintedHtml}.
    * @param {Object} job like {
    *    source: {string} source as plain text,
    *    extractedTags: {Array.<number|string>} extractedTags chunks of raw
    *                   html preceded by their position in {@code job.source}
    *                   in order
    *    decorations: {Array.<number|string} an array of style classes preceded
    *                 by the position at which they start in job.source in order
    * }
    * @private
    */
  function recombineTagsAndDecorations(job) {
    var sourceText = job.source;
    var extractedTags = job.extractedTags;
    var decorations = job.decorations;

    var html = [];
    // index past the last char in sourceText written to html
    var outputIdx = 0;

    var openDecoration = null;
    var currentDecoration = null;
    var tagPos = 0;  // index into extractedTags
    var decPos = 0;  // index into decorations
    var tabExpander = makeTabExpander(window['PR_TAB_WIDTH']);

    var adjacentSpaceRe = /([\r\n ]) /g;
    var startOrSpaceRe = /(^| ) /gm;
    var newlineRe = /\r\n?|\n/g;
    var trailingSpaceRe = /[ \r\n]$/;
    var lastWasSpace = true;  // the last text chunk emitted ended with a space.

    // A helper function that is responsible for opening sections of decoration
    // and outputing properly escaped chunks of source
    function emitTextUpTo(sourceIdx) {
      if (sourceIdx > outputIdx) {
        if (openDecoration && openDecoration !== currentDecoration) {
          // Close the current decoration
          html.push('</span>');
          openDecoration = null;
        }
        if (!openDecoration && currentDecoration) {
          openDecoration = currentDecoration;
          html.push('<span class="', openDecoration, '">');
        }
        // This interacts badly with some wikis which introduces paragraph tags
        // into pre blocks for some strange reason.
        // It's necessary for IE though which seems to lose the preformattedness
        // of <pre> tags when their innerHTML is assigned.
        // http://stud3.tuwien.ac.at/~e0226430/innerHtmlQuirk.html
        // and it serves to undo the conversion of <br>s to newlines done in
        // chunkify.
        var htmlChunk = textToHtml(
            tabExpander(sourceText.substring(outputIdx, sourceIdx)))
            .replace(lastWasSpace
                     ? startOrSpaceRe
                     : adjacentSpaceRe, '$1&nbsp;');
        // Keep track of whether we need to escape space at the beginning of the
        // next chunk.
        lastWasSpace = trailingSpaceRe.test(htmlChunk);
        // IE collapses multiple adjacient <br>s into 1 line break.
        // Prefix every <br> with '&nbsp;' can prevent such IE's behavior.
        var lineBreakHtml = window['_pr_isIE6']() ? '&nbsp;<br />' : '<br />';
        html.push(htmlChunk.replace(newlineRe, lineBreakHtml));
        outputIdx = sourceIdx;
      }
    }

    while (true) {
      // Determine if we're going to consume a tag this time around.  Otherwise
      // we consume a decoration or exit.
      var outputTag;
      if (tagPos < extractedTags.length) {
        if (decPos < decorations.length) {
          // Pick one giving preference to extractedTags since we shouldn't open
          // a new style that we're going to have to immediately close in order
          // to output a tag.
          outputTag = extractedTags[tagPos] <= decorations[decPos];
        } else {
          outputTag = true;
        }
      } else {
        outputTag = false;
      }
      // Consume either a decoration or a tag or exit.
      if (outputTag) {
        emitTextUpTo(extractedTags[tagPos]);
        if (openDecoration) {
          // Close the current decoration
          html.push('</span>');
          openDecoration = null;
        }
        html.push(extractedTags[tagPos + 1]);
        tagPos += 2;
      } else if (decPos < decorations.length) {
        emitTextUpTo(decorations[decPos]);
        currentDecoration = decorations[decPos + 1];
        decPos += 2;
      } else {
        break;
      }
    }
    emitTextUpTo(sourceText.length);
    if (openDecoration) {
      html.push('</span>');
    }
    job.prettyPrintedHtml = html.join('');
  }

  /** Maps language-specific file extensions to handlers. */
  var langHandlerRegistry = {};
  /** Register a language handler for the given file extensions.
    * @param {function (Object)} handler a function from source code to a list
    *      of decorations.  Takes a single argument job which describes the
    *      state of the computation.   The single parameter has the form
    *      {@code {
    *        source: {string} as plain text.
    *        decorations: {Array.<number|string>} an array of style classes
    *                     preceded by the position at which they start in
    *                     job.source in order.
    *                     The language handler should assigned this field.
    *        basePos: {int} the position of source in the larger source chunk.
    *                 All positions in the output decorations array are relative
    *                 to the larger source chunk.
    *      } }
    * @param {Array.<string>} fileExtensions
    */
  function registerLangHandler(handler, fileExtensions) {
    for (var i = fileExtensions.length; --i >= 0;) {
      var ext = fileExtensions[i];
      if (!langHandlerRegistry.hasOwnProperty(ext)) {
        langHandlerRegistry[ext] = handler;
      } else if ('console' in window) {
        console.warn('cannot override language handler %s', ext);
      }
    }
  }
  function langHandlerForExtension(extension, source) {
    if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
      // Treat it as markup if the first non whitespace character is a < and
      // the last non-whitespace character is a >.
      extension = /^\s*</.test(source)
          ? 'default-markup'
          : 'default-code';
    }
    return langHandlerRegistry[extension];
  }
  registerLangHandler(decorateSource, ['default-code']);
  registerLangHandler(
      createSimpleLexer(
          [],
          [
           [PR_PLAIN,       /^[^<?]+/],
           [PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
           [PR_COMMENT,     /^<\!--[\s\S]*?(?:-\->|$)/],
           // Unescaped content in an unknown language
           ['lang-',        /^<\?([\s\S]+?)(?:\?>|$)/],
           ['lang-',        /^<%([\s\S]+?)(?:%>|$)/],
           [PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
           ['lang-',        /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
           // Unescaped content in javascript.  (Or possibly vbscript).
           ['lang-js',      /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
           // Contains unescaped stylesheet content
           ['lang-css',     /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
           ['lang-in.tag',  /^(<\/?[a-z][^<>]*>)/i]
          ]),
      ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']);
  registerLangHandler(
      createSimpleLexer(
          [
           [PR_PLAIN,        /^[\s]+/, null, ' \t\r\n'],
           [PR_ATTRIB_VALUE, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '\"\'']
           ],
          [
           [PR_TAG,          /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
           [PR_ATTRIB_NAME,  /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
           ['lang-uq.val',   /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
           [PR_PUNCTUATION,  /^[=<>\/]+/],
           ['lang-js',       /^on\w+\s*=\s*\"([^\"]+)\"/i],
           ['lang-js',       /^on\w+\s*=\s*\'([^\']+)\'/i],
           ['lang-js',       /^on\w+\s*=\s*([^\"\'>\s]+)/i],
           ['lang-css',      /^style\s*=\s*\"([^\"]+)\"/i],
           ['lang-css',      /^style\s*=\s*\'([^\']+)\'/i],
           ['lang-css',      /^style\s*=\s*([^\"\'>\s]+)/i]
           ]),
      ['in.tag']);
  registerLangHandler(
      createSimpleLexer([], [[PR_ATTRIB_VALUE, /^[\s\S]+/]]), ['uq.val']);
  registerLangHandler(sourceDecorator({
          'keywords': CPP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true
        }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
  registerLangHandler(sourceDecorator({
          'keywords': 'null true false'
        }), ['json']);
  registerLangHandler(sourceDecorator({
          'keywords': CSHARP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'verbatimStrings': true
        }), ['cs']);
  registerLangHandler(sourceDecorator({
          'keywords': JAVA_KEYWORDS,
          'cStyleComments': true
        }), ['java']);
  registerLangHandler(sourceDecorator({
          'keywords': SH_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true
        }), ['bsh', 'csh', 'sh']);
  registerLangHandler(sourceDecorator({
          'keywords': PYTHON_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'tripleQuotedStrings': true
        }), ['cv', 'py']);
  registerLangHandler(sourceDecorator({
          'keywords': PERL_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['perl', 'pl', 'pm']);
  registerLangHandler(sourceDecorator({
          'keywords': RUBY_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['rb']);
  registerLangHandler(sourceDecorator({
          'keywords': JSCRIPT_KEYWORDS,
          'cStyleComments': true,
          'regexLiterals': true
        }), ['js']);
  registerLangHandler(
      createSimpleLexer([], [[PR_STRING, /^[\s\S]+/]]), ['regex']);

  function applyDecorator(job) {
    var sourceCodeHtml = job.sourceCodeHtml;
    var opt_langExtension = job.langExtension;

    // Prepopulate output in case processing fails with an exception.
    job.prettyPrintedHtml = sourceCodeHtml;

    try {
      // Extract tags, and convert the source code to plain text.
      var sourceAndExtractedTags = extractTags(sourceCodeHtml);
      /** Plain text. @type {string} */
      var source = sourceAndExtractedTags.source;
      job.source = source;
      job.basePos = 0;

      /** Even entries are positions in source in ascending order.  Odd entries
        * are tags that were extracted at that position.
        * @type {Array.<number|string>}
        */
      job.extractedTags = sourceAndExtractedTags.tags;

      // Apply the appropriate language handler
      langHandlerForExtension(opt_langExtension, source)(job);
      // Integrate the decorations and tags back into the source code to produce
      // a decorated html string which is left in job.prettyPrintedHtml.
      recombineTagsAndDecorations(job);
    } catch (e) {
      if ('console' in window) {
        console.log(e);
        console.trace();
      }
    }
  }

  function prettyPrintOne(sourceCodeHtml, opt_langExtension) {
    var job = {
      sourceCodeHtml: sourceCodeHtml,
      langExtension: opt_langExtension
    };
    applyDecorator(job);
    return job.prettyPrintedHtml;
  }

  function prettyPrint(opt_whenDone) {
    var isIE678 = window['_pr_isIE6']();
    var ieNewline = isIE678 === 6 ? '\r\n' : '\r';
    // See bug 71 and http://stackoverflow.com/questions/136443/why-doesnt-ie7-

    // fetch a list of nodes to rewrite
    var codeSegments = [
        document.getElementsByTagName('pre'),
        document.getElementsByTagName('code'),
        document.getElementsByTagName('xmp') ];
    var elements = [];
    for (var i = 0; i < codeSegments.length; ++i) {
      for (var j = 0, n = codeSegments[i].length; j < n; ++j) {
        elements.push(codeSegments[i][j]);
      }
    }
    codeSegments = null;

    var clock = Date;
    if (!clock['now']) {
      clock = { 'now': function () { return (new Date).getTime(); } };
    }

    // The loop is broken into a series of continuations to make sure that we
    // don't make the browser unresponsive when rewriting a large page.
    var k = 0;
    var prettyPrintingJob;

    function doWork() {
      var endTime = (window['PR_SHOULD_USE_CONTINUATION'] ?
                     clock.now() + 250 /* ms */ :
                     Infinity);
      for (; k < elements.length && clock.now() < endTime; k++) {
        var cs = elements[k];
        if (cs.className && cs.className.indexOf('prettyprint') >= 0) {
          // If the classes includes a language extensions, use it.
          // Language extensions can be specified like
          //     <pre class="prettyprint lang-cpp">
          // the language extension "cpp" is used to find a language handler as
          // passed to PR_registerLangHandler.
          var langExtension = cs.className.match(/\blang-(\w+)\b/);
          if (langExtension) { langExtension = langExtension[1]; }

          // make sure this is not nested in an already prettified element
          var nested = false;
          for (var p = cs.parentNode; p; p = p.parentNode) {
            if ((p.tagName === 'pre' || p.tagName === 'code' ||
                 p.tagName === 'xmp') &&
                p.className && p.className.indexOf('prettyprint') >= 0) {
              nested = true;
              break;
            }
          }
          if (!nested) {
            // fetch the content as a snippet of properly escaped HTML.
            // Firefox adds newlines at the end.
            var content = getInnerHtml(cs);
            content = content.replace(/(?:\r\n?|\n)$/, '');

            // do the pretty printing
            prettyPrintingJob = {
              sourceCodeHtml: content,
              langExtension: langExtension,
              sourceNode: cs
            };
            applyDecorator(prettyPrintingJob);
            replaceWithPrettyPrintedHtml();
          }
        }
      }
      if (k < elements.length) {
        // finish up in a continuation
        setTimeout(doWork, 250);
      } else if (opt_whenDone) {
        opt_whenDone();
      }
    }

    function replaceWithPrettyPrintedHtml() {
      var newContent = prettyPrintingJob.prettyPrintedHtml;
      if (!newContent) { return; }
      var cs = prettyPrintingJob.sourceNode;

      // push the prettified html back into the tag.
      if (!isRawContent(cs)) {
        // just replace the old html with the new
        cs.innerHTML = newContent;
      } else {
        // we need to change the tag to a <pre> since <xmp>s do not allow
        // embedded tags such as the span tags used to attach styles to
        // sections of source code.
        var pre = document.createElement('PRE');
        for (var i = 0; i < cs.attributes.length; ++i) {
          var a = cs.attributes[i];
          if (a.specified) {
            var aname = a.name.toLowerCase();
            if (aname === 'class') {
              pre.className = a.value;  // For IE 6
            } else {
              pre.setAttribute(a.name, a.value);
            }
          }
        }
        pre.innerHTML = newContent;

        // remove the old
        cs.parentNode.replaceChild(pre, cs);
        cs = pre;
      }

      // Replace <br>s with line-feeds so that copying and pasting works
      // on IE 6.
      // Doing this on other browsers breaks lots of stuff since \r\n is
      // treated as two newlines on Firefox, and doing this also slows
      // down rendering.
      if (isIE678 && cs.tagName === 'PRE') {
        var lineBreaks = cs.getElementsByTagName('br');
        for (var j = lineBreaks.length; --j >= 0;) {
          var lineBreak = lineBreaks[j];
          lineBreak.parentNode.replaceChild(
              document.createTextNode(ieNewline), lineBreak);
        }
      }
    }

    doWork();
  }

  window['PR_normalizedHtml'] = normalizedHtml;
  window['prettyPrintOne'] = prettyPrintOne;
  window['prettyPrint'] = prettyPrint;
  window['PR'] = {
        'combinePrefixPatterns': combinePrefixPatterns,
        'createSimpleLexer': createSimpleLexer,
        'registerLangHandler': registerLangHandler,
        'sourceDecorator': sourceDecorator,
        'PR_ATTRIB_NAME': PR_ATTRIB_NAME,
        'PR_ATTRIB_VALUE': PR_ATTRIB_VALUE,
        'PR_COMMENT': PR_COMMENT,
        'PR_DECLARATION': PR_DECLARATION,
        'PR_KEYWORD': PR_KEYWORD,
        'PR_LITERAL': PR_LITERAL,
        'PR_NOCODE': PR_NOCODE,
        'PR_PLAIN': PR_PLAIN,
        'PR_PUNCTUATION': PR_PUNCTUATION,
        'PR_SOURCE': PR_SOURCE,
        'PR_STRING': PR_STRING,
        'PR_TAG': PR_TAG,
        'PR_TYPE': PR_TYPE
      };
})();


/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);


(function(a){"use strict";var b=window.MozBlobBuilder||window.WebKitBlobBuilder||window.BlobBuilder,c=/^image\/(jpeg|png)$/,d=function(a,e,f){f=f||{};if(a.toBlob)return a.toBlob(e,f.type),!0;if(a.mozGetAsFile){var g=f.name;return e(a.mozGetAsFile(c.test(f.type)&&g||(g&&g.replace(/\..+$/,"")||"blob")+".png",f.type)),!0}return a.toDataURL&&b&&window.atob&&window.ArrayBuffer&&window.Uint8Array?(e(d.dataURItoBlob(a.toDataURL(f.type))),!0):!1};d.dataURItoBlob=function(a){var c,d,e,f,g,h;a.split(",")[0].indexOf("base64")>=0?c=atob(a.split(",")[1]):c=decodeURIComponent(a.split(",")[1]),d=new ArrayBuffer(c.length),e=new Uint8Array(d);for(f=0;f<c.length;f+=1)e[f]=c.charCodeAt(f);return g=new b,g.append(d),h=a.split(",")[0].split(":")[1].split(";")[0],g.getBlob(h)},typeof define!="undefined"&&define.amd?define(function(){return d}):a.canvasToBlob=d})(this);

!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.remove(),e.trigger("closed")}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),e.trigger("close"),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype={constructor:b,setState:function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},toggle:function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")}},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){a(b.target).button("toggle")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.carousel.defaults,c),this.options.slide&&this.slide(this.options.slide)};b.prototype={cycle:function(){return this.interval=setInterval(a.proxy(this.next,this),this.options.interval),this},to:function(b){var c=this.$element.find(".active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(){return clearInterval(this.interval),this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;return this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h](),!a.support.transition&&this.$element.hasClass("slide")?(this.$element.trigger("slide"),d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")):(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.trigger("slide"),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})),f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=typeof c=="object"&&c;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):typeof c=="string"||(c=f.slide)?e[c]():e.cycle()})},a.fn.carousel.defaults={interval:5e3},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find(".in"),e;d&&d.length&&(e=d.data("collapse"),d.collapse("hide"),e||d.data("collapse",null)),this.$element[b](0),this.transition("addClass","show","shown"),this.$element[b](this.$element[0][c])},hide:function(){var a=this.dimension();this.reset(this.$element[a]()),this.transition("removeClass","hide","hidden"),this.$element[a](0)},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element.addClass("collapse")},transition:function(b,c,d){var e=this,f=function(){c=="show"&&e.reset(),e.$element.trigger(d)};this.$element.trigger(c)[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();a(e).collapse(f)})})}(window.jQuery),!function(a){function d(){a(b).parent().removeClass("open")}"use strict";var b='[data-toggle="dropdown"]',c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),e=c.attr("data-target"),f,g;return e||(e=c.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,"")),f=a(e),f.length||(f=c.parent()),g=f.hasClass("open"),d(),!g&&f.toggleClass("open"),!1}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api",d),a("body").on("click.dropdown.data-api",b,c.prototype.toggle)})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=a.extend({},a.fn.modal.defaults,c),this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this;if(this.isShown)return;a("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");!b.$element.parent().length&&b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();if(!this.isShown)return;var e=this;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.trigger("hide").removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=typeof c=="object"&&c;e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body").on("click.scroll.data-api",this.selector,d),this.refresh(),this.process()}"use strict",b.prototype={constructor:b,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var b=a(this).attr("href");return/^#\w/.test(b)&&a(b).length?b:null}),this.offsets=a.map(this.targets,function(b){return a(b).position().top})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.offsets,c=this.targets,d=this.activeTarget,e;for(e=b.length;e--;)d!=c[e]&&a>=b[e]&&(!b[e+1]||a<=b[e+1])&&this.activate(c[e])},activate:function(a){var b;this.activeTarget=a,this.$body.find(this.selector).parent(".active").removeClass("active"),b=this.$body.find(this.selector+'[href="'+a+'"]').parent("li").addClass("active"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],b.trigger({type:"show",relatedTarget:e}),f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(a),this.hide()},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c=this,d,e;return this.query=this.$element.val(),this.query?(d=a.grep(this.source,function(a){if(c.matcher(a))return a}),d=this.sorter(d),d.length?this.render(d.slice(0,this.options.items)).show():this.shown?this.hide():this):this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){return a.replace(new RegExp("("+this.query+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keypress,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},keyup:function(a){a.stopPropagation(),a.preventDefault();switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:this.hide();break;default:this.lookup()}},keypress:function(a){a.stopPropagation();if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}},blur:function(a){var b=this;a.stopPropagation(),a.preventDefault(),setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);

(function(a){"use strict",typeof define=="function"&&define.amd?define(["jquery","./load-image.js","bootstrap"],a):a(window.jQuery,window.loadImage)})(function(a,b){"use strict",a.extend(a.fn.modal.defaults,{delegate:document,selector:null,index:0,href:null,preloadRange:2,offsetWidth:100,offsetHeight:200,canvas:!1,slideshow:0});var c=a.fn.modal.Constructor.prototype.show,d=a.fn.modal.Constructor.prototype.hide;a.extend(a.fn.modal.Constructor.prototype,{initLinks:function(){var b=this,c=this.options,d=c.selector||"a[data-target="+c.target+"]",e=0;a(c.delegate).find(d).each(function(d,f){var g=f.href||a(f).data("href");b.urls[b.urls.length-1]!==g&&(b.urls.push(g),b.titles.push(f.title),g===c.href&&(c.index=e),e+=1)}),this.urls[c.index]||(c.index=0)},startSlideShow:function(){var a=this;this.options.slideshow&&(this._slideShow=window.setTimeout(function(){a.next()},this.options.slideshow))},stopSlideShow:function(){window.clearTimeout(this._slideShow)},toggleSlideShow:function(){var a=this.$element.find(".modal-slideshow");this.options.slideshow?(this.options.slideshow=0,this.stopSlideShow()):(this.options.slideshow=a.data("slideshow")||5e3,this.startSlideShow()),a.children().toggleClass("icon-play icon-pause")},preloadImages:function(){var b=this.options,c=b.index+b.preloadRange+1,d,e;for(e=b.index-b.preloadRange;e<c;e+=1)d=this.urls[e],d&&e!==b.index&&a("<img>").prop("src",d)},loadImage:function(){var a=this,c=this.$element,d=this.options.index,e;this.abortLoad(),this.stopSlideShow(),this._loadingTimeout=window.setTimeout(function(){c.addClass("modal-loading")},100),e=c.find(".modal-image").children().removeClass("in"),window.setTimeout(function(){e.remove()},3e3),c.find(".modal-title").text(this.titles[d]),c.find(".modal-download").prop("href",this.urls[d]),this.loadingImage=b(this.urls[d],function(b){window.clearTimeout(a._loadingTimeout),c.removeClass("modal-loading"),a.showImage(b),a.startSlideShow()},a.loadImageOptions),this.preloadImages()},showImage:function(b){var c=this.$element,d=a.support.transition&&c.hasClass("fade"),e=d?c.animate:c.css,f=c.find(".modal-image"),g,h;f.css({width:b.width,height:b.height}),d&&(g=c.clone().hide().appendTo(document.body)),e.call(c.stop(),{"margin-top":-((g||c).outerHeight()/2),"margin-left":-((g||c).outerWidth()/2)}),g&&g.remove(),f.append(b),h=b.offsetWidth,a(b).addClass("in")},abortLoad:function(){this.loadingImage&&(this.loadingImage.onload=this.loadingImage.onerror=null),window.clearTimeout(this._loadingTimeout)},prev:function(){var a=this.options;a.index-=1,a.index<0&&(a.index=this.urls.length-1),this.loadImage()},next:function(){var a=this.options;a.index+=1,a.index>this.urls.length-1&&(a.index=0),this.loadImage()},keyHandler:function(a){switch(a.which){case 37:case 38:a.preventDefault(),this.prev();break;case 39:case 40:a.preventDefault(),this.next()}},wheelHandler:function(a){a.preventDefault(),a=a.originalEvent,this._wheelCounter=this._wheelCounter||0,this._wheelCounter+=a.wheelDelta||a.detail||0;if(a.wheelDelta&&this._wheelCounter>=120||!a.wheelDelta&&this._wheelCounter<0)this.prev(),this._wheelCounter=0;else if(a.wheelDelta&&this._wheelCounter<=-120||!a.wheelDelta&&this._wheelCounter>0)this.next(),this._wheelCounter=0},initGalleryEvents:function(){var b=this,c=this.$element;c.find(".modal-image").on("click.modal-gallery",function(a){a.altKey?b.prev(a):b.next(a)}),c.find(".modal-prev").on("click.modal-gallery",function(a){b.prev(a)}),c.find(".modal-next").on("click.modal-gallery",function(a){b.next(a)}),c.find(".modal-slideshow").on("click.modal-gallery",function(a){b.toggleSlideShow(a)}),a(document).on("keydown.modal-gallery",function(a){b.keyHandler(a)}).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery",function(a){b.wheelHandler(a)})},destroyGalleryEvents:function(){var b=this.$element;this.abortLoad(),this.stopSlideShow(),b.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery"),a(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery")},show:function(){if(!this.isShown&&this.$element.hasClass("modal-gallery")){var b=this.$element,d=this.options,e=a(window).width(),f=a(window).height();this.urls=[],this.titles=[],b.hasClass("modal-fullscreen")?this.loadImageOptions={minWidth:e,minHeight:f,maxWidth:e,maxHeight:f,canvas:d.canvas}:this.loadImageOptions={maxWidth:e-d.offsetWidth,maxHeight:f-d.offsetHeight,canvas:d.canvas},b.css({"margin-top":-(b.outerHeight()/2),"margin-left":-(b.outerWidth()/2)}),this.initGalleryEvents(),this.initLinks(),this.urls.length&&this.loadImage()}c.apply(this,arguments)},hide:function(){this.isShown&&this.$element.hasClass("modal-gallery")&&(this.options.delegate=document,this.options.href=null,this.destroyGalleryEvents()),d.apply(this,arguments)}}),a(function(){a(document.body).on("click.modal-gallery.data-api",'[data-toggle="modal-gallery"]',function(b){var c=a(this),d=c.data(),e=a(d.target),f=e.data("modal"),g;f||(d=a.extend(e.data(),d)),d.selector||(d.selector="a[rel=gallery]"),g=a(b.target).closest(d.selector),g.length&&e.length&&(b.preventDefault(),d.href=g.prop("href")||g.data("href"),d.delegate=g[0]!==this?this:document,f&&a.extend(f.options,d),e.modal(d))})})});

/*
 * jQuery File Upload Plugin 5.10.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document, Blob, FormData, location */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // The FileReader API is not actually used, but works as feature detection,
    // as e.g. Safari supports XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads:
    $.support.xhrFileUpload = !!(window.XMLHttpRequestUpload && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The namespace used for event handler binding on the dropZone and
            // fileInput collections.
            // If not set, the name of the widget ("fileupload") is used.
            namespace: undefined,
            // The drop target collection, by the default the complete document.
            // Set to null or an empty collection to disable drag & drop support:
            dropZone: $(document),
            // The file input field collection, that is listened for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null or an empty collection to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uplaods, else
            // once for each file selection.
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows to override plugin options as well as define ajax settings.
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                data.submit();
            },

            // Other callbacks:
            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);
            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);
            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);
            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);
            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);
            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);
            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);
            // Callback for change events of the fileInput collection:
            // change: function (e, data) {}, // .bind('fileuploadchange', func);
            // Callback for paste events to the dropZone collection:
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);
            // Callback for drop events of the dropZone collection:
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);
            // Callback for dragover events of the dropZone collection:
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require a refresh after assigning a new value:
        _refreshOptionsList: [
            'namespace',
            'dropZone',
            'fileInput',
            'multipart',
            'forceIframeTransport'
        ],

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            } else if ($.isArray(options.formData)) {
                return options.formData;
            } else if (options.formData) {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var total = data.total || this._getTotal(data.files),
                    loaded = parseInt(
                        e.loaded / e.total * (data.chunkSize || total),
                        10
                    ) + (data.uploadedBytes || 0);
                this._loaded += loaded - (data.loaded || data.uploadedBytes || 0);
                data.lengthComputable = true;
                data.loaded = loaded;
                data.total = total;
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', e, data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', e, {
                    lengthComputable: true,
                    loaded: this._loaded,
                    total: this._total
                });
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _initXHRData: function (options) {
            var formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = options.paramName[0];
            if (!multipart || options.blob) {
                // For non-multipart uploads and chunked uploads,
                // file meta data is not part of the request body,
                // so we transmit this data as part of the HTTP headers.
                // For cross domain requests, these headers must be allowed
                // via Access-Control-Allow-Headers or removed using
                // the beforeSend callback:
                options.headers = $.extend(options.headers, {
                    'X-File-Name': file.name,
                    'X-File-Type': file.type,
                    'X-File-Size': file.size
                });
                if (!options.blob) {
                    // Non-chunked non-multipart upload:
                    options.contentType = file.type;
                    options.data = file;
                } else if (!multipart) {
                    // Chunked non-multipart upload:
                    options.contentType = 'application/octet-stream';
                    options.data = options.blob;
                }
            }
            if (multipart && $.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: options.paramName[index] || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (options.formData instanceof FormData) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // File objects are also Blob instances.
                            // This check allows the tests to run with
                            // dummy objects:
                            if (file instanceof Blob) {
                                formData.append(
                                    options.paramName[index] || paramName,
                                    file,
                                    file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && $('<a></a>').prop('href', options.url)
                    .prop('host') !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options, 'iframe');
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT') {
                options.type = 'POST';
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes = options.uploadedBytes || 0,
                mcs = options.maxChunkSize || fs,
                // Use the Blob methods with the slice implementation
                // according to the W3C Blob API specification:
                slice = file.webkitSlice || file.mozSlice || file.slice,
                upload,
                n,
                jqXHR,
                pipe;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = 'uploadedBytes';
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // n is the number of blobs to upload,
            // calculated via filesize, uploaded bytes and max chunk size:
            n = Math.ceil((fs - ub) / mcs);
            // The chunk upload method accepting the chunk number as parameter:
            upload = function (i) {
                if (!i) {
                    return that._getXHRPromise(true, options.context);
                }
                // Upload the blobs in sequential order:
                return upload(i -= 1).pipe(function () {
                    // Clone the options object for each chunk upload:
                    var o = $.extend({}, options);
                    o.blob = slice.call(
                        file,
                        ub + i * mcs,
                        ub + (i + 1) * mcs
                    );
                    // Store the current chunk size, as the blob itself
                    // will be dereferenced after data processing:
                    o.chunkSize = o.blob.size;
                    // Process the upload data (the blob and potential form data):
                    that._initXHRData(o);
                    // Add progress listeners for this chunk upload:
                    that._initProgressListener(o);
                    jqXHR = ($.ajax(o) || that._getXHRPromise(false, o.context))
                        .done(function () {
                            // Create a progress event if upload is done and
                            // no progress event has been invoked for this chunk:
                            if (!o.loaded) {
                                that._onProgress($.Event('progress', {
                                    lengthComputable: true,
                                    loaded: o.chunkSize,
                                    total: o.chunkSize
                                }), o);
                            }
                            options.uploadedBytes = o.uploadedBytes +=
                                o.chunkSize;
                        });
                    return jqXHR;
                });
            };
            // Return the piped Promise object, enhanced with an abort method,
            // which is delegated to the jqXHR object of the current upload,
            // and jqXHR callbacks mapped to the equivalent Promise methods:
            pipe = upload(n);
            pipe.abort = function () {
                return jqXHR.abort();
            };
            return this._enhancePromise(pipe);
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
            }
            this._active += 1;
            // Initialize the global progress values:
            this._loaded += data.uploadedBytes || 0;
            this._total += this._getTotal(data.files);
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            if (!this._isXHRUpload(options)) {
                // Create a progress event for each iframe load:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: 1,
                    total: 1
                }), options);
            }
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            options.jqXHR = jqXHR;
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._loaded -= options.loaded || options.uploadedBytes || 0;
                this._total -= options.total || this._getTotal(options.files);
            }
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            this._active -= 1;
            options.textStatus = textStatus;
            if (jqXHRorError && jqXHRorError.always) {
                options.jqXHR = jqXHRorError;
                options.result = jqXHRorResult;
            } else {
                options.jqXHR = jqXHRorResult;
                options.errorThrown = jqXHRorError;
            }
            this._trigger('always', null, options);
            if (this._active === 0) {
                // The stop callback is triggered when all uploads have
                // been completed, equivalent to the global ajaxStop event:
                this._trigger('stop');
                // Reset the global progress values:
                this._loaded = this._total = 0;
            }
        },

        _onSend: function (e, data) {
            var that = this,
                jqXHR,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function (resolve, args) {
                    that._sending += 1;
                    jqXHR = jqXHR || (
                        (resolve !== false &&
                        that._trigger('send', e, options) !== false &&
                        (that._chunkedUpload(options) || $.ajax(options))) ||
                        that._getXHRPromise(false, options.context, args)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._sending -= 1;
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (!nextSlot.isRejected()) {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    pipe = (this._sequence = this._sequence.pipe(send, send));
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    var args = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(args);
                        }
                        return send(false, args);
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                limit = options.limitMultiFileUploads,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i;
            if (!(options.singleFileUploads || limit) ||
                    !this._isXHRUpload(options)) {
                fileSet = [data.files];
                paramNameSet = [paramName];
            } else if (!options.singleFileUploads && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < data.files.length; i += limit) {
                    fileSet.push(data.files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = data.files;
            $.each(fileSet || data.files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                newData.submit = function () {
                    newData.jqXHR = this.jqXHR =
                        (that._trigger('submit', e, this) !== false) &&
                        that._onSend(e, this);
                    return this.jqXHR;
                };
                return (result = that._trigger('add', e, newData));
            });
            return result;
        },

        // File Normalization for Gecko 1.9.1 (Firefox 3.5) support:
        _normalizeFile: function (index, file) {
            if (file.name === undefined && file.size === undefined) {
                file.name = file.fileName;
                file.size = file.fileSize;
            }
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // collection with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _onChange: function (e) {
            var that = e.data.fileupload,
                data = {
                    files: $.each($.makeArray(e.target.files), that._normalizeFile),
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            if (!data.files.length) {
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                data.files = [{name: e.target.value.replace(/^.*\\/, '')}];
            }
            if (that.options.replaceFileInput) {
                that._replaceFileInput(data.fileInput);
            }
            if (that._trigger('change', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },

        _onPaste: function (e) {
            var that = e.data.fileupload,
                cbd = e.originalEvent.clipboardData,
                items = (cbd && cbd.items) || [],
                data = {files: []};
            $.each(items, function (index, item) {
                var file = item.getAsFile && item.getAsFile();
                if (file) {
                    data.files.push(file);
                }
            });
            if (that._trigger('paste', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },

        _onDrop: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer,
                data = {
                    files: $.each(
                        $.makeArray(dataTransfer && dataTransfer.files),
                        that._normalizeFile
                    )
                };
            if (that._trigger('drop', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
            e.preventDefault();
        },

        _onDragOver: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer;
            if (that._trigger('dragover', e) === false) {
                return false;
            }
            if (dataTransfer) {
                dataTransfer.dropEffect = dataTransfer.effectAllowed = 'copy';
            }
            e.preventDefault();
        },

        _initEventHandlers: function () {
            var ns = this.options.namespace;
            if (this._isXHRUpload(this.options)) {
                this.options.dropZone
                    .bind('dragover.' + ns, {fileupload: this}, this._onDragOver)
                    .bind('drop.' + ns, {fileupload: this}, this._onDrop)
                    .bind('paste.' + ns, {fileupload: this}, this._onPaste);
            }
            this.options.fileInput
                .bind('change.' + ns, {fileupload: this}, this._onChange);
        },

        _destroyEventHandlers: function () {
            var ns = this.options.namespace;
            this.options.dropZone
                .unbind('dragover.' + ns, this._onDragOver)
                .unbind('drop.' + ns, this._onDrop)
                .unbind('paste.' + ns, this._onPaste);
            this.options.fileInput
                .unbind('change.' + ns, this._onChange);
        },

        _setOption: function (key, value) {
            var refresh = $.inArray(key, this._refreshOptionsList) !== -1;
            if (refresh) {
                this._destroyEventHandlers();
            }
            $.Widget.prototype._setOption.call(this, key, value);
            if (refresh) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input:file') ?
                        this.element : this.element.find('input:file');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
        },

        _create: function () {
            var options = this.options,
                dataOpts = $.extend({}, this.element.data());
            dataOpts[this.widgetName] = undefined;
            $.extend(options, dataOpts);
            options.namespace = options.namespace || this.widgetName;
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = this._loaded = this._total = 0;
            this._initEventHandlers();
        },

        destroy: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.destroy.call(this);
        },

        enable: function () {
            $.Widget.prototype.enable.call(this);
            this._initEventHandlers();
        },

        disable: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.disable.call(this);
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            data.files = $.each($.makeArray(data.files), this._normalizeFile);
            this._onAdd(null, data);
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));


/*
 * jQuery File Upload Image Processing Plugin 1.0.6
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            'canvas-to-blob',
            './jquery.fileupload'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage,
            window.canvasToBlob
        );
    }
}(function ($, loadImage, canvasToBlob) {
    'use strict';

    // The File Upload IP version extends the basic fileupload widget
    // with image processing functionality:
    $.widget('blueimpIP.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression to define which image files are to be
            // resized, given that the browser supports the operation:
            resizeSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            // The maximum file size of images that are to be resized:
            resizeSourceMaxFileSize: 20000000, // 20MB
            // The maximum width of the resized images:
            resizeMaxWidth: undefined,
            // The maximum height of the resized images:
            resizeMaxHeight: undefined,
            // The minimum width of the resized images:
            resizeMinWidth: undefined,
            // The minimum height of the resized images:
            resizeMinHeight: undefined,

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                $(this).fileupload('resize', data).done(function () {
                    data.submit();
                });
            }
        },

        // Resizes the image file at the given index and stores the created blob
        // at the original position of the files list, returns a Promise object:
        _resizeImage: function (files, index, options) {
            var that = this,
                file = files[index],
                deferred = $.Deferred(),
                canvas,
                blob;
            options = options || this.options;
            loadImage(
                file,
                function (img) {
                    var width = img.width,
                        height = img.height;
                    canvas = loadImage.scale(img, {
                        maxWidth: options.resizeMaxWidth,
                        maxHeight: options.resizeMaxHeight,
                        minWidth: options.resizeMinWidth,
                        minHeight: options.resizeMinHeight,
                        canvas: true
                    });
                    if (width !== canvas.width || height !== canvas.height) {
                        canvasToBlob(canvas, function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\..+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            files[index] = blob;
                            deferred.resolveWith(that);
                        }, file);
                    } else {
                        deferred.resolveWith(that);
                    }
                }
            );
            return deferred.promise();
        },

        // Resizes the images given as files property of the data parameter,
        // returns a Promise object that allows to bind a done handler, which
        // will be invoked after processing all images is done:
        resize: function (data) {
            var that = this,
                options = $.extend({}, this.options, data),
                resizeAll = $.type(options.resizeSourceMaxFileSize) !== 'number',
                isXHRUpload = this._isXHRUpload(options);
            $.each(data.files, function (index, file) {
                if (isXHRUpload && that._resizeSupport &&
                        (options.resizeMaxWidth || options.resizeMaxHeight ||
                            options.resizeMinWidth || options.resizeMinHeight) &&
                        (resizeAll || file.size < options.resizeSourceMaxFileSize) &&
                        options.resizeSourceFileTypes.test(file.type)) {
                    that._processing += 1;
                    if (that._processing === 1) {
                        that.element.addClass('fileupload-processing');
                    }
                    that._processingQueue = that._processingQueue.pipe(function () {
                        var deferred = $.Deferred();
                        that._resizeImage(
                            data.files,
                            index,
                            options
                        ).done(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that.element
                                    .removeClass('fileupload-processing');
                            }
                            deferred.resolveWith(that);
                        });
                        return deferred.promise();
                    });
                }
            });
            return this._processingQueue;
        },

        _create: function () {
            $.blueimp.fileupload.prototype._create.call(this);
            this._processing = 0;
            this._processingQueue = $.Deferred().resolveWith(this).promise();
            this._resizeSupport = canvasToBlob && canvasToBlob(
                document.createElement('canvas'),
                $.noop
            );
        }

    });

}));


/*
 * jQuery File Upload User Interface Plugin 6.6.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document, URL, webkitURL, FileReader */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            'load-image',
            './jquery.fileupload-ip'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl,
            window.loadImage
        );
    }
}(function ($, tmpl, loadImage) {
    'use strict';

    // The UI version extends the IP (image processing) version or the basic
    // file upload widget and adds complete user interface interaction:
    var parentWidget = ($.blueimpIP || $.blueimp).fileupload;
    $.widget('blueimpUI.fileupload', parentWidget, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The following option limits the number of files that are
            // allowed to be uploaded using this widget:
            maxNumberOfFiles: undefined,
            // The maximum allowed file size:
            maxFileSize: undefined,
            // The minimum allowed file size:
            minFileSize: undefined,
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes:  /.+$/i,
            // The regular expression to define for which files a preview
            // image is shown, matched against the file type:
            previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            // The maximum file size of images that are to be displayed as preview:
            previewSourceMaxFileSize: 5000000, // 5MB
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // By default, preview images are displayed as canvas elements
            // if supported by the browser. Set the following option to false
            // to always display preview images as img elements:
            previewAsCanvas: true,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            downloadTemplateId: 'template-download',
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                var that = $(this).data('fileupload'),
                    options = that.options,
                    files = data.files;
                $(this).fileupload('resize', data).done(data, function () {
                    that._adjustMaxNumberOfFiles(-files.length);
                    data.isAdjusted = true;
                    data.files.valid = data.isValidated = that._validate(files);
                    data.context = that._renderUpload(files)
                        .appendTo(options.filesContainer)
                        .data('data', data);
                    that._renderPreviews(files, data.context);
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            if ((that._trigger('added', e, data) !== false) &&
                                    (options.autoUpload || data.autoUpload) &&
                                    data.autoUpload !== false && data.isValidated) {
                                data.submit();
                            }
                        }
                    );
                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                var that = $(this).data('fileupload');
                if (!data.isValidated) {
                    if (!data.isAdjusted) {
                        that._adjustMaxNumberOfFiles(-data.files.length);
                    }
                    if (!that._validate(data.files)) {
                        return false;
                    }
                }
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .find('.bar').css(
                            'width',
                            parseInt(100, 10) + '%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                var that = $(this).data('fileupload'),
                    template,
                    preview;
                if (data.context) {
                    data.context.each(function (index) {
                        var file = ($.isArray(data.result) &&
                                data.result[index]) || {error: 'emptyResult'};
                        if (file.error) {
                            that._adjustMaxNumberOfFiles(1);
                        }
                        that._transition($(this)).done(
                            function () {
                                var node = $(this);
                                template = that._renderDownload([file])
                                    .css('height', node.height())
                                    .replaceAll(node);
                                that._forceReflow(template);
                                that._transition(template).done(
                                    function () {
                                        data.context = $(this);
                                        that._trigger('completed', e, data);
                                    }
                                );
                            }
                        );
                    });
                } else {
                    template = that._renderDownload(data.result)
                        .appendTo(that.options.filesContainer);
                    that._forceReflow(template);
                    that._transition(template).done(
                        function () {
                            data.context = $(this);
                            that._trigger('completed', e, data);
                        }
                    );
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                var that = $(this).data('fileupload'),
                    template;
                that._adjustMaxNumberOfFiles(data.files.length);
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                true;
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                        }
                                    );
                                }
                            );
                        } else {
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    that._adjustMaxNumberOfFiles(-data.files.length);
                    data.context = that._renderUpload(data.files)
                        .appendTo(that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (data.context) {
                    data.context.find('.progress .bar').css(
                        'width',
                        parseInt(data.loaded / data.total * 100, 10) + '%'
                    );
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                $(this).find('.fileupload-buttonbar .progress .bar').css(
                    'width',
                    parseInt(data.loaded / data.total * 100, 10) + '%'
                );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                var that = $(this).data('fileupload');
                that._transition($(this).find('.fileupload-buttonbar .progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                var that = $(this).data('fileupload');
                that._transition($(this).find('.fileupload-buttonbar .progress')).done(
                    function () {
                        $(this).find('.bar').css('width', '0%');
                        that._trigger('stopped', e);
                    }
                );
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                var that = $(this).data('fileupload');
                if (data.url) {
                    $.ajax(data);
                }
                that._adjustMaxNumberOfFiles(1);
                that._transition(data.context).done(
                    function () {
                        $(this).remove();
                        that._trigger('destroyed', e, data);
                    }
                );
            }
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (err) {}
            });
        },

        _adjustMaxNumberOfFiles: function (operand) {
            if (typeof this.options.maxNumberOfFiles === 'number') {
                this.options.maxNumberOfFiles += operand;
                if (this.options.maxNumberOfFiles < 1) {
                    this._disableFileInputButton();
                } else {
                    this._enableFileInputButton();
                }
            }
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _hasError: function (file) {
            if (file.error) {
                return file.error;
            }
            // The number of added files is subtracted from
            // maxNumberOfFiles before validation, so we check if
            // maxNumberOfFiles is below 0 (instead of below 1):
            if (this.options.maxNumberOfFiles < 0) {
                return 'maxNumberOfFiles';
            }
            // Files are accepted if either the file type or the file name
            // matches against the acceptFileTypes regular expression, as
            // only browsers with support for the File API report the type:
            if (!(this.options.acceptFileTypes.test(file.type) ||
                    this.options.acceptFileTypes.test(file.name))) {
                return 'acceptFileTypes';
            }
            if (this.options.maxFileSize &&
                    file.size > this.options.maxFileSize) {
                return 'maxFileSize';
            }
            if (typeof file.size === 'number' &&
                    file.size < this.options.minFileSize) {
                return 'minFileSize';
            }
            return null;
        },

        _validate: function (files) {
            var that = this,
                valid = !!files.length;
            $.each(files, function (index, file) {
                file.error = that._hasError(file);
                if (file.error) {
                    valid = false;
                }
            });
            return valid;
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreview: function (file, node) {
            var that = this,
                options = this.options,
                deferred = $.Deferred();
            return ((loadImage && loadImage(
                file,
                function (img) {
                    node.append(img);
                    that._forceReflow(node);
                    that._transition(node).done(function () {
                        deferred.resolveWith(node);
                    });
                },
                {
                    maxWidth: options.previewMaxWidth,
                    maxHeight: options.previewMaxHeight,
                    canvas: options.previewAsCanvas
                }
            )) || deferred.resolveWith(node)) && deferred;
        },

        _renderPreviews: function (files, nodes) {
            var that = this,
                options = this.options;
            nodes.find('.preview span').each(function (index, element) {
                var file = files[index];
                if (options.previewSourceFileTypes.test(file.type) &&
                        ($.type(options.previewSourceMaxFileSize) !== 'number' ||
                        file.size < options.previewSourceMaxFileSize)) {
                    that._processingQueue = that._processingQueue.pipe(function () {
                        var deferred = $.Deferred();
                        that._renderPreview(file, $(element)).done(
                            function () {
                                deferred.resolveWith(that);
                            }
                        );
                        return deferred.promise();
                    });
                }
            });
            return this._processingQueue;
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(this),
                template = button.closest('.template-upload'),
                data = template.data('data');
            if (data && data.submit && !data.jqXHR && data.submit()) {
                button.prop('disabled', true);
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(this).closest('.template-upload'),
                data = template.data('data') || {};
            if (!data.jqXHR) {
                data.errorThrown = 'abort';
                e.data.fileupload._trigger('fail', e, data);
            } else {
                data.jqXHR.abort();
            }
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(this);
            e.data.fileupload._trigger('destroy', e, {
                context: button.closest('.template-download'),
                url: button.attr('data-url'),
                type: button.attr('data-type') || 'DELETE',
                dataType: e.data.fileupload.options.dataType
            });
        },

        _forceReflow: function (node) {
            this._reflow = $.support.transition &&
                node.length && node[0].offsetWidth;
        },

        _transition: function (node) {
            var that = this,
                deferred = $.Deferred();
            if ($.support.transition && node.hasClass('fade')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            deferred.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                deferred.resolveWith(node);
            }
            return deferred;
        },

        _initButtonBarEventHandlers: function () {
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer,
                ns = this.options.namespace;
            fileUploadButtonBar.find('.start')
                .bind('click.' + ns, function (e) {
                    e.preventDefault();
                    filesList.find('.start button').click();
                });
            fileUploadButtonBar.find('.cancel')
                .bind('click.' + ns, function (e) {
                    e.preventDefault();
                    filesList.find('.cancel button').click();
                });
            fileUploadButtonBar.find('.delete')
                .bind('click.' + ns, function (e) {
                    e.preventDefault();
                    filesList.find('.delete input:checked')
                        .siblings('button').click();
                    fileUploadButtonBar.find('.toggle')
                        .prop('checked', false);
                });
            fileUploadButtonBar.find('.toggle')
                .bind('change.' + ns, function (e) {
                    filesList.find('.delete input').prop(
                        'checked',
                        $(this).is(':checked')
                    );
                });
        },

        _destroyButtonBarEventHandlers: function () {
            this.element.find('.fileupload-buttonbar button')
                .unbind('click.' + this.options.namespace);
            this.element.find('.fileupload-buttonbar .toggle')
                .unbind('change.' + this.options.namespace);
        },

        _initEventHandlers: function () {
            parentWidget.prototype._initEventHandlers.call(this);
            var eventData = {fileupload: this};
            this.options.filesContainer
                .delegate(
                    '.start button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._startHandler
                )
                .delegate(
                    '.cancel button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._cancelHandler
                )
                .delegate(
                    '.delete button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._deleteHandler
                );
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            var options = this.options;
            this._destroyButtonBarEventHandlers();
            options.filesContainer
                .undelegate('.start button', 'click.' + options.namespace)
                .undelegate('.cancel button', 'click.' + options.namespace)
                .undelegate('.delete button', 'click.' + options.namespace);
            parentWidget.prototype._destroyEventHandlers.call(this);
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = document.createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _initSpecialOptions: function () {
            parentWidget.prototype._initSpecialOptions.call(this);
            this._initFilesContainer();
            this._initTemplates();
        },

        _create: function () {
            parentWidget.prototype._create.call(this);
            this._refreshOptionsList.push(
                'filesContainer',
                'uploadTemplateId',
                'downloadTemplateId'
            );
            if (!$.blueimpIP) {
                this._processingQueue = $.Deferred().resolveWith(this).promise();
                this.resize = function () {
                    return this._processingQueue;
                };
            }
        },

        enable: function () {
            parentWidget.prototype.enable.call(this);
            this.element.find('input, button').prop('disabled', false);
            this._enableFileInputButton();
        },

        disable: function () {
            this.element.find('input, button').prop('disabled', true);
            this._disableFileInputButton();
            parentWidget.prototype.disable.call(this);
        }

    });

}));


/*
 * jQuery Iframe Transport Plugin 1.4
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true, nomen: true */
/*global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    $.ajaxTransport('iframe', function (options) {
        if (options.async && (options.type === 'POST' || options.type === 'GET')) {
            var form,
                iframe;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            (counter += 1) + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, and script:
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return $(iframe[0].body).html();
            },
            'iframe script': function (iframe) {
                return $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));


/*
 * jQuery File Upload Plugin Localization Example 6.5
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

window.locale = {
    "fileupload": {
        "errors": {
            "maxFileSize": "File is too big",
            "minFileSize": "File is too small",
            "acceptFileTypes": "Filetype not allowed",
            "maxNumberOfFiles": "Max number of files exceeded",
            "uploadedBytes": "Uploaded bytes exceed file size",
            "emptyResult": "Empty file upload result"
        },
        "error": "Error",
        "start": "Start",
        "cancel": "Cancel",
        "destroy": "Delete"
    }
};


/*global $, window, document */

var ImageRender;

ImageRender = (function() {

  function ImageRender(data) {
    if (data == null) data = [];
    this.data = data;
  }
  
  ImageRender.prototype.observerBtns = function(scope) {
	  var rmBtns = $(scope).find('.delete');
	  rmBtns.unbind('click');
	  rmBtns.click( function() {
		  $(this).parents('tr').fadeOut('slow', function() {
			  $(this).remove();
		  })
	  })
  }
  
  ImageRender.prototype.data = [];
  
  /**
   * function will render preview images
   * @var domElement - selector of DOM or jQuery object
   * @var type - will contain behaviour, what we have to do with images, update or append
   */
  ImageRender.prototype.render = function(domElement, type) {
	  if (type == null) type = 'update';
	  var domElement = $(domElement);
	  if(this.data.length > 0) {
		  for(var idx in this.data) {
			  var logo = $('<img/>').attr({
					  					'src':	this.data[idx].url, 
					  					'alt': 	this.data[idx].name, 
					  					'title':this.data[idx].name
					  					//'width': 220
					  				});
			  if(this.data[idx].type == 'logo') {
				var fileName = '<input class="input-file" value="'+this.data[idx].name+'" name="logo" type="hidden">';
			  }
			  if(this.data[idx].type == 'photo') {
				 var fileName = '<input class="input-file" value="'+this.data[idx].name+'" name="photos[]" type="hidden">';
			  }
			  if(type == 'update') {
				  domElement.html(logo);
				  domElement.parents('form').append(fileName);
			  }
			  if(type == 'append') {
				  var tr = $('<tr></tr>');
				  var td = $('<td></td>');
				  td
				  	.append(logo)
				  	.append(fileName);
				  tr
				  	.append(td)
				  	.append('<td><button type="button" class="btn btn-danger delete"><i class="icon-trash icon-white"></i><span>Delete</span></button></td>');
				  domElement.append(tr);
			  }
		  }
	  }
  }
 
  
  return ImageRender;

})();


function initUploader()
{
	'use strict';
	var filesList = {}
	
$('#add_listing').fileupload({
	
       url: SYS.siteUrl + '/vineyards/upload/',
       multipart: true,
       singleFileUploads: false,
       
       add: function(e,data) {
	$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html($('<img/>').attr({'src' : '/images/spinner.gif'}));
	var imagediv = $('#' + e.srcElement.id).parents('.oneLine').find('.wine_image');
	var imagename = $('#' + e.srcElement.id).parent().find('.image');
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
		$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html('');
                	if(result.length > 0) {
                		var image = new ImageRender(result);
                		if(result[0].type == 'logo') {
				    var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				    var path = '<input class="input-file" value="'+result[0].name+'" id="logo" name="logo" type="hidden">'
				    $('#vineyard_logo').html(logo);
				    $('#logo').html(path);
                		}
			if(result[0].type == 'image') {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="wines[image][]" type="hidden">'
				imagediv.html(logo);
				imagename.html(path);
			}
                		if(result[0].type == 'photo') {
                			image.render('#vineyard_photos', 'append');
                			image.observerBtns('#vineyard_photos');
                		}
                	}
                })
                .error(function (jqXHR, textStatus, errorThrown) {
                })
                .complete(function (result, textStatus, jqXHR) {
                });
       },
       
       progress: function(e, data) {
         var progress = parseInt(data.loaded / data.total * 100, 10);
       }
    });
}

$(function() {
	initUploader();
})

var map;
var maps;
var initialLocation;
var default_center = new google.maps.LatLng(-1.777954793195064, -15.592067241668701);
var center;
var zoom;
var loc_y = '';
var loc_z = '';
geocoder = new google.maps.Geocoder();
var marker;

$(document).ready(
	function initialize() {
		if(loc_y != '' && loc_z != '') {
			center = new google.maps.LatLng(loc_y, loc_z);
			zoom = 14;
		} else {
			center = default_center;
			zoom = 1;
		}
		var myOptions = {
						streetViewControl: false,
						zoomControl: false,
						zoom: zoom,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: center,
						mapTypeControl: false
		}

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		if(loc_y != '' && loc_z != '') {
			marker = new google.maps.Marker({
										position: center,
										map: map 
									});
		}

		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
		});
	$('#add_listing #continent').live('change', function () {
		var continent = $(this).val();
		var cont_text = $('#continent option:selected').text();
		if (continent == '0') {
			$('#country').html('');
			$('#country').attr('disabled', true);
			return(false);
		}
		if(continent != '') {
			$('#country').attr('disabled', true);
			$('#country').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + 'ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "continent=" + continent,
				success: function(result) {
					var options = '';
					var select   =  '<select name="country" id="country">';
					var selectval	=	$('#country').val();
					$(result.country).each(function() {
						if(selectval == $(this).attr('id')) {
							options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						} else {
							options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						}										
					});
					select	+=	options;
					select	+=	'</select>';
					var zindex = $('#country').parents('.jNiceWrapper').css('z-index');
					$('#country').closest('.jNiceWrapper').replaceWith(select);
					$('#country').closest('.oneLine').jNice(function(el) {
						el.parents('.jNiceWrapper').css({'z-index': zindex});
					});
					
					geocod(cont_text, 2);
				}	
			});
		}	
		
	});		

	$('#add_listing #country').live('change', function () {
		var country = $(this).val();
		var count_text = $('#country option:selected').text();
		if (country == '0') {
			$('#ass_region').html('');
			$('#ass_region').attr('disabled', true);
			return(false);
		}
//		if(country != '') {
			$('#ass_region').attr('disabled', true);
			$('#ass_region').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + 'ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "country=" + country,
				success: function(result) {
						var options = '';
						var select		=  '<select name="ass_region" id="ass_region">';
						var selectval	=	$('#ass_region').val();
						$(result.ass_region).each(function() {
							if(selectval == $(this).attr('id')) {
								options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							} else {
								options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							}
						});	
						select	+=	options;
						select	+=	'</select>';	
						var zindex = $('#ass_region').parents('.jNiceWrapper').css('z-index');
						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
						$('#ass_region').closest('.oneLine').jNice(function(el) {
							el.parents('.jNiceWrapper').css({'z-index': zindex});
						});
//						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
//						$('#ass_region').closest('.oneLine').jNice();
						geocod(count_text, 4);
				}
			});
//		}	
	});
	$('#add_listing #ass_region').live('change', function () {
			var region = $('#ass_region option:selected').text();
			geocod(region, 10);
	});
		
		
	$('#edit_vineyard #continent').live('change', function () {
		var continent = $(this).val();
		var cont_text = $('#continent option:selected').text();
		if (continent == '0') {
			$('#country').html('');
			$('#country').attr('disabled', true);
			return(false);
		}
		
			$('#country').attr('disabled', true);
//			$('#country').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "continent=" + continent,
				success: function(result) {
					var options = '';
					var select   =  '<select name="country" id="country">';
					var selectval	=	$('#country').val();
					$(result.country).each(function() {
						if(selectval == $(this).attr('id')) {
							options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						} else {
							options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
						}										
					});
					select	+=	options;
					select	+=	'</select>';
					var zindex = $('#country').parents('.jNiceWrapper').css('z-index');
					$('#country').closest('.jNiceWrapper').replaceWith(select);
					$('#country').closest('.oneLine').jNice(function(el) {
						el.parents('.jNiceWrapper').css({'z-index': zindex});
					});
					
					geocod(cont_text, 2);
				}	
			});
		
//		$('.jNiceWrapper').css({'z-index':0});
	});		

	$('#edit_vineyard #country').live('change', function () {
		var country = $(this).val();
		var count_text = $('#country option:selected').text();
		if (country == '0') {
			$('#ass_region').html('');
			$('#ass_region').attr('disabled', true);
			return(false);
		}
//		if(country != '') {
			$('#ass_region').attr('disabled', true);
//			$('#ass_region').html('<option>loading...</option>');
			$.ajax({
				url: SYS.siteUrl + '/vineyards/ajaxselect',
				type: 'POST',
				dataType: 'json',
				data: "country=" + country,
				success: function(result) {
						var options = '';
						var select		=  '<select name="ass_region" id="ass_region">';
						var selectval	=	$('#ass_region').val();
						$(result.ass_region).each(function() {
							if(selectval == $(this).attr('id')) {
								options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							} else {
								options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
							}
						});	
						select	+=	options;
						select	+=	'</select>';	
						var zindex = $('#ass_region').parents('.jNiceWrapper').css('z-index');
						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
						$('#ass_region').closest('.oneLine').jNice(function(el) {
							el.parents('.jNiceWrapper').css({'z-index': zindex});
						});
//						$('#ass_region').closest('.jNiceWrapper').replaceWith(select);
//						$('#ass_region').closest('.oneLine').jNice();
						geocod(count_text, 4);
				}
			});
//		}	
	});
	$('#edit_vineyard #ass_region').live('change', function () {
			var region = $('#ass_region option:selected').text();
			geocod(region, 10);
	});	
	}
);	
	function geocod(address, zoom) {
		geocoder.geocode( {'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				map.setZoom(zoom);
			} 
		});		 
	}	


function placeMarker(location) {
//	console.log(location);
	if ( marker ) {
		marker.setPosition(location);
	} else {
		var image = '/images/vineyard.gif'; 
		marker = new google.maps.Marker({
										animation: google.maps.Animation.DROP, 
										position: location,
										map: map, 
										icon: image
									});
		map.setCenter(location);							
	}
	var infowindow = new google.maps.InfoWindow();
	geocoder.geocode({'latLng': location}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$('#city').val(results[1].address_components[0].long_name);
				$('#city').parents('.oneLine').find('.error').hide();
			}
		}
	});
	$('#add_listing #loc_y').val(location.lat());
	$('#add_listing #loc_y').parents('.oneLine').find('.error').hide();
	$('#add_listing #loc_z').val(location.lng());
	$('#add_listing #loc_z').parents('.oneLine').find('.error').hide();
	$('#correct #loc_y').val(location.lat());
	$('#correct #loc_z').val(location.lng());
	$('#edit_vineyard #loc_y').val(location.lat());
	$('#edit_vineyard #loc_y').parents('.oneLine').find('.error').hide();
	$('#edit_vineyard #loc_z').val(location.lng());
	$('#edit_vineyard #loc_y').parents('.oneLine').find('.error').hide();
	$('#add_listing #location').css('display', 'block');
}

var vineyards = {
	init: function() {
		this.addSeason();
		this.deleteSeason();
		this.addWine();
		this.deleteWine();
		this.times();
		this.time1();
		this.time2();
		this.addSpoken();
		this.addGrape();
		this.addVineyard();
		this.verifed();
		this.correct();
		this.slaider();
	},

	slaider: function() {
		$('#coin-slider').coinslider({
			width: 568,
			height: 427,
			spw: 1,
			sph:1
		});
	},

	correct: function() {
		$('#correct_ok').click(function(e){
			e.preventDefault();
			var form = $('#correct');
			var comment = trim($('#correct_comment').val());
			if(comment != '') {
				$('#comment_error').css('display', 'none');
				form.append("<input type='hidden' name='comment' value='" + comment + "' >");
				form.get(0).submit();
			} else {
				$('#com_error').css('display', 'block');
			}
		});
	},

	verifed: function() {
		$('#verif').click(function(e){
			e.preventDefault();
			var listing = $('#verif_list').val();
			$.ajax({
					url: SYS.siteUrl + '/vineyards/ajaxverif',
					type: 'POST',
					dataType: 'json',
					data: "listing=" + listing,
					success: function(result) {
						window.location.href=SYS.siteUrl+"/main/managelistings";
					}	
			});			
		});
	},
	
	addVineyard: function(){
		$('#web').change(function(){
			var web = $('#web').val();
			$('#web').attr('value', 'http://'+web);
		});
		$('#add_listing').validate({
			errorClass:'error',
			validClass:'succses',
			errorElement:'span',
			rules:{
					name: {
							required: true
					},
					city: {
							required: true
					},
					country: {
							required: true
					},
					continent: {
							required: true
					},
					ass_region: {
							required: true
					},
					loc_y: {
							required: true
					},
					loc_z: {
							required: true
					},
					email: {
							email: true
					},
					web: {
							url: true
					},
					zip: {
							number: true
					},
					telephone: {
							required: true,
							number: true
					},
					fax: {
							number: true
					}					
			},
			messages:{
				email: "Please enter a valid email address",
				url: "Please enter a valid email address",
				telephone: {
							required: "Please enter telephone",
							number: "Please enter valid telephone"
				},
				name: "Please enter vineyard name",
				loc_y: "Please specify the location",
				loc_z: "Please specify the location",
				city: "Please enter a city",
				ass_region: "Please select associated region",
				country: "Please select country",
				continent: "Please select continent"
			},
			highlight: function (element, errorClass, validClass) {
				setTimeout(function() {
					var span = $(element).parents('.oneLine').find('span.error');
					$(element).parents(".oneLine").find('.helpWrapper').after(span);
				}, 0);
				
//					
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.onLine").removeClass(errorClass).addClass(validClass);
			}
		});
	},

	addSpoken: function() {
	    $('#add_spoken').click(function(event){
		event.preventDefault();
		var spokenClone = $('#spoken_tmp .addedBox').clone();
		$(spokenClone).jNice();
		$('.spokens').append(spokenClone);
	     });
	},

	addGrape: function() {
	    $('#add_grape').click(function(event){
		event.preventDefault();
		var grapeClone = $('#grape_tmp .addedBox').clone();
		$(grapeClone).jNice();
		$('.grapes').append(grapeClone);
	     });
	},
		
	addWine: function() {
	    $('.add_wine').click(function(event){
		event.preventDefault();
		
		var number = $('.wines .wine').length +1;
		var wineClone = $('#wine-tmp .wine').clone();
		wineClone.attr('id', 'wine'+ number);
		$(wineClone).jNice();
		$('.wines').append(wineClone);
		$('#wine'+number+' #grapes_w').attr('id', 'grapes_w'+number);
		$('#wine'+number+' #vintage_w').attr('id', 'vintage_w'+number);
		var num = number - 1;
		$('#wine'+number+' #root').attr('id', 'root'+num);		
		$('#wine'+number+' #grapes_w'+number).attr('name', 'wines[grapes]['+num+']');
		$('#wine'+number+' #vintage_w'+number).attr('name', 'wines[vintage]['+num+']');
		$('.delete_wine').click( function(event) {
			event.preventDefault();
			$(this).parents('.wine').remove();
		});
		$('#add_listing').fileupload('destroy');
		initUploader();
		initUploader1();
	    });
	},

	deleteWine: function() {
		$('.delete_wine').click( function(event) {
			event.preventDefault();
				$(this).parents('.wine').remove();
		});
	},
	
	addSeason: function() {
		$('.add_season').click( function(event) {
			event.preventDefault();
			var number = $('.seasons .season').length +1;
			var seasonClone = $('#season-tmp .season').clone();
			seasonClone.attr('id', 'season'+ number);
			var seasonLable = seasonClone.find('#seasons-label');
			seasonLable.attr('id','season-label' + number);
			seasonLable.find('label').text('Season ' + number + ' Name:');
			$('.seasons').append(seasonClone);
			$('#season'+number+' .date').text('Season '+ number + ' Dates Date to date:');
			$('#season'+number+' .times').text('Season '+ number + ' Timings Time of Day:');
			//change name
			$('#season'+number+' #season1').attr('id', 'season'+number);
			//change date
			$('#season'+number+' #date2').attr('id', 'date'+number+2);
			$('#season'+number+' #date1').attr('id', 'date'+number+1);
			//change time
			$('#season'+number+' #time2').attr('id', 'time'+number+2);
			$('#season'+number+' #time1').attr('id', 'time'+number+1);
			var num = number - 1;
			$('#season'+number+' .week_days .checkboxBox').each(function() {
				var day_name = $(this).val();
				var newAttr = 'weeks-'+day_name+number;
				$(this).attr('id', newAttr);
				$(this).find('input').attr('name', 'season[weeks]['+num+'][]');
				$(this).parent().attr('for', newAttr);
			});
			//notes
			$('#season'+number+' #notes').attr('id', 'notes'+number);
			$('#season'+number+' #notes'+number).attr('name', 'season[notes][]');
			
			$("#time"+number+"1, #time2"+number+"").timePicker();
			//change link delete
			$('#season'+number+' .delete_season').attr('rel', 'season'+number);

			//Store time used by duration.
			var oldTime = $.timePicker("#time"+number+"1").getTime();
			//Keep the duration between the two inputs.
			$("#time"+number+"1").change(function() {
				if ($("#time"+number+"2").val()) { // Only update when second input has a value.
					// Calculate duration.
					var duration = ($.timePicker("#time"+number+"2").getTime() - oldTime);
					var time = $.timePicker("#time"+number+"1").getTime();
					// Calculate and update the time in the second input.
					$.timePicker("#time"+number+"2").setTime(new Date(new Date(time.getTime() + duration)));
					oldTime = time;
				}
			});

			//date-picker
			$("#date"+number+"1").datepicker({"dateFormat":"M dd"});
			$("#date"+number+"2").datepicker({"dateFormat":"M dd"});
			//initialization delete season
			$('#season'+number+' .delete_season').click( function(event) {
				event.preventDefault();
				var link = $('#season'+number+' .delete_season');
				var season 	= link.attr('rel');
				this.latestLink = link;
				$('#'+season+'').remove();
			});
		});
	},	

	deleteSeason: function() {
		$('.delete_season').click( function(event) {
			event.preventDefault();
				$(this).parents('.season').remove();
		});
	},

	times: function() {
		$("#time1, #time2").timePicker();
	},

	time1: function() {
		//Keep the duration between the two inputs.
		$("#time1").change(function() {
			if ($("#time2").val()) { 
				// Calculate duration.
				var duration = ($.timePicker("#time2").getTime() - oldTime);
				var time = $.timePicker("#time1").getTime();
				// Calculate and update the time in the second input.
				$.timePicker("#time2").setTime(new Date(new Date(time.getTime() + duration)));
				oldTime = time;
			}
		});
	},
	
	time2: function() {
		$("#time2").change(function() {
			if($.timePicker("#time1").getTime() > $.timePicker(this).getTime()) {
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
		});
	}
}

//init our object
$(function() {
	$(".correct").fancybox({
		maxWidth	: 495,
		maxHeight	: 330,
		fitToView	: false,
		autoSize	: false,
		closeClick	: false
	});
        vineyards.init();
	  var rmBtns = $('#vineyard_photos').find('.delete');
	  rmBtns.unbind('click');
	  rmBtns.click( function() {
		  $(this).parents('tr').fadeOut('slow', function() {
			  $(this).remove();
		  })
	  })
	var count_season  = $('.seasons .season').length;
	for(i = 0; i <= count_season; i++) {
		$("#date" + i +"1").datepicker({"dateFormat":"M dd"});
		$("#date" + i +"2").datepicker({"dateFormat":"M dd"});
	
		$("#time" + i +"1, #time" + i +"2").timePicker();
		$("#time" + i +"1").change(function() {
			if ($("#time" + i +"2").val()) { 
				// Calculate duration.
				var duration = ($.timePicker("#time" + i +"2").getTime() - oldTime);
				var time = $.timePicker("#time" + i +"1").getTime();
				// Calculate and update the time in the second input.
				$.timePicker("#time" + i +"2").setTime(new Date(new Date(time.getTime() + duration)));
				oldTime = time;
			}
		});
		$("#time" + i +"2").change(function() {
			if($.timePicker("#time" + i +"1").getTime() > $.timePicker(this).getTime()) {
				$(this).addClass("error");
			} else {
				$(this).removeClass("error");
			}
		});
	}
	
	$("#date1").datepicker({"dateFormat":"M dd"});
	$("#date2").datepicker({"dateFormat":"M dd"});
	$('.tab-top a').click(function (e) {
		e.preventDefault();
		$('#tab-content .active').addClass('inactive');
		$('#tab-content .active').removeClass('active');
		$($(this).attr('href')).removeClass('inactive');
		$($(this).attr('href')).addClass('active');
		$('.tab .active').removeClass('active');
		$(this).parent('.tab-top').addClass('active');
	})
	var loc = window.location.hash.replace("#","");
	if(loc == 'wines') {
		$('#tab-content .active').addClass('inactive');
		$('#tab-content .active').removeClass('active');
		$('#vines').removeClass('inactive');
		$('#vines').addClass('active');
		$('.tab .active').removeClass('active');
		$("a[href^='#vines']").parent('.tab-top').addClass('active');
	}	
});


function initUploader1()
{
	'use strict';
	var filesList = {}
	
$('#edit_vineyard').fileupload({
       url: SYS.siteUrl + '/vineyards/upload/',
       multipart: true,
       singleFileUploads: false,
       
       add: function(e,data) {
	$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html($('<img/>').attr({'src' : '/images/spinner.gif'}));
	var imagediv = $('#' + e.srcElement.id).parents('.oneLine').find('.wine_image');
	var imagename = $('#' + e.srcElement.id).parent().find('.image');
         var jqXHR = data.submit()
                .success(function(result, textStatus, jqXHR) {
		$('#' + e.srcElement.id).parents('.oneLine').find('.spiner').html('');			
                	if(result.length > 0) {
                		var image = new ImageRender(result);
                		if(result[0].type == 'logo') {
				    var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				    var path = '<input class="input-file" value="'+result[0].name+'" id="logo" name="logo" type="hidden">'
				    $('#vineyard_logo').html(logo);
				    $('#logo').html(path);
                		}
			if(result[0].type == 'image') {
				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="wines[image][]" type="hidden">'
				imagediv.html(logo);
				imagename.html(path);
			}
                		if(result[0].type == 'photo') {
                			image.render('#vineyard_photos', 'append');
                			image.observerBtns('#vineyard_photos');
                		}
                	}
                })
                .error(function (jqXHR, textStatus, errorThrown) {
                })
                .complete(function (result, textStatus, jqXHR) {
                });
       },
       
       progress: function(e, data) {
         var progress = parseInt(data.loaded / data.total * 100, 10);
       }
    });
}

$(function() {

	initUploader1();
	
	var defaultVal = [];
	$('.oneLineRightSide input:radio').each(function() {
		if(this.checked) {
			defaultVal.push({'obj': $(this), 'value':  $(this).val()});
		}
	});
	
	$('.oneLineRightSide input').change(function(){
		var currentInput = false;
		for(var i = 0; i < defaultVal.length; i++) {
			if($(this).attr('name') ===  defaultVal[i].obj.attr('name')) {
				currentInput = defaultVal[i];
				break;
			}
		}

		if(currentInput) {
			if(!(currentInput.obj.attr('name') === $(this).attr('name') && currentInput.obj.val() === $(this).val()) ){
				$(this).parents('.oneLineRightSide').find('.editBlock').show();
			} else {
				$(this).parents('.oneLineRightSide').find('.editBlock').hide();
			}
		} else {
			$(this).parents('.oneLineRightSide').find('.editBlock').show();
		}
	})

	$('.editBlock').hover(
	function(){
		if(jQuery.browser.version = 7) {
			$(this).children('.editBlockHelp').css('left', '-145');
		}
		$(this).children('.editBlockHelp').show();
	}, function(){
		$(this).children('.editBlockHelp').hide();
	});
	
})

function trim( str, charlist ) 
{	
	charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
}


var selectes = {
	init: function(){
		selectes.select();
		selectes.generations();
	}, 
	
	select: function(){
		$('#country_c').live('change', function () {
			var country = $(this).val();
			if (country == '0') {
				$('#region').html('');
				$('#region').attr('disabled', true);
			}
			$.ajax({
					url: SYS.siteUrl + '/vineyards/ajaxselect',
					type: 'POST',
					dataType: 'json',
					data: "country=" + country,
					success: function(result) {
							var options		= '';
							var select		=  '<select name="region_c"  id="region_c" disabled="disabled">';
							var selectval	=	$('#region_c').val();
							$(result.ass_region).each(function() {
								if(selectval == $(this).attr('id')) {
									options += '<option selected="selected" value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
								} else {
									options += '<option value="' + $(this).attr('id') + '">' + $(this).attr('title') + '</option>';
								}
							});
							select	+=	options;
							select	+=	'</select>';
							$('#region_c').closest('.jNiceWrapper').replaceWith(select);
							$('#region_c').closest('.floatRight').jNice();
					}
			});
		});
	},
	
	generations: function() {
		$('#mod_click').click(function(){
			$('#mod_name').focus();
			if($('#myModules').css('display') == 'none') {
				$('#mod_name_error').hide();
				$('#mod_email_error').hide();
				$('#mod_telephone').val('');
				$('#mod_peoples').val('');
				$('#mod_message').val('');
			}			
		})
		$('#mod_name').change(function(){
			var name = trim($('#mod_name').val());
			if(name == '') {
				$('#mod_name_error').show();
			} else {
				$('#mod_name_error').hide();
			}
		})
		$('#mod_email').change(function(){
			var email = trim($('#mod_email').val());
			if(email == '') {
				$('#mod_email_error').show();
			} else {
				if(isValidEmailAddress(email)){
					$('#mod_email_error').hide();
				} else {
					$('#mod_email_error').html('Please enter a valid email')
					$('#mod_email_error').show();
				}				
			}
		})
		$('#mod_ok').click(function(){
			var name = trim($('#mod_name').val());
			var email = trim($('#mod_email').val());
			var telephone = $('#mod_telephone').val();
			var peoples = $('#mod_peoples').val();
			var message = $('#mod_message').val();
			var region = $('#region_c option:selected').val();
			var country = $('#country_c option:selected').val();
			if(name == '') {
				$('#mod_name_error').show();
			} else {
				$('#mod_name_error').hide();
			}
			if(email == '') {
				$('#mod_email_error').show();
			} else {
				if(isValidEmailAddress(email)){
					$('#mod_email_error').hide();
				} else {
					$('#mod_email_error').html('Please enter a valid email')
					$('#mod_email_error').show();
				}				
			}
			if(name != '' && (email != '' && isValidEmailAddress(email))) {
				$.ajax({
							type: "POST",
							url: SYS.siteUrl + '/vineyards/modules',
							data: {
								name: name, 
								email: email, 
								telephone: telephone, 
								peoples: peoples, 
								message: message, 
								region: region, 								
								country: country
							}
					});				
				var content = '<div class="popUpWrapper" id="thanks">' +
								'<div class="popUp thanks">' +
									'<img src="/images/letter.png" alt="" />' +
									'<span class="title">Thank you!</span>' +
									'<span class="smallTetx">Your message has been sent.</span>' +
									'<span class="text">We will put you in touch with local tour operators in the region.</span>' +
									'<a href="#" id="close-mod" class="closeButton">Close</a>'+
								'</div>' +
							  '</div>';
				$.fancybox({
					content		: null, 
					maxWidth	: 535,
					maxHeight	: 235
				});
				$.fancybox({
					content		: content, 
					maxWidth	: 535,
					maxHeight	: 235
				});
				$('#close-mod').click(function(){
					$.fancybox().close();
					window.location.href=location.href;	
				});				
			}		
		})
	}
}	
$(function(){
	selectes.init();
});

function trim( str, charlist ) 
{	
	charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
}

function isValidEmailAddress(emailAddress) 
{
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;this.attr("novalidate","novalidate");b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){a=this.find("input, button");a.filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&a.filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator"),g="on"+e.type.replace(/^validate/,
"");f.settings[g]&&f.settings[g].call(f,this[0],e)}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=
this.settings.rules;c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",a).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",
a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=
a=this.validationTargetFor(this.clean(a));this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?
this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==
0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},
prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.validationTargetFor(this.clean(a));var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+
a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,
b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=
d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);
if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=
this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];return a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,
e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,
c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=
false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,
a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e;if(e=d==="required"&&typeof c.fn.prop==="function"?a.prop(d):a.attr(d))b[d]=e;else if(a[0].getAttribute("type")===d)b[d]=true}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};
var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?
e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;
return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,
b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,
mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,
b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 -]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);


/* * jNice * version: 1.0 (11.26.08) * by Sean Mooney (sean@whitespace-creative.com)  * Examples at: http://www.whitespace-creative.com/jquery/jnice/ * Dual licensed under the MIT and GPL licenses: *   http://www.opensource.org/licenses/mit-license.php *   http://www.gnu.org/licenses/gpl.html * * To Use: place in the head  *  <link href="inc/style/jNice.css" rel="stylesheet" type="text/css" /> *  <script type="text/javascript" src="inc/js/jquery.jNice.js"></script> * * And apply the jNice class to the form you want to style * * To Do: Add textareas, Add File upload * ******************************************** */(function($){	$.fn.jNice = function(cb){//		console.log(cb);		var self = this;		var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */		/* Apply document listener */		$(document).mousedown(checkExternalClick);		/* each form */		return this.each(function(){			/* If this is safari we need to add an extra class */			if (safari){$('.jNiceInputWrapper').each(function(){$(this).addClass('jNiceSafari').find('input').css('width', $(this).width()+11);});}			$('input:checkbox', this).each(CheckAdd);			$('select', this).each(function(index){ SelectAdd(this, index, cb); });			/* Add a new handler for the reset action */			$(this).bind('reset',function(){var action = function(){ Reset(this); }; window.setTimeout(action, 10); });			$('.jNiceHidden').css({opacity:0});		});			};/* End the Plugin */	var Reset = function(form){		var sel;		$('.jNiceSelectWrapper select', form).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});		$('a.jNiceCheckbox, a.jNiceRadio', form).removeClass('jNiceChecked');		$('input:checkbox, input:radio', form).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jNiceChecked');}});	};	var RadioAdd = function(){		var $input = $(this).addClass('jNiceHidden').wrap('<span class="jRadioWrapper jNiceWrapper"></span>');		var $wrapper = $input.parent();		var $a = $('<span class="jNiceRadio"></span>');		$wrapper.prepend($a);		/* Click Handler */		$a.click(function(){				var $input = $(this).addClass('jNiceChecked').siblings('input').attr('checked',true);				/* uncheck all others of same name */				$('input:radio[name="'+ $input.attr('name') +'"]').not($input).each(function(){					$(this).attr('checked',false).siblings('.jNiceRadio').removeClass('jNiceChecked');				});				return false;		});		$input.click(function(){			if(this.checked){				var $input = $(this).siblings('.jNiceRadio').addClass('jNiceChecked').end();				/* uncheck all others of same name */				$('input:radio[name="'+ $input.attr('name') +'"]').not($input).each(function(){					$(this).attr('checked',false).siblings('.jNiceRadio').removeClass('jNiceChecked');				});			}		}).focus(function(){ $a.addClass('jNiceFocus'); }).blur(function(){ $a.removeClass('jNiceFocus'); });		/* set the default state */		if (this.checked){ $a.addClass('jNiceChecked'); }	};	var CheckAdd = function(){		var $input = $(this).addClass('jNiceHidden').wrap('<span class="jNiceWrapper"></span>');		var $wrapper = $input.parent().append('<span class="jNiceCheckbox"></span>');		/* Click Handler */		var $a = $wrapper.find('.jNiceCheckbox').click(function(){				var $a = $(this);				var input = $a.siblings('input')[0];				if (input.checked===true){					input.checked = false;					$a.removeClass('jNiceChecked');				}				else {					input.checked = true;					$a.addClass('jNiceChecked');				}				$(input).trigger('change');				return false;		});		$input.click(function(){			if(this.checked){ $a.addClass('jNiceChecked'); 	}			else { $a.removeClass('jNiceChecked'); }		}).focus(function(){ $a.addClass('jNiceFocus'); }).blur(function(){ $a.removeClass('jNiceFocus'); });				/* set the default state */		if (this.checked){$('.jNiceCheckbox', $wrapper).addClass('jNiceChecked');}	};	var TextAdd = function(){		var $input = $(this).addClass('jNiceInput').wrap('<div class="jNiceInputWrapper"><div class="jNiceInputInner"></div></div>');		var $wrapper = $input.parents('.jNiceInputWrapper');		$input.focus(function(){ 			$wrapper.addClass('jNiceInputWrapper_hover');		}).blur(function(){			$wrapper.removeClass('jNiceInputWrapper_hover');		});	};	var ButtonAdd = function(){		var value = $(this).attr('value');		$(this).replaceWith('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +'" value="'+ value +'"><span><span>'+ value +'</span></span>');	};	/* Hide all open selects */	var SelectHide = function(){			$('.jNiceSelectWrapper ul:visible').hide();	};	/* Check for an external click */	var checkExternalClick = function(event) {		if ($(event.target).parents('.jNiceSelectWrapper').length === 0) { SelectHide(); }	};	var SelectAdd = function(element, index,cb){		var $select = $(element);		index = index || $select.css('zIndex')*1;		index = (index) ? index : 0;		/* First thing we do is Wrap it */		$select.wrap($('<div class="jNiceWrapper"></div>').css({zIndex: 100-index}));		var width = $select.width();		$select.addClass('jNiceHidden').after('<div class="jNiceSelectWrapper"><div><span class="jNiceSelectText"></span><span class="jNiceSelectOpen"></span></div><ul></ul></div>');		var $wrapper = $(element).siblings('.jNiceSelectWrapper').css({width: width +'px'});		$('.jNiceSelectText, .jNiceSelectWrapper ul', $wrapper).width( width - $('.jNiceSelectOpen', $wrapper).width());		/* IF IE 6 */		if ($.browser.msie && jQuery.browser.version < 7) {			$select.after($('<iframe src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" tabIndex="-1" frameborder="0"></iframe>').css({ height: $select.height()+4 +'px' }));		}		/* Now we add the options */		SelectUpdate(element);		/* Apply the click handler to the Open */		$('div', $wrapper).click(function(){			var $ul = $(this).siblings('ul');			if ($ul.css('display')=='none'){ SelectHide(); } /* Check if box is already open to still allow toggle, but close all other selects */			$ul.slideToggle();			var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);			$ul.animate({scrollTop: offSet});			return false;		});		/* Add the key listener */		$select.keydown(function(e){			var selectedIndex = this.selectedIndex;			switch(e.keyCode){				case 40: /* Down */					if (selectedIndex < this.options.length - 1){ selectedIndex+=1; }					break;				case 38: /* Up */					if (selectedIndex > 0){ selectedIndex-=1; }					break;				default:					return;					break;			}			$('ul a', $wrapper).removeClass('selected').eq(selectedIndex).addClass('selected');			$('span:eq(0)', $wrapper).html($('option:eq('+ selectedIndex +')', $select).attr('selected', 'selected').text());			return false;		}).focus(function(){ $wrapper.addClass('jNiceFocus'); }).blur(function(){ $wrapper.removeClass('jNiceFocus'); });		if(cb) cb($select);		this	};	var SelectUpdate = function(element){		var $select = $(element);		var $wrapper = $select.siblings('.jNiceSelectWrapper');		var $ul = $wrapper.find('ul').find('li').remove().end().hide();		$('option', $select).each(function(i){			$ul.append('<li><a href="#" index="'+ i +'">'+ this.text +'</a></li>');		});					/* Add click handler to the a */		$ul.find('a').click(function(){			$('a.selected', $wrapper).removeClass('selected');			$(this).addClass('selected');				/* Fire the onchange event */			if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }			$select[0].selectedIndex = $(this).attr('index');			$('span:eq(0)', $wrapper).html($(this).html());			$ul.hide();			$select.trigger('change');			return false;		});		/* Set the defalut */		$('a:eq('+ $select[0].selectedIndex +')', $ul).click();	};	var SelectRemove = function(element){		var zIndex = $(element).siblings('.jNiceSelectWrapper').css('zIndex');		$(element).css({zIndex: zIndex}).removeClass('jNiceHidden');		$(element).siblings('.jNiceSelectWrapper').remove();	};	/* Utilities */	$.jNice = {			SelectAdd : function(element, index){ 	SelectAdd(element, index); },			SelectRemove : function(element){ SelectRemove(element); },			SelectUpdate : function(element){ SelectUpdate(element); }	};/* End Utilities */	function renderJNice(){		$('form.jNice').jNice();	}		/* Automatically apply to any forms with class jNice */	$(function(){ renderJNice();	});	$(function(){		$('.wrapper').show();		$('.footerWrapper').show();	})		})(jQuery);

(function(a){function g(a){a.setFullYear(2001),a.setMonth(0),a.setDate(0);return a}function f(a,b){if(a){var c=a.split(b.separator),d=parseFloat(c[0]),e=parseFloat(c[1]);b.show24Hours||(d===12&&a.indexOf("AM")!==-1?d=0:d!==12&&a.indexOf("PM")!==-1&&(d+=12));var f=new Date(0,0,0,d,e,0);return g(f)}return null}function e(a,b){return typeof a=="object"?g(a):f(a,b)}function d(a){return(a<10?"0":"")+a}function c(a,b){var c=a.getHours(),e=b.show24Hours?c:(c+11)%12+1,f=a.getMinutes();return d(e)+b.separator+d(f)+(b.show24Hours?"":c<12?" AM":" PM")}function b(b,c,d,e){b.value=a(c).text(),a(b).change(),a.browser.msie||b.focus(),d.hide()}a.fn.timePicker=function(b){var c=a.extend({},a.fn.timePicker.defaults,b);return this.each(function(){a.timePicker(this,c)})},a.timePicker=function(b,c){var d=a(b)[0];return d.timePicker||(d.timePicker=new jQuery._timePicker(d,c))},a.timePicker.version="0.3",a._timePicker=function(d,h){var i=!1,j=!1,k=e(h.startTime,h),l=e(h.endTime,h),m="selected",n="li."+m;a(d).attr("autocomplete","OFF");var o=[],p=new Date(k);while(p<=l)o[o.length]=c(p,h),p=new Date(p.setMinutes(p.getMinutes()+h.step));var q=a('<div class="time-picker'+(h.show24Hours?"":" time-picker-12hours")+'"></div>'),r=a("<ul></ul>");for(var s=0;s<o.length;s++)r.append("<li>"+o[s]+"</li>");q.append(r),q.appendTo("body").hide(),q.mouseover(function(){i=!0}).mouseout(function(){i=!1}),a("li",r).mouseover(function(){j||(a(n,q).removeClass(m),a(this).addClass(m))}).mousedown(function(){i=!0}).click(function(){b(d,this,q,h),i=!1});var t=function(){if(q.is(":visible"))return!1;a("li",q).removeClass(m);var b=a(d).offset();q.css({top:b.top+d.offsetHeight,left:b.left}),q.show();var e=d.value?f(d.value,h):k,i=k.getHours()*60+k.getMinutes(),j=e.getHours()*60+e.getMinutes()-i,n=Math.round(j/h.step),o=g(new Date(0,0,0,0,n*h.step+i,0));o=k<o&&o<=l?o:k;var p=a("li:contains("+c(o,h)+")",q);p.length&&(p.addClass(m),q[0].scrollTop=p[0].offsetTop);return!0};a(d).focus(t).click(t),a(d).blur(function(){i||q.hide()});var u=a.browser.opera||a.browser.mozilla?"keypress":"keydown";a(d)[u](function(c){var e;j=!0;var f=q[0].scrollTop;switch(c.keyCode){case 38:if(t())return!1;e=a(n,r);var g=e.prev().addClass(m)[0];g?(e.removeClass(m),g.offsetTop<f&&(q[0].scrollTop=f-g.offsetHeight)):(e.removeClass(m),g=a("li:last",r).addClass(m)[0],q[0].scrollTop=g.offsetTop-g.offsetHeight);return!1;case 40:if(t())return!1;e=a(n,r);var i=e.next().addClass(m)[0];i?(e.removeClass(m),i.offsetTop+i.offsetHeight>f+q[0].offsetHeight&&(q[0].scrollTop=f+i.offsetHeight)):(e.removeClass(m),i=a("li:first",r).addClass(m)[0],q[0].scrollTop=0);return!1;case 13:if(q.is(":visible")){var k=a(n,r)[0];b(d,k,q,h)}return!1;case 27:q.hide();return!1}return!0}),a(d).keyup(function(a){j=!1}),this.getTime=function(){return f(d.value,h)},this.setTime=function(b){d.value=c(e(b,h),h),a(d).change()}},a.fn.timePicker.defaults={step:30,startTime:new Date(0,0,0,0,0,0),endTime:new Date(0,0,0,23,30,0),separator:":",show24Hours:!0}})(jQuery)

$(function() {
    $.fn.autoClear = function () {
        // сохраняем во внутреннюю переменную текущее значение
        $(this).each(function() {
            $(this).data("autoclear", $(this).attr("value"));
        });
        $(this)
            .bind('focus', function() {   // обработка фокуса
                if ($(this).attr("value") == $(this).data("autoclear")) {
                    $(this).attr("value", "").addClass('autoclear-normalcolor');
                }
            })
            .bind('blur', function() {    // обработка потери фокуса
                if ($(this).attr("value") == "") {
                    $(this).attr("value", $(this).data("autoclear")).removeClass('autoclear-normalcolor');
                }
            });
        return $(this);
    }
});

$(function() {
    // привязываем плагин ко всем элементам с классом "autoclear"    
    $('.autoclear').autoClear();
});

/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
* Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
* Thanks to: Seamus Leahy for adding deltaX and deltaY
*
* Version: 3.0.4
*
* Requires: 1.2.2+
*/

(function(d){function g(a){var b=a||window.event,i=[].slice.call(arguments,1),c=0,h=0,e=0;a=d.event.fix(b);a.type="mousewheel";if(a.wheelDelta)c=a.wheelDelta/120;if(a.detail)c=-a.detail/3;e=c;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){e=0;h=-1*c}if(b.wheelDeltaY!==undefined)e=b.wheelDeltaY/120;if(b.wheelDeltaX!==undefined)h=-1*b.wheelDeltaX/120;i.unshift(a,c,h,e);return d.event.handle.apply(this,i)}var f=["DOMMouseScroll","mousewheel"];d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=
f.length;a;)this.addEventListener(f[--a],g,false);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],g,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);


/*!
 * fancyBox - jQuery Plugin
 * version: 2.0.6 (16/04/2012)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		didResize	= false,
		resizeTimer	= null,
		isTouch		= document.createTouch !== undefined,
		isString	= function(str) {
			return $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		getValue = function(value, dim) {
			if (dim && isPercentage(value)) {
				value = F.getViewport()[ dim ] / 100 * parseInt(value, 10);
			}

			return Math.round(value) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.0.5',

		defaults: {
		  // padding: 15,
			margin: 20,

      // width: 800,
      // height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,

			autoSize: true,
			autoResize: !isTouch,
			autoCenter : !isTouch,
			fitToView: true,
			aspectRatio: false,
			topRatio: 0.5,

			fixed: false,
			scrolling: 'auto', // 'auto', 'yes' or 'no'
			wrapCSS: '',

			arrows: true,
			closeBtn: true,
			closeClick: false,
			nextClick : false,
			mouseWheel: true,
			autoPlay: false,
			playSpeed: 3000,
			preload : 3,

			modal: false,
			loop: true,
			ajax: { dataType: 'html', headers: { 'X-fancyBox': true } },
			keys: {
				next: [13, 32, 34, 39, 40], // enter, space, page down, right arrow, down arrow
				prev: [8, 33, 37, 38], // backspace, page up, left arrow, up arrow
				close: [27] // escape key
			},

			// Override some properties
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,

			// HTML templates
			tpl: {
				wrap: '<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
				next: '<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect: 'fade', // 'elastic', 'fade' or 'none'
			openSpeed: 300,
			openEasing: 'swing',
			openOpacity: true,
			openMethod: 'zoomIn',

			// Closing fancyBox
			closeEffect: 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed: 300,
			closeEasing: 'swing',
			closeOpacity: true,
			closeMethod: 'zoomOut',

			// Changing next gallery item
			nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed: 300,
			nextEasing: 'swing',
			nextMethod: 'changeIn',

			// Changing previous gallery item
			prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed: 300,
			prevEasing: 'swing',
			prevMethod: 'changeOut',

			// Enabled helpers
			helpers: {
				overlay: {
					speedIn: 0,
					speedOut: 300,
					opacity: 0.8,
					css: {
						cursor: 'pointer'
					},
					closeClick: true
				},
				title: {
					type: 'float' // 'float', 'inside', 'outside' or 'over'
				}
			},

			// Callbacks
			onCancel: $.noop, // If canceling
			beforeLoad: $.noop, // Before loading
			afterLoad: $.noop, // After loading
			beforeShow: $.noop, // Before changing in current item
			afterShow: $.noop, // After opening
			beforeClose: $.noop, // Before closing
			afterClose: $.noop // After closing
		},

		//Current state
		group: {}, // Selected group
		opts: {}, // Group options
		coming: null, // Element being loaded
		current: null, // Currently loaded element
		isOpen: false, // Is currently open
		isOpened: false, // Have been fully opened at least once
		wrap: null,
		skin: null,
		outer: null,
		inner: null,

		player: {
			timer: null,
			isActive: false
		},

		// Loaders
		ajaxLoad: null,
		imgPreload: null,

		// Some collections
		transitions: {},
		helpers: {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			//Kill existing instances
			F.close(true);

			//Normalize group
			if (group && !$.isArray(group)) {
				group = group instanceof $ ? $(group).get() : [group];
			}

			F.isActive = true;

			//Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			//All options are merged recursive except keys
			if ($.isPlainObject(opts) && opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			F._start(F.opts.index || 0);
		},

		cancel: function () {
			if (F.coming && false === F.trigger('onCancel')) {
				return;
			}

			F.coming = null;

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onabort = F.imgPreload.onerror = null;
			}
		},

		close: function (a) {
			F.cancel();

			if (!F.current || false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			//If forced or is still opening then remove immediately
			if (!F.isOpen || (a && a[0] === true)) {
				$('.fancybox-wrap').stop().trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.closeMethod]();
			}
		},

		// Start/stop slideshow
		play: function (a) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					$('body').unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						$('body').bind({
							'afterShow.player onUpdate.player': set,
							'onCancel.player beforeClose.player': stop,
							'beforeLoad.player': clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (F.player.isActive || (a && a[0] === false)) {
				stop();
			} else {
				start();
			}
		},

		next: function () {
			if (F.current) {
				F.jumpto(F.current.index + 1);
			}
		},

		prev: function () {
			if (F.current) {
				F.jumpto(F.current.index - 1);
			}
		},

		jumpto: function (index) {
			if (!F.current) {
				return;
			}

			index = parseInt(index, 10);

			if (F.group.length > 1 && F.current.loop) {
				if (index >= F.group.length) {
					index = 0;

				} else if (index < 0) {
					index = F.group.length - 1;
				}
			}

			if (F.group[index] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		reposition: function (e, onlyAbsolute) {
			var pos;

			if (F.isOpen) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					F.wrap.stop(true, true).animate(pos, 200);

				} else {
					F.wrap.css(pos);
				}
			}
		},

		update: function (e) {
			if (!F.isOpen) {
				return;
			}

			// Run this code after a delay for better performance
			if (!didResize) {
				resizeTimer = setTimeout(function () {
					var current = F.current, anyway = !e || (e && e.type === 'orientationchange');

					if (didResize) {
						didResize = false;

						if (!current) {
							return;
						}

						if ((!e || e.type !== 'scroll') || anyway) {
							if (current.autoSize && current.type !== 'iframe') {
								F.inner.height('auto');
								current.height = F.inner.height();
							}

							if (current.autoResize || anyway) {
								F._setDimension();
							}

							if (current.canGrow && current.type !== 'iframe') {
								F.inner.height('auto');
							}
						}

						if (current.autoCenter || anyway) {
							F.reposition(e);
						}

						F.trigger('onUpdate');
					}
				}, 200);
			}

			didResize = true;
		},

		toggle: function () {
			if (F.isOpen) {
				F.current.fitToView = !F.current.fitToView;

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('keypress.fb');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			F.hideLoading();

			//If user will press the escape-button, the request will be canceled
			D.bind('keypress.fb', function(e) {
				if (e.keyCode === 27) {
					e.preventDefault();
					F.cancel();
				}
			});

			$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
		},

		getViewport: function () {
			// See http://bugs.jquery.com/ticket/6724
			return {
				x: W.scrollLeft(),
				y: W.scrollTop(),
				w: isTouch && window.innerWidth ? window.innerWidth : W.width(),
				h: isTouch && window.innerHeight ? window.innerHeight : W.height()
			};
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys = current.keys;

			if (!current) {
				return;
			}

			W.bind('resize.fb orientationchange.fb' + (current.autoCenter && !current.fixed ? ' scroll.fb' : ''), F.update);

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code, target = e.target || e.srcElement;

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						code = e.keyCode;

						if ($.inArray(code, keys.close) > -1) {
							F.close();
							e.preventDefault();

						} else if ($.inArray(code, keys.next) > -1) {
							F.next();
							e.preventDefault();

						} else if ($.inArray(code, keys.prev) > -1) {
							F.prev();
							e.preventDefault();
						}
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel && F.group.length > 1) {
				F.wrap.bind('mousewheel.fb', function (e, delta) {
					var target = e.target || null;

					if (delta !== 0 && (!target || target.clientHeight === 0 || (target.scrollHeight === target.clientHeight && target.scrollWidth === target.clientWidth))) {
						e.preventDefault();

						F[delta > 0 ? 'prev' : 'next']();
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F[ $.inArray(event, ['onCancel', 'beforeLoad', 'afterLoad']) > -1 ? 'coming' : 'current' ];

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && $.isPlainObject(F.helpers[helper]) && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event](opts, obj);
					}
				});
			}

			$.event.trigger(event + '.fb');
		},

		isImage: function (str) {
			return isString(str) && str.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				element = F.group[index] || null,
				isDom,
				href,
				type,
				rez,
				hrefParts;

			if (element && (element.nodeType || element instanceof $)) {
				isDom = true;

				if ($.metadata) {
					coming = $(element).metadata();
				}
			}

			coming = $.extend(true, {}, F.opts, {index : index, element : element}, ($.isPlainObject(element) ? element : coming));

			// Re-check overridable options
			$.each(['href', 'title', 'content', 'type'], function(i,v) {
				coming[v] = F.opts[ v ] || (isDom && $(element).attr( v )) || coming[ v ] || null;
			});

			// Convert margin property to array - top, right, bottom, left
			if (typeof coming.margin === 'number') {
				coming.margin = [coming.margin, coming.margin, coming.margin, coming.margin];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn : false,
					closeClick: false,
					nextClick : false,
					arrows : false,
					mouseWheel : false,
					keys : null,
					helpers: {
						overlay : {
							css: {
								cursor : 'auto'
							},
							closeClick : false
						}
					}
				});
			}

			//Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;
				return;
			}

			type = coming.type;
			href = coming.href || element;

			///Check if content type is set, if not, try to get
			if (!type) {
				if (isDom) {
					type = $(element).data('fancybox-type');

					if (!type) {
						rez = element.className.match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (!type && isString(href)) {
					if (F.isImage(href)) {
						type = 'image';

					} else if (F.isSWF(href)) {
						type = 'swf';

					} else if (href.match(/^#/)) {
						type = 'inline';
					}
				}

				// ...if not - display element itself
				if (!type) {
					type = isDom ? 'inline' : 'html';
				}

				coming.type = type;
			}

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content) {
					if (type === 'inline') {
						coming.content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

					} else {
						coming.content = element;
					}
				}

				if (!coming.content || !coming.content.length) {
					type = null;
				}

			} else if (!href) {
				type = null;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			if (type === 'ajax' && isString(href)) {
				hrefParts = href.split(/\s+/, 2);

				href = hrefParts.shift();
				coming.selector = hrefParts.shift();
			}

			coming.href  = href;
			coming.group = F.group;
			coming.isDom = isDom;

			switch (type) {
				case 'image':
					F._loadImage();
					break;

				case 'ajax':
					F._loadAjax();
					break;

				case 'inline':
				case 'iframe':
				case 'swf':
				case 'html':
					F._afterLoad();
					break;

				default:
					F._error( 'type' );
			}
		},

		_error: function ( type ) {
			F.hideLoading();

			$.extend(F.coming, {
				type      : 'html',
				autoSize  : true,
				minWidth  : 0,
				minHeight : 0,
        // padding   : 15,
				hasError  : type,
				content   : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width;
				F.coming.height = this.height;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete === undefined || !img.complete) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, F.coming.ajax, {
				url: F.coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						F.coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_preloadImages: function() {
			var group = F.group,
				current = F.current,
				len = group.length,
				item,
				href,
				i,
				cnt = Math.min(current.preload, len - 1);

			if (!current.preload || group.length < 2) {
				return;
			}

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];
				href = item.href || $( item ).attr('href') || item;

				if (item.type === 'image' || F.isImage(href)) {
					new Image().src = href;
				}
			}
		},

		_afterLoad: function () {
			F.hideLoading();

			if (!F.coming || false === F.trigger('afterLoad', F.current)) {
				F.coming = false;

				return;
			}

			if (F.isOpened) {
				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.prevMethod]();

			} else {
				$('.fancybox-wrap').stop().trigger('onReset').remove();

				F.trigger('afterClose');
			}

			F.unbindEvents();

			F.isOpen    = false;
			F.current   = F.coming;

			//Build the neccessary markup
			F.wrap  = $(F.current.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + F.current.type + ' fancybox-tmp ' + F.current.wrapCSS).appendTo('body');
			F.skin  = $('.fancybox-skin', F.wrap).css('padding', getValue(F.current.padding));
			F.outer = $('.fancybox-outer', F.wrap);
			F.inner = $('.fancybox-inner', F.wrap);

			F._setContent();
		},

		_setContent: function () {
			var current = F.current,
				content = current.content,
				type    = current.type,
				minWidth    = current.minWidth,
				minHeight   = current.minHeight,
				maxWidth    = current.maxWidth,
				maxHeight   = current.maxHeight,
				loadingBay;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (content instanceof $) {
						if (content.parent().hasClass('fancybox-inner')) {
							content.parents('.fancybox-wrap').unbind('onReset');
						}

						content = content.show().detach();

						$(F.wrap).bind('onReset', function () {
							content.appendTo('body').hide();
						});
					}

					if (current.autoSize) {
						loadingBay = $('<div class="fancybox-wrap ' + F.current.wrapCSS + ' fancybox-tmp"></div>')
							.appendTo('body')
							.css({
								minWidth    : getValue(minWidth, 'w'),
								minHeight   : getValue(minHeight, 'h'),
								maxWidth    : getValue(maxWidth, 'w'),
								maxHeight   : getValue(maxHeight, 'h')
							})
							.append(content);

						current.width = loadingBay.width();
						current.height = loadingBay.height();

						// Re-check to fix 1px bug in some browsers
						loadingBay.width( F.current.width );

						if (loadingBay.height() > current.height) {
							loadingBay.width(current.width + 1);

							current.width = loadingBay.width();
							current.height = loadingBay.height();
						}

						content = loadingBay.contents().detach();

						loadingBay.remove();
					}

					break;

				case 'image':
					content = current.tpl.image.replace('{href}', current.href);

					current.aspectRatio = true;
					break;

				case 'swf':
					content = current.tpl.swf.replace(/\{width\}/g, current.width).replace(/\{height\}/g, current.height).replace(/\{href\}/g, current.href);
					break;

				case 'iframe':
					content = $(current.tpl.iframe.replace('{rnd}', new Date().getTime()) )
						.attr('scrolling', current.scrolling)
						.attr('src', current.href);

					current.scrolling = isTouch ? 'scroll' : 'auto';

					break;
			}

			if (type === 'image' || type === 'swf') {
				current.autoSize = false;
				current.scrolling = 'visible';
			}

			if (type === 'iframe' && current.autoSize) {
				F.showLoading();

				F._setDimension();

				F.inner.css('overflow', current.scrolling);

				content.bind({
					onCancel : function() {
						$(this).unbind();

						F._afterZoomOut();
					},
					load : function() {
						F.hideLoading();

						try {
							if (this.contentWindow.document.location) {
								F.current.height = $(this).contents().find('body').height();
							}
						} catch (e) {
							F.current.autoSize = false;
						}

						F[ F.isOpen ? '_afterZoomIn' : '_beforeShow']();
					}
				}).appendTo(F.inner);

			} else {
				F.inner.append(content);

				F._beforeShow();
			}
		},

		_beforeShow : function() {
			F.coming = null;

			//Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			//Set initial dimensions and hide
			F._setDimension();
			F.wrap.hide().removeClass('fancybox-tmp');

			F.bindEvents();

			F._preloadImages();

			F.transitions[ F.isOpened ? F.current.nextMethod : F.current.openMethod ]();
		},

		_setDimension: function () {
			var wrap      = F.wrap,
				inner     = F.inner,
				current   = F.current,
				viewport  = F.getViewport(),
				margin    = current.margin,
				padding2  = current.padding * 2,
				width     = current.width,
				height    = current.height,
				maxWidth  = current.maxWidth + padding2,
				maxHeight = current.maxHeight + padding2,
				minWidth  = current.minWidth + padding2,
				minHeight = current.minHeight + padding2,
				ratio,
				height_;

			viewport.w -= (margin[1] + margin[3]);
			viewport.h -= (margin[0] + margin[2]);

			if (isPercentage(width)) {
				width = (((viewport.w - padding2) * parseFloat(width)) / 100);
			}

			if (isPercentage(height)) {
				height = (((viewport.h - padding2) * parseFloat(height)) / 100);
			}

			ratio  = width / height;
			width  += padding2;
			height += padding2;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w, maxWidth);
				maxHeight = Math.min(viewport.h, maxHeight);
			}

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width = maxWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height > maxHeight) {
					height = maxHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

				if (width < minWidth) {
					width = minWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height < minHeight) {
					height = minHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));
				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			width = Math.round(width);
			height = Math.round(height);

			//Reset dimensions
			$(wrap.add(inner)).width('auto').height('auto');

			inner.width(width - padding2).height(height - padding2);
			wrap.width(width);

			height_ = wrap.height(); // Real wrap height

			//Fit wrapper inside
			if (width > maxWidth || height_ > maxHeight) {
				while ((width > maxWidth || height_ > maxHeight) && width > minWidth && height_ > minHeight) {
					height = height - 10;

					if (current.aspectRatio) {
						width = Math.round(((height - padding2) * ratio) + padding2);

						if (width < minWidth) {
							width = minWidth;
							height = ((width - padding2) / ratio) + padding2;
						}

					} else {
						width = width - 10;
					}

					inner.width(width - padding2).height(height - padding2);
					wrap.width(width);

					height_ = wrap.height();
				}
			}

			current.dim = {
				width	: getValue(width),
				height	: getValue(height_)
			};

			current.canGrow		= current.autoSize && height > minHeight && height < maxHeight;
			current.canShrink	= false;
			current.canExpand	= false;

			if ((width - padding2) < current.width || (height - padding2) < current.height) {
				current.canExpand = true;

			} else if ((width > viewport.w || height_ > viewport.h) && width > minWidth && height > minHeight) {
				current.canShrink = true;
			}

			F.innerSpace = height_ - padding2 - inner.height();
		},

		_getPosition: function (onlyAbsolute) {
			var current		= F.current,
				viewport    = F.getViewport(),
				margin      = current.margin,
				width       = F.wrap.width() + margin[1] + margin[3],
				height      = F.wrap.height() + margin[0] + margin[2],
				rez         = {
					position: 'absolute',
					top  : margin[0] + viewport.y,
					left : margin[3] + viewport.x
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez = {
					position: 'fixed',
					top  : margin[0],
					left : margin[3]
				};
			}

			rez.top     = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
			rez.left    = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * 0.5)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current, scrolling = current ? current.scrolling : 'no';

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.addClass('fancybox-opened');

      // F.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			F.trigger('afterShow');

			F.update();

			//Assign a click event
			if (current.closeClick || current.nextClick) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			//Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', F.close);
			}

			//Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function () {
			var current = F.current;

			F.wrap.trigger('onReset').remove();

			$.extend(F, {
				group: {},
				opts: {},
				current: null,
				isActive: false,
				isOpened: false,
				isOpen: false,
				wrap: null,
				skin: null,
				outer: null,
				inner: null
			});

			F.trigger('afterClose', current);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current = F.current,
				element = current.element,
        padding = current.padding,
				orig    = $(current.orig),
				pos     = {},
				width   = 50,
				height  = 50,
				viewport;

			if (!orig.length && current.isDom && $(element).is(':visible')) {
				orig = $(element).find('img:first');

				if (!orig.length) {
					orig = $(element);
				}
			}

			if (orig.length) {
				pos = orig.offset();

				if (orig.is('img')) {
					width = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				viewport = F.getViewport();

				pos.top  = viewport.y + (viewport.h - height) * 0.5;
				pos.left = viewport.x + (viewport.w - width) * 0.5;
			}

			pos = {
				top     : getValue(pos.top - padding),
				left    : getValue(pos.left - padding),
				width   : getValue(width + padding * 2),
				height  : getValue(height + padding * 2)
			};

			return pos;
		},

		step: function (now, fx) {
			var prop = fx.prop, value, ratio;

			if (prop === 'width' || prop === 'height') {
				value = Math.ceil(now - (F.current.padding * 2));

				if (prop === 'height') {
					ratio = (now - fx.start) / (fx.end - fx.start);

					if (fx.start > fx.end) {
						ratio = 1 - ratio;
					}

					value -= F.innerSpace * ratio;
				}

				F.inner[prop](value);
			}
		},

		zoomIn: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				dim      = current.dim,
				startPos = $.extend({}, dim, F._getPosition( elastic )),
				endPos   = $.extend({opacity : 1}, startPos);

			//Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0;
				}

				F.outer.add(F.inner).width('auto').height('auto');

			} else if (effect === 'fade') {
				startPos.opacity = 0;
			}

			wrap.css(startPos)
				.show()
				.animate(endPos, {
					duration : effect === 'none' ? 0 : current.openSpeed,
					easing   : current.openEasing,
					step     : elastic ? this.step : null,
					complete : F._afterZoomIn
				});
		},

		zoomOut: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0};

			if (elastic) {
				if (wrap.css('position') === 'fixed') {
					wrap.css(F._getPosition(true));
				}

				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0;
				}
			}

			wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.nextEffect,
				elastic  = effect === 'elastic',
				startPos = F._getPosition( elastic ),
				endPos   = { opacity : 1 };

			startPos.opacity = 0;

			if (elastic) {
				startPos.top = getValue(parseInt(startPos.top, 10) - 200);
				endPos.top = '+=200px';
			}

			wrap.css(startPos)
				.show()
				.animate(endPos, {
					duration : effect === 'none' ? 0 : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
		},

		changeOut: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.prevEffect,
				endPos   = { opacity : 0 },
				cleanUp  = function () {
					$(this).trigger('onReset').remove();
				};

			wrap.removeClass('fancybox-opened');

      if (effect === 'elastic') {
       endPos.top = '+=200px';
      }

			wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.prevSpeed,
				easing   : current.prevEasing,
				complete : cleanUp
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		overlay: null,

		update: function () {
			var width, scrollWidth, offsetWidth;

			//Reset width/height so it will not mess
			this.overlay.width('100%').height('100%');

			if ($.browser.msie || isTouch) {
				scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				width = scrollWidth < offsetWidth ? W.width() : scrollWidth;

			} else {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		beforeShow: function (opts) {
			if (this.overlay) {
				return;
			}

			opts = $.extend(true, {}, F.defaults.helpers.overlay, opts);

			this.overlay = $('<div id="fancybox-overlay"></div>').css(opts.css).appendTo('body');

			if (opts.closeClick) {
				this.overlay.bind('click.fb', F.close);
			}

			if (F.current.fixed && !isTouch) {
				this.overlay.addClass('overlay-fixed');

			} else {
				this.update();

				this.onUpdate = function () {
					this.update();
				};
			}

			this.overlay.fadeTo(opts.speedIn, opts.opacity);
		},

		afterClose: function (opts) {
			if (this.overlay) {
				this.overlay.fadeOut(opts.speedOut || 0, function () {
					$(this).remove();
				});
			}

			this.overlay = null;
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		beforeShow: function (opts) {
			var title, text = F.current.title;

			if (text) {
				title = $('<div class="fancybox-title fancybox-title-' + opts.type + '-wrap">' + text + '</div>').appendTo('body');

				if (opts.type === 'float') {
					//This helps for some browsers
					title.width(title.width());

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs(parseInt(title.css('margin-bottom'), 10));
				}

				title.appendTo(opts.type === 'over' ? F.inner : (opts.type === 'outside' ? F.wrap : F.skin));
			}
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var that     = $(this),
			selector = this.selector || '',
			index,
			run      = function(e) {
				var what = this, idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !$(what).is('.fancybox-wrap')) {
					e.preventDefault();

					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = $(what).attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					F.open(what, options);
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (selector) {
			D.undelegate(selector, 'click.fb-start').delegate(selector, 'click.fb-start', run);

		} else {
			that.unbind('click.fb-start').bind('click.fb-start', run);
		}

		return this;
	};

	// Test for fixedPosition needs a body at doc ready
	$(document).ready(function() {
		F.defaults.fixed = $.support.fixedPosition || (!($.browser.msie && $.browser.version <= 6) && !isTouch);
	});

}(window, document, jQuery));

$(document).ready(
    function() {
		$('.inputBox').focus(function() {$(this).parent().addClass('infocus')});
		$('.inputBox').blur(function() {$(this).parent().removeClass('infocus')});
		$(".container aside .neighbordhood .list .listItem:last").addClass("marginBottomNone");
		$(".container .content .aboutVineyard .tabPage .vinesWinesTable tr:last").addClass("noBorderBottom");
		$(".container .content .aboutVineyard .tabPage .vinesWinesTable tr .label").addClass("noBorderRight");
    }
);


function GmapsMarkerManager(b,a){this.options=a||{};this.marker_size=new google.maps.Size(16,32);this.setMap(b);this.map=b;this.markers=new Array();this.markers_infowindows=new Array();this.view_port=new Object();this.view_port.cell=new Object();this.view_port.cells=new Array();this.view_port.markers=new Array();this.view_port.cell.width=this.options.cell?(this.options.cell.width||false):this.marker_size.width*3;this.view_port.cell.height=this.options.cell?(this.options.cell.height||false):this.marker_size.height*3;this.view_port.height=this.map.getDiv().offsetHeight;this.view_port.width=this.map.getDiv().offsetWidth;this.view_port.cols_count=Math.ceil(this.view_port.width/this.view_port.cell.width);this.view_port.rows_count=Math.ceil(this.view_port.height/this.view_port.cell.height);this.initial=true;this.on_zoom=false;this.threshold_zoom=this.options.threshold||12;this.group_icon_src=this.options.icon?(this.options.icon.src||false):false;this.group_icon_shadow=this.options.icon?(this.options.icon.shadow||false):false;this.grid=new Object();this.grid.cells=new Array();this.grid.markers=new Array();}GmapsMarkerManager.prototype=new google.maps.OverlayView();GmapsMarkerManager.prototype.addMarker=function(a,b){b=b||false;this.markers.push(a);this.markers_infowindows.push(b);};GmapsMarkerManager.prototype.removeMarkerByNumber=function(a){this.markers[a].setMap(null);this.markers.splice(a,1);this.initial=true;this.draw();};GmapsMarkerManager.prototype.clear=function(a){for(var b in this.markers){if(typeof this.markers[b]=="object"){this.markers[b].setMap(null);}}if(a){this.markers=new Array();}};GmapsMarkerManager.prototype.draw=function(){if(this.initial){this.refresh();}var a=this;google.maps.event.addListener(this.map,"zoom_changed",function(){a.initial=true;});};GmapsMarkerManager.prototype.refresh=function(){this.clear();this.clearGroupMarkers();this.buildMapGrid(this.initial);this.checkMarkers(this.markers,this.view_port.cells);this.groupMarkers();this.initial=false;};GmapsMarkerManager.prototype.clearGroupMarkers=function(a){for(var b=0;b<this.view_port.markers.length;b++){if(this.view_port.markers[b].alias){this.view_port.markers[b].alias.setMap(null);}}if(a){this.view_port.markers=new Array();}return true;};GmapsMarkerManager.prototype.buildMapGrid=function(b){b=b||false;this.view_port.cells=this.buildGrid(this.calculateGridOptParams(this.markers));for(var a=0;a<this.view_port.cells.length;a++){if(typeof this.view_port.markers[a]=="undefined"||b){this.view_port.markers[a]=new Object();}}};GmapsMarkerManager.prototype.calculateGridOptParams=function(b){this.sanity=this.options.sanity||1.5;var a={start:{x:0-this.view_port.width*this.sanity,y:0-this.view_port.height*this.sanity},end:{x:this.view_port.width+this.view_port.width*this.sanity,y:this.view_port.height+this.view_port.height*this.sanity},cell:{width:this.view_port.cell.width,height:this.view_port.cell.height}};return a;};GmapsMarkerManager.prototype.buildGrid=function(d){var b=new Array();for(var c=d.start.x;c<d.end.x;c+=d.cell.width){for(var a=d.start.y;a<d.end.y;a+=d.cell.height){b.push(new google.maps.LatLngBounds(this.getProjection().fromDivPixelToLatLng(new google.maps.Point(c,a+d.cell.height)),this.getProjection().fromDivPixelToLatLng(new google.maps.Point(c+d.cell.width,a))));}}return b;};GmapsMarkerManager.prototype.checkMarkers=function(d,b){for(var c=0;c<b.length;c++){this.view_port.markers[c].count=0;this.view_port.markers[c].items=new Array();this.view_port.markers[c].bounds=b[c];for(var a=0;a<d.length;a++){if(b[c].contains(d[a].getPosition())){this.view_port.markers[c].count++;this.view_port.markers[c].items.push(d[a]);}}}return true;};GmapsMarkerManager.prototype.groupMarkers=function(){this.threshold=this.map.getZoom()>=this.threshold_zoom?true:false;var b=b||new google.maps.InfoWindow();for(var c=0;c<this.view_port.markers.length;c++){if(this.view_port.markers[c].count&&!this.view_port.markers[c].alias){me=this;if(this.threshold){for(var a=0;a<this.view_port.markers[c].items.length;a++){this.view_port.markers[c].items[a].setMap(this.map);google.maps.event.addListener(this.view_port.markers[c].items[a],"click",function(){if(me.markers_infowindows[c]){b.setContent(this.markers_infowindows[c]);b.open(me.map,this);}});}}else{for(var a=0;a<this.view_port.markers[c].items.length;a++){this.view_port.markers[c].items[a].setMap(null);}if(this.view_port.markers[c].count==1){this.view_port.markers[c].alias=this.view_port.markers[c].items[0];this.view_port.markers[c].alias.setMap(this.map);google.maps.event.addListener(this.view_port.markers[c].alias,"click",function(){if(me.markers_infowindows[c]){b.setContent(this.markers_infowindows[c]);b.open(me.map,this);}});}else{this.view_port.markers[c].alias=new google.maps.Marker({position:this.view_port.markers[c].items[0].getPosition(),title:this.view_port.markers[c].count.toString()});if(this.group_icon_src){this.view_port.markers[c].alias.setIcon(new google.maps.MarkerImage(this.group_icon_src));}if(this.group_icon_shadow){this.view_port.markers[c].alias.setShadow(new google.maps.MarkerImage(this.group_icon_shadow));}this.view_port.markers[c].alias.setMap(this.map);}}}}};

$(window).load(function() {
	
//	$("#grapes").multiselect({
//			noneSelectedText: 'Select Grapes Grown',
//			selectedList: 25
//		}).multiselectfilter();

    $('.dropdown-menu a').click(function() {
    	window.location.href = $(this).attr('href');
    });
    //highlight searched term
    $.ui.autocomplete.prototype._renderItem = function( ul, item) {
    	  var term = this.term.split(' ').join('|');
    	  var re = new RegExp("(" + term + ")", "gi") ;
    	  var t = item.label.replace(re,"<b>$1</b>");
    	  return $( "<li></li>" )
    	     .data( "item.autocomplete", item )
    	     .append( "<a>" + t + "</a>" )
    	     .appendTo( ul );
    	};

	if($('#involve1').attr("checked") == "checked"){
		$('.inv_select').css('display', 'block');
	} else {
		$('.inv_select').css('display', 'none');
	}
	
	if($('#owner-0').attr("checked") == "checked"){
		$('.div_prop').css('display', 'block');
	}
	if($('#owner-1').attr("checked") == "checked"){
		$('.div_prop').css('display', 'none');
		$('#proprietor').val('');
	}
	
	$('#owner-0').click(function(){
		$('.div_prop').css('display', 'block');
	})
	
	$('#owner-1').click(function(){
		$('.div_prop').css('display', 'none');
		$('#proprietor').val('');
	})	
	
	$('#involve-2').click(function() {
		$('.inv_select').css('display', 'block');
	});

	$('#involve-1').click(function() {
		$('.inv_select').css('display', 'none');
		$('#other').css('display', 'none');
	});
		
	$('#inv_select-Other').live('change', function() {
		if($('#inv_select-Other').attr("checked") == "checked") {
			$('.other').css('display', 'block');
		} else {
			$('.other').css('display', 'none');
		}	   
	});
	if($('#inv_select-Other').attr("checked") == "checked") $('.other').css('display', 'block');
	if($('#involve-1').attr("checked") != "checked") {
		$('#involve-2').attr("checked", "checked");
		$('.inv_select').css('display', 'block');
	} else {
		$('.inv_select').css('display', 'none');
		$('.other').css('display', 'none');
	}
});

var contact = {
	init: function() {
		this.add();
	},
		add: function(){
		$('#contactus').validate({
			errorClass:'errors_contact',
			validClass:'succses',
			errorElement:'div',
			rules:{
					comment: {
								required: true
					},
					subject: {
								required: true
					},
					email: {
							required: true,
							email: true
						},
					recaptcha_response_field: {
						required: true
					}
			},
			messages:{
				email: {
					required: "Please enter user email",
					email: "Please enter a valid email address"
				},
				subject: "Please enter subject",
				comment: "Please enter your comment",
				recaptcha_response_field: ""
			},
			highlight: function (element, errorClass, validClass) {
				if($(element).attr('name') == 'comment') {
					setTimeout(function() {
						var div = $(element).next();
						$(element).prev().after(div);
					}, 0);
				}
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.inputBox").removeClass(errorClass).addClass(validClass);
			}
		});
	}
}

var cities = {
	init: function(){
		this.cityAutocomplete();
		this.login1();
	},
		
	login1: function(){
		$('#login1').validate({
			errorClass:'error_main',
			validClass:'succses',
			errorElement:'span',
			rules:{
					email: {
							required: true,
							email: true
						},
					password: {
								required: true
							}
					},
			messages:{
				email: {
					required: "Please enter your email",
					email: "Please enter a valid email address"
				},
				password: "Please enter your password"
			},
			highlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function (element, errorClass, validClass) {
					$(element).parents("div.control").removeClass(errorClass).addClass(validClass);
			}
		});
	},
	
	cityAutocomplete: function(){
		var searchField =$( "#city" );
		searchField.autocomplete({  
			source: function(request, response) {
				$.ajax({
						type: 'POST',
						url: SYS.siteUrl+"citysearch",
						dataType: 'json',
						data : {
								search: searchField.val()
						},
						success: function(data) {
							response($.map(data, function(item) {
									return {
											id		: item.id,
											label	: item.label
									}
							}))
						}
				})
			},
			minLength: 1
		});         
	}	
}
	
var search = {
	init: function(){
		this.searchAutocomplete();
		this.clearSearch();
	},

	clearSearch: function() {
		$('#searchbox').click(function(){
		    if($('#searchbox').val() == 'Find Vineyards/Regions/Wines') {
			$('#searchbox').val('');
		    }
		})
		$('#searchbox').blur(function(){
		    if($('#searchbox').val() == '') {
			$('#searchbox').val('Find Vineyards/Regions/Wines');
		    }
		})
	},
	
	searchAutocomplete: function(){
		var searchField =$( "#searchbox" );
		searchField.autocomplete({  
			open: function() {
				var drop = $('.ui-autocomplete');
				drop.css({
					left: drop.css('left').replace('px','') -20,
					top:  parseInt(drop.css('top').replace('px',''))+10
				});
			},
			source: function(request, response) {
				$.ajax({
						type: 'POST',
						url: SYS.siteUrl+"/search/searchauto",
						dataType: 'json',
						data : {
								search: searchField.val()
						},
						success: function(data) {
							response($.map(data, function(item) {
									return {
											id		: item.id,
											label	: item.label
									}
							}))
						}
				})
			},
			minLength: 1
		});         
	}	
}

function showLogin()
{
	if($('.loginDropdown').css('display') == 'block') {
		$('.loginDropdown').fadeOut();
		$('#modalinvise').remove();
	} else {
		$('.loginDropdown').fadeIn();
		$('.loginDropdown #email').focus();
		if($('#modalinvise').length == 0) {
			$('body').append('<div id="modalinvise"></div>');
		}
		
		$('#modalinvise').click(function() {
			$(this).remove();
			$('.loginDropdown').fadeOut();
		})
	}
}

//init our object
$(function() {
	setTimeout(function() {
		$('.flash_message').slideDown('fast', function(){
			setTimeout(function() {
				$('.flash_message').slideUp();
			}, 2000);
		});
	}, 500);
	$('.wrapper').show();
	$('.footerWrapper').show();
	contact.init();
	cities.init();
	search.init();
	
	$('.helpWrapper').hover(function(){
		$(this).children('.helpInfo').show();
	}, function(){
		$(this).children('.helpInfo').hide();
	});
	$('.loginDropdown #rememberMe').next('label').click(function(){
		if($('.loginDropdown #rememberMe').attr('checked') == 'checked') {
			$('.loginDropdown #rememberMe').attr('checked', false);
		} else {
			$('.loginDropdown #rememberMe').attr('checked', true);
		}
	});
	$('#log').click(function(e){
		e.preventDefault();
		showLogin();
//		if($('.loginDropdown').css('display') == 'block') {
//			$('.loginDropdown').hide();
//		} else {
//			$('.loginDropdown').show();
//			$('.loginDropdown #email').focus();
//		}
	});
	
	$(".various").fancybox({
		maxWidth	: 527,
		maxHeight	: 565
	});
});

var MyModal = function() {
	
	this.options = {
		title: 'Here title',
		text : 'Blablabla',
		buttons: [
			{
				value : 'OK',
				callback: null,
				cls: 'btn-primary'
			},
			{
				value : 'Cancel',
				callback: null,
				cls: ''
			}
		]
	}
	
	this.init = function(options) {
		$.extend(this.options, options);
		this.create();
		$('#myModal').modal();
	}
	
	this.create = function() {
		var container 	= $('<div class="modal fade" id="myModal"></div>');
		var header 		= $('<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>'+this.options.title+'</h3></div>');
		var body		= $('<div class="modal-body"></div>');
		if($(this.options.text).length != 0) {
			body.append($(this.options.text));
		} else {
			body.append('<p>'+this.options.text+'</p>');
		}
		var footer = $('<div class="modal-footer"></div>');
		
		for(var i in this.options.buttons) {
			footer.append('<a href="#" onclick="javascript:'+ this.options.buttons[i].callback +'" class="btn '+ this.options.buttons[i].cls +'">'+ this.options.buttons[i].value +'</a>');
		}
		container.append(header).append(body).append(footer);
		if($('#myModal').length === 0) {
			$('body').append(container);
		}
	}
	
	 this.show = function() {
		 
	 }
	 
	 this.hide = function() {
		 $('#myModal').modal('hide');
		 $('#myModal').remove();
	 }
	 
	 this.destroy = function() {
		 
	 }
};
  
//$(function () {
//    'use strict';
//    var filesList = {}
//    $('#add_wine').fileupload({
//       url: SYS.siteUrl + 'uploadwine/',
//       multipart: true,
//       singleFileUploads: false,
//       add: function(e,data) {
//         var jqXHR = data.submit()
//                .success(function(result, textStatus, jqXHR) {
//				var logo = $('<img/>').attr({'src':result[0].url, 'alt': result[0].name, 'title': result[0].name});
//				var path = '<input class="input-file" value="'+result[0].name+'" id="image" name="image" type="hidden">'
//				$('#wine_image').html(logo);
//				$('#image').html(path);
//                })
//                .error(function (jqXHR, textStatus, errorThrown) {
//                })
//                .complete(function (result, textStatus, jqXHR) {
//                });
//       },
//       
//       progress: function(e, data) {
//         var progress = parseInt(data.loaded / data.total * 100, 10);
//       }
//    });
//	
//	var button	= $('#mod_click');
//	var box		= button.parents('form');
//	var btnWidth	= button.width();
//	var boxWidth	= box.width();
//});

$(function() {
	var zIndexNumber = 100000000;
	$('.loginDropdown ').each(function() {
		$(this).css('zIndex', zIndexNumber);
		zIndexNumber += 10;
	});
});

