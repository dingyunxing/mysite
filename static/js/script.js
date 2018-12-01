
$(document).ready(function(){


	/* ---- Countdown timer ---- */

	$('#counter').countdown({
		//javascript 3代表4月
		timestamp : new Date(2019,3,6)
	});


	/* ---- Animations ---- */

	$('#links a').hover(
		function(){ $(this).animate({ left: 3 }, 'fast'); },
		function(){ $(this).animate({ left: 0 }, 'fast'); }
	);

	$('footer a').hover(
		function(){ $(this).animate({ top: 3 }, 'fast'); },
		function(){ $(this).animate({ top: 0 }, 'fast'); }
	);

	//删除 1 2 
	$('.callbacks_tabs').remove();


});
