$(document).ready(function() {	
	"use strict"; // Start of use strict
    
	// Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 140
    });
	
	// Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 0
        }
    })

	//SCROLL SECTION
	jQuery('a[href*="#"]:not([href="#"]):not(.accordion-toggle):not(.carousel-control)').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				if (window.innerWidth <= 768) {
					$('html, body').animate({
						scrollTop: target.offset().top - 50
					}, 1000);
					
				} else {
					$('html, body').animate({
						scrollTop: target.offset().top - 130
					}, 1000);
				}	
				return false;
			}
		}
	});
		
	//ALIADOS
	$('#client-gallery').owlCarousel({
	    loop:true,
	    margin:10,
	    dots:true,
		autoplay:true,
		autoplayTimeout:2000,
		smartSpeed:1500,
	    responsive:{
			0:{
	            items:1
	        },
	        768:{
	            items:4
	        },
	        992:{
	            items:4
	        },
	        1200:{
	            items:5
	        }
	    }
	});
	
	//GALLERY LIGHTBOX
	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});
	
	//PHOTO GALLERY
	$('#photo-gallery').owlCarousel({
	    loop:true,
	    margin:10,
		nav:true,
	    dots:false,
	    responsive:{
			0:{
	            items:1
	        },
	        768:{
	            items:3
	        },
	        992:{
	            items:3
	        },
	        1200:{
	            items:4
	        }
	    }
	});
	
	//VIDEO GALLERY
	$('#video-gallery').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:10,
		nav:true,
	    dots:false,
        video:true,
        lazyLoad:true,
        center:false,
        responsive:{
            480:{
                items:2
            },
            600:{
                items:4
            }
        }
    });
		
	//CONTACT FORM
	$('#contactForm').submit(function(event) { // intercepts the submit event
		$.ajax({ // make an AJAX request
			type: "POST",
			url: "https://script.google.com/macros/s/AKfycbzeuqvt7_qLoPC3ZG8Z4eBQAZqtU3UqDURDQjusFPDMAHwFmT4/exec",
			data: $('#contactForm').serialize() // serializes the form's elements
			
		}).done( function() {
			$('#contactFormResult').css('visibility', 'visible');
			$('#contactForm')[0].reset();
			
		}).fail( function( jqXHR, textStatus, errorThrown ) {
			$('#contactFormResult').css('visibility', 'hidden');
			if (jqXHR.status === 0) {
				alert('Not connect: Verify Network.');
			} else if (jqXHR.status == 404) {
				alert('Requested page not found [404]');
			} else if (jqXHR.status == 500) {
				alert('Internal Server Error [500].');
			} else if (textStatus === 'parsererror') {
				alert('Requested JSON parse failed.');
			} else if (textStatus === 'timeout') {
				alert('Time out error.');
			} else if (textStatus === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error: ' + jqXHR.responseText);
			}
		});
		event.preventDefault(); // avoid to execute the actual submit of the form
	});
});