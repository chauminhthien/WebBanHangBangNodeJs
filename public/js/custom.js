// JavaScript Document

// Dropdown on Mouseover
$('document').ready(function(){

	<!-- Accrodian -->	
	var $acdata = $('.accrodian-data'),
		$acclick = $('.accrodian-trigger');

	$acdata.hide();
	$acclick.first().addClass('active').next().show();	
	
	$acclick.on('click', function(e) {
		if( $(this).next().is(':hidden') ) {
			$acclick.removeClass('active').next().slideUp(300);
			$(this).toggleClass('active').next().slideDown(300);
		}
		e.preventDefault();
	});
		
		
	<!-- Toggle -->			
	$('.togglehandle').click(function()
	{
		$(this).toggleClass('active')
		$(this).next('.toggledata').slideToggle()
	});
	
	
	// Dropdowns
	$('.dropdown').hover(
		function(){$(this).addClass('open')			
		},
		function(){			
			$(this).removeClass('open')
		}
		);
		
	// Product thumbnails
	$('.thumbnail').each(function()
	{
		
		$(this).hover(
		function(){
			//$(this).children('a').children('img').fadeOut()
			$(this).children('.shortlinks').fadeIn()
		},
		function(){	
			//$(this).children('a').children('img').fadeIn()		
			$(this).children('.shortlinks').fadeOut()
		}
		);
		
	});
	
	// Checkout steps
	$('.checkoutsteptitle').addClass('down').next('.checkoutstep').fadeIn()
	$('.checkoutsteptitle').live('click', function()
	{		
	$("select, input:checkbox, input:radio, input:file").css('display', 'blcok');	
		$(this).toggleClass('down').next('.checkoutstep').slideToggle()
	});
		
	// Category Menu mobile
	 $("<select />").appendTo("nav.subnav");
      
      // Create default option "Go to..."
      $("<option />", {
         "selected": "selected",
         "value"   : "",
         "text"    : "Go to..."
      }).appendTo("nav.subnav select");
      
      // Populate dropdown with menu items
      $("nav.subnav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav.subnav select");
      });
      
	   // To make dropdown actually work
	   // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
      $("nav.subnav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
	  
	// Product Thumb
	$('.mainimage li #wrap').hide()
	$('.mainimage li #wrap').eq(0).fadeIn()
	$('ul.mainimage li.producthtumb').click(function(){
		var thumbindex = $(this).index()		
		$('.mainimage li #wrap').fadeOut(0)
		$('.mainimage li #wrap').eq(thumbindex).fadeIn()
		 $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
	})
			
	// List & Grid View
	$('#list').click(function()
	{	$(this).addClass ('btn-orange').children('i').addClass('icon-white')
		$('.grid').fadeOut()
		$('.list').fadeIn()
		$('#grid').removeClass ('btn-orange').children('i').removeClass('icon-white')
	});
	$('#grid').click(function()
	{	$(this).addClass ('btn-orange').children('i').addClass('icon-white')
		$('.list').fadeOut()
		$('.grid').fadeIn()
		$('#list').removeClass ('btn-orange').children('i').removeClass('icon-white')
	});
	
	// Prdouctpagetab 
	$('#myTab a:first').tab('show')
		$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	// alert close 
	$('.clostalert').click(function()
	{
	$(this).parent('.alert').fadeOut ()
	});	
					
	<!-- index2 main Carousal-->
	$("#mainslider2").carouFredSel({
		responsive: true,
	items		: 1,
	scroll		: {
		fx			: "crossfade"
	},
	auto: false,
	mousewheel: true,	
	swipe: {
		onMouse: true,
		onTouch: true
	},
	
	pagination	: {
		container		: "#mainslider2_pag",
		anchorBuilder	: function( nr ) {
			var src = $("img", this).attr( "src" );
				//src = src.replace( "/large/", "/small/");
			return '<img src="' + src + '" style="width:100px" />';
			}
		}
	});


	<!-- index3 main Carousal-->
	$(function() {
				$('#mainslider3').carouFredSel({
					responsive: true,
					auto: true,
				//	width: 1170,
					height: '100%',
					direction: 'left',
					items: 1,
					swipe: {
							onMouse: true,
							onTouch: true
						},
					scroll: {
						duration: 1000,
						onBefore: function( data ) {
							data.items.visible.children().css( 'opacity', 0 ).delay( 200 ).fadeTo( 400, 1 );
							data.items.old.children().fadeTo( 400, 0 );
						}
					}
				});
			});


	<!-- index4 main Carousal-->
	$(window).load(function() {
              // The slider being synced must be initialized first
              $('#carouseindex4').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 226,
                //itemMargin: 15,
                asNavFor: '#sliderindex4'
              });
              
              $('#sliderindex4').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carouseindex4"
              });
            });
			
	<!-- index5 main Carousal-->		
			function prevTimers() {
				return allTimers().slice( 0, $('.sliderindex5pager a.selected').index() );
			}
			function allTimers() {
				return $('.sliderindex5pager a span');
			}

			$(function() {
				$('#sliderindex5').carouFredSel({
					items: 1,
					responsive : true,
					auto: {
						pauseOnHover: 'resume',
						progress: {
							bar: '.sliderindex5pager a:first span'
						}
					},
					scroll: {
						fx: 'crossfade',
						duration: 300,
						timeoutDuration: 2000,
						onAfter: function() {
							allTimers().stop().width( 0 );
						//	prevTimers().width(  );
							$(this).trigger('configuration', [ 'auto.progress.bar', '.sliderindex5pager a.selected span' ]);
						}
					},
					pagination: {
						container: '.sliderindex5pager',
						anchorBuilder: false
					}
				});
			});
			
			<!-- index6 main Carousal-->
	$(function() {
				$('#mainslider6').carouFredSel({
					//width: 900,
					//height: '100%',
					direction: 'up',
					items: 1,
					prev: '#prevmainslider6',
					next: '#nextmainslider6',
					pagination: "#pagermainslider6",
					mousewheel: true,
					swipe: {
						onMouse: true,
						onTouch: true
					}
					
					
				});
				
			});
			
			
				// Brand Carousal
	$(window).load(function() {
	$('#brandcarousal').carouFredSel({
							width: '100%',
						scroll: 1,
							auto: false,
						prev: '#prev',
						next: '#next',
						//pagination: "#pager2",
						mousewheel: true,
						swipe: {
							onMouse: true,
							onTouch: true
						}
					});
					});

	// Twitter
		 $("#twitter").tweet({
          join_text: "auto",
          username: "themeforest", //replace this with your username
          avatar_size: 32,
          count: 3,
          auto_join_text_default: "we said,",
          auto_join_text_ed: "we",
          auto_join_text_ing: "we were",
          auto_join_text_reply: "we replied",
          auto_join_text_url: "we were checking out",
          loading_text: "loading tweets..."
        });

})

	// Contact Form

	$(document).ready(function() {	
		$(".contactform").validate({
	   submitHandler: function(form) {
		   var name = $("input#name").val();
		   var email = $("input#email").val();
		   var url = $("input#url").val();
		   var message = $("textarea#message").val();
		   
		   var dataString = 'name='+ name + '&email=' + email + '&url=' + url+'&message='+message;
		  $.ajax({
		  type: "POST",
		  url: "email.php",
		  data: dataString,
		  success: function() {
			  $('#contactmsg').remove();
			  $('.contactform').prepend("<div id='contactmsg' class='successmsg'>Form submitted successfully!</div>");
			   $('#contactmsg').delay(1500).fadeOut(500);
			  $('#submit_id').attr('disabled','disabled');
			  }
		 	});   
	   return false;
	  	}
		});
	});


// Flexsliders	  
$(window).load(function(){	
	
	// Fancyboxpopup
	$("a.fancyboxpopup").fancybox().each(function() {		
		$(this).append('<span class="viewfancypopup">&nbsp;</span>'); 
	});
	
	// Flexslider index banner
	$('#mainslider').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
   });
   // Flexslider side banner
	$('#mainsliderside').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
   });
	// Flexslider Category banner  
	$('#catergoryslider').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
    });
	 
	 // Flexslider Brand    
	$('#advertise').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
	  
	// Flexslider Blog   
	$('#blogslider').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  // Flexslider  Musthave    
	$('#musthave').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  $('#testimonialsidebar').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  
	  
	  
});

<!-- Scroll top -->		  
$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#gotop').fadeIn(500);
		} else {
			$('#gotop').fadeOut(500);
		}
	});	