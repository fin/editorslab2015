
//var clock, minute;


(function($) {
	
		$(function() {
			
			var clock = $('.flip-counter').FlipClock(3600 * 24 * 3, {
			clockFace: 'DailyCounter',
			countdown: true,
			language: 'German'
		});	
		
		var options = {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.', 
  prefix : '', 
  suffix : '' 
};
var demo = new CountUp("qcount", 0, 27, 0, 50, options);
demo.start();
				
	});
	
}(jQuery));


