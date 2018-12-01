/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function($){
	
	// Number of seconds in every time division
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
	
	// Creating the plugin
	$.fn.countdown = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);
		
		var left, d, h, m, s, positions;

		// Initialize the plugin
		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			// Time left
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			
			if(left < 0){
				left = 0;
			}
			
			// Number of days left
			d = Math.floor(left / days);
			var dayBoxCount = d.toString().length;
			if(dayBoxCount < 2){
				dayBoxCount = 2
			}
			updateDuo(0, 1, d, dayBoxCount);
			left -= d*days;
			
			// Number of hours left
			h = Math.floor(left / hours);
			updateDuo(dayBoxCount, dayBoxCount+1, h);
			left -= h*hours;
			
			// Number of minutes left
			m = Math.floor(left / minutes);
			updateDuo(dayBoxCount+2, dayBoxCount+3, m);
			left -= m*minutes;
			
			// Number of seconds left
			s = left;
			updateDuo(dayBoxCount+4, dayBoxCount+5, s);
			
			// Calling an optional user supplied callback
			options.callback(d, h, m, s);
			
			// Scheduling another call of this function in 1s
			setTimeout(tick, 1000);
		})();
		
		// This function updates two digit positions at once
		function updateDuo(minor,major,value,dayBoxCount){
			if(minor==0){
				//day
				for(var j=0;j<dayBoxCount;j++){
					switchDigit(positions.eq(j), value.toString()[j])
				}
			}else{
				switchDigit(positions.eq(minor),Math.floor(value/10)%10);
				switchDigit(positions.eq(major),value%10);
			}			
			
		}
		
		return this;
	};


	function init(elem, options){

		// 这个插件不支持天数达到三位数。这里修改一下支持任意数
		left = Math.floor((options.timestamp - (new Date())) / 1000);
		if(left < 0){
			left = 0;
		}
		d = Math.floor(left / days);
		var dayBoxCount = d.toString().length;
		if(dayBoxCount < 2){
			// 最少两个
			dayBoxCount = 2
		}

		elem.addClass('countdownHolder');

		// Creating the markup inside the container
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			var boxName;
			if(this=="Days") {
				boxName = "Days";
			}
			else if(this=="Hours") {
				boxName = "Hours";
			}
			else if(this=="Minutes") {
				boxName = "Minutes";
			}
			else {
				boxName = "Seconds";
			}

			var divContent = '<div class="count'+this+'">';
			var digitSpan = '<span class="position">' +
			                        '<span class="digit static">0</span>' +
							'</span>';
			var boxSpan = '<span class="boxName">' +
			                        '<span class="'+this+'">' + boxName + '</span>' +
						  '</span>';
		    if(boxName != "Days"){
				dayBoxCount = 2;//default
			}
			for(var j=0;j<dayBoxCount;j++){
				divContent += digitSpan
			}
			divContent += boxSpan;
			$(divContent).appendTo(elem);

			// $('<div class="count'+this+'">' +
			// 	'<span class="position">' +
			// 		'<span class="digit static">0</span>' +
			// 	'</span>' +
			// 	'<span class="position">' +
			// 		'<span class="digit static">0</span>' +
			// 	'</span>' +
			// 	'<span class="boxName">' +
			// 		'<span class="'+this+'">' + boxName + '</span>' +
			// 	'</span>'
			// ).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="points">:</span><span class="countDiv countDiv'+i+'"></span>');
			}
		});

	}

	// Creates an animated transition between the two numbers
	function switchDigit(position,number){

		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:0,
				opacity:0
			},
			html:number
		});
		
		// The .static class is added when the animation
		// completes. This makes it run smoother.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:0,opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);