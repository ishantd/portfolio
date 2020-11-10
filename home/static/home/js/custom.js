(function($){

	"use strict"; 

/* ---------------------------------------------- /*
* Preloader
/* ---------------------------------------------- */

$(window).on('load', function() {
	$('#loading').fadeOut();
	$('#loading').delay(350).fadeOut('slow');
});

/* ---------------------------------------------- /*
* Animated scrolling / Scroll Up
/* ---------------------------------------------- */

$('.Menu-list a[href^="#"]').on("click", function(e){
	var anchor = $(this);
	$('html, body').stop().animate({
		scrollTop: $(anchor.attr('href')).offset().top
	}, 1000);
	e.preventDefault();
});

$('#scroll-up').on("click", function(e){
	e.preventDefault();
   $("html, body").animate({scrollTop: 0}, 1000);
});

$(window).on('scroll', function() {
	if ($(this).scrollTop() > 100) {
		$('.scroll-up').fadeIn();
	} else {
		$('.scroll-up').fadeOut();
	}
});

/* ---------------------------------------------- /*
* Navbar
/* ---------------------------------------------- */

$('.header').sticky({
	topSpacing: 0
});

$('body').scrollspy({
	target: '.navbar-custom',
	offset: 70
})

/* ---------------------------------------------- /*
* Background image & Tilt Init
/* ---------------------------------------------- */


$('.js-tilt').tilt({
    glare: true,
    maxGlare: .1,
    maxTilt: 10,
	perspective: 1000,
	scale: 1.05,
	easing: "cubic-bezier(.03,.98,.52,.99)",
});

$('.ham-tilt').tilt({
    glare: false,
	perspective: 1000,
    maxTilt: 50,
	scale: 1.2,
	easing: "cubic-bezier(.03,.98,.52,.99)",
});



/* ---------------------------------------------- /*
* Particles init
/* ---------------------------------------------- */

window.onload = function() {
	Particles.init({
		selector: '.background'
	});
};

/* ---------------------------------------------- /*
* Testimonials
/* ---------------------------------------------- */


$('.testimonials').owlCarousel({
	singleItem: true,
	navigation: false,
	pagination: true,
	slideSpeed : 300,
	paginationSpeed : 400,
	autoPlay: 5000,
	navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
});

/* ---------------------------------------------- /*
* Initialize shuffle plugin
/* ---------------------------------------------- */

var $portfolioContainer = $('.list-items-container');

$('#filter li').on('click', function (e) {
	e.preventDefault();

	$('#filter li').removeClass('active');
	$(this).addClass('active');

	var group = $(this).attr('data-group');
	var groupName = $(this).attr('data-group');

	$portfolioContainer.shuffle('shuffle', groupName );
});


$(document).ready( function() {

	$('.simple-ajax-popup').magnificPopup({
		type: 'image',
		gallery:{enabled:true}
	});

});

/* ---------------------------------------------- /*
* WOW Animation When You Scroll
/* ---------------------------------------------- */

new WOW().init();

/* ---------------------------------------------- /*
* Ham Menu 
/* ---------------------------------------------- */

$(".hamburger-menu").on('click', function(){
	$(this).toggleClass("open");
	$(".menu-wrapper").toggleClass("open");
	$("body, html").toggleClass("ham-active");
	
	if($('body').hasClass('ham-active')){
		$('body, html').css("overflow", "hiddden");
	} else {
		$('body, html').css("overflow", "");
	}
});

$('body').fitVids();

/* ---------------------------------------------- /*
* Typed init
/* ---------------------------------------------- */

$(".typed").each(function() {
    var $this = $(this);
    $this.typed({
        strings: $this.attr('data-elements').split(','),
        typeSpeed: 100,
        backDelay: 1000
    });
});


/* ---------------------------------------------- /*
* Particles init
/* ---------------------------------------------- */

if($("#scene").length > 0) {
	var scene = document.getElementById('scene');
	var parallaxInstance = new Parallax(scene);
}

/* ---------------------------------------------- /*
* Color Switcher
/* ---------------------------------------------- */

$('.toggle-theme-panel').on("click",function(e) {
    e.preventDefault();
    $('.settings_panel').toggleClass('active');
});
$('.colors-switch a').on("click",function(e) {
    e.preventDefault();
    var attr = $(this).attr("title");
    console.log(attr);
    $('head').append('<link rel="stylesheet" href="assets/css/'+attr+'.css">');
});


})(jQuery);