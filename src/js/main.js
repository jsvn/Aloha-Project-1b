$(document).ready(function(){
	console.log($);

	// Slider
		$('.bxslider').bxSlider(); //plug in

	// Smooth Scroll
		$('a[href^="#"]').on("click",function (e) {
		    e.preventDefault();

		    var target = this.hash;
		    var $target = $(target);

		    $("html, body").stop().animate({
		        "scrollTop": $target.offset().top
		    }, 600, "swing", function () { //speed for scroll is here in this line
		        window.location.hash = target;
		    });
		});

	// Add to Cart
		var totalItems = 0; //set initial to 0
		$("button").click(function(){ //when button is clicked, func runs
			$("div.total").css({"display":"flex"}); // shows the counter at the top
			totalItems = Number(totalItems) + Number($(this).val()); // .val() brings in the value which is 1 and adds it to the totalItems
			$(".total").text(totalItems);
		});

	// Email Validator

		$("form").submit(function(){
			var value = $.trim($(".inputEmail").val());
			if(value.length>0) {
				alert("Thanks for subscribing!");
			}
			else{
				alert("Please enter an email address.");
				event.preventDefault(); // prevents the form from being submitted
			}
			
		});

	// Nav Bar Fading
		window.addEventListener("scroll", function() {
		    if (window.scrollY > 10) {
		    	$("section.nav").addClass("navFixed");

		    }
		    else {
		    	$("section.navFixed").removeClass("navFixed")
		    };
		},false);

	
});