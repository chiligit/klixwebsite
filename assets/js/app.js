$(document).ready(function(){

    /* Google Maps
    **************************************************************/
    if($('.google-map').length > 0) {
        $('.google-map').each(function(){
            var mapHeight = $(this).data('height'),
                    address = $(this).data('address'),
                    zoom = $(this).data('zoom'),
                    controls = $(this).data('disable-controls'),
                    scrollwheel = $(this).data('scrollwheel'),
                    marker = $(this).data('marker'),
                    markerTitle = $(this).data('marker-title'),
                    styles = $(this).data('styles');
            $(this).height(mapHeight);
            $(this).parents('.map-collapse').css('max-height', mapHeight);
            $(this).gmap3({
          marker:{
            address: address,
            data: markerTitle,
            options: {
                icon: marker
            },
            events: {
              mouseover: function(marker, event, context){
                var map = $(this).gmap3("get"),
                    infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker, 
                      options:{content: context.data}
                    }
                  });
                }
              },
              mouseout: function(){
                var infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.close();
                }
              }
            }
          },
          map:{
            options:{
              zoom: zoom,
              disableDefaultUI: false,
              scrollwheel: scrollwheel,
              styles: styles
            }
          }
            });
        });
    }  
    
    var class_KineticScroll = function()
		{

			var wheelTimer = new Date().getTime();
			var offset, scrollTime;
			var doScroll = function(event)
			{
				var delta;				
				if (!event)event = window.event;
				if (event.wheelDelta) delta = event.wheelDelta/60;
				else if (event.detail) delta = -event.detail/3;
				var curTime = new Date().getTime();
				var timeDiff = (curTime - wheelTimer) / 2000;
				
				offset = 100;
				scrollTime = 1200;
				
				if(timeDiff < 0.5)
				{
					offset = 150;
					scrollTime = 1300;
				}
				if(timeDiff < 0.1)
				{
					offset = 270;
					scrollTime = 1400;
				}
				if(timeDiff < 0.02)
				{					
					offset = 320;
					scrollTime = 1500;
				}
				wheelTimer = curTime; 
				$('html, body')
				.stop()
				.clearQueue()
				.animate(
				{
					scrollTop: ($(document).scrollTop() - delta * offset)
				}, scrollTime, 'easeOutExpo');								
				if (event.preventDefault) event.preventDefault();						
				return false;
			};
			if (window.addEventListener) {
				window.addEventListener('DOMMouseScroll', doScroll, false);			
			}
			document.onmousewheel = doScroll;
		};

	
		
		// init parallax background
		var pageBackground;
		
		checkWindowSize();
		
		$(window).on('resize', function(){
			checkWindowSize();
		});
		// init kinetic scroll
		var pageScroll = new class_KineticScroll();
		//slider

		$('.bxslider').bxSlider({
		  auto: true,
		  autoControls: true,
		  speed: 1500,
		  pause: 9000
		});

        new Konami(function() {             
            $("section").each(function() {
                $(this).addClass("wow tada");                
            });
            new WOW().init();
        });  

		var cookie = getCookie('lang');
		var language = window.navigator.userLanguage || window.navigator.language;
	
		if (language == 'en' && cookie == '') {
			$('#hu').show();
		}else
			if ((cookie == '') || (cookie == 'hu')){
				$('#en').show();
			}else {
				$('#hu').show();
			}	
});

	var checkWindowSize = function() {
		if ($( window ).width() > 880) 
			{
				new class_ParallaxScroll();	
			}
	}

	var class_ParallaxScroll = function()
	{
		var scrollDif, lastScrollTop,
			about_offset, technology_offset, 
			bgTopOffset_base, bgTopOffset_icon, bgTopOffset_about, bgTopOffset_technology1, bgTopOffset_technology2,
			bgOffset, parallax, 
			basebg, iconbg, aboutbg, technology1bg, technology2bg, 
			_docu, aboutbg_height;
	
		parallax = 5;
		basebg = $('#base_bg');
		iconbg = $('#icon_bg');
		aboutbg = $('#about');
		technology1bg = $('#technology1_bg');
		technology2bg = $('#technology2_bg');

		_docu = $(document);
		
		if(iconbg.css('backgroundPositionY')) {                       
			technology1bg.css('backgroundPositionY',  (9999) + 'px');            
			technology2bg.css('backgroundPositionY',  (9999) + 'px');
		}
		else {                    
			technology1bg.css('backgroundPosition',  'center ' + parseInt(9999) + 'px');            
			technology2bg.css('backgroundPosition',  'center ' + parseInt(9999) + 'px');   
		}     
						
		setTimeout(function() {
			about_offset = aboutbg[0].getBoundingClientRect().top;
			technology_offset = $('#technology')[0].getBoundingClientRect().top;
			/*
			console.log(technology_offset);
			console.log(_docu.scrollTop());
			console.log(about_offset);
			console.log(technology_offset);
			console.log(technology_offset-about_offset);
			*/
			if(iconbg.css('backgroundPositionY')) {                       
				technology1bg.css('backgroundPositionY',  (2620+(about_offset)/5*10) + 'px');            
				technology2bg.css('backgroundPositionY',  (2020+(about_offset)/5*7.5) + 'px');
			}
			else {                    
				technology1bg.css('backgroundPosition',  'center ' + parseInt(2620+(about_offset)/5*10) + 'px');            
				technology2bg.css('backgroundPosition',  'center ' + parseInt(2020+(about_offset)/5*7.5) + 'px');   
			}

			if(iconbg.css('backgroundPositionY'))
			{
				bgTopOffset_base = parseInt(basebg.css('backgroundPositionY'));
				bgTopOffset_icon = parseInt(iconbg.css('backgroundPositionY'));
				bgTopOffset_about = parseInt(aboutbg.css('backgroundPositionY'));
				bgTopOffset_technology1 = parseInt(technology1bg.css('backgroundPositionY'));
				bgTopOffset_technology2 = parseInt(technology2bg.css('backgroundPositionY'));
			}
			else
			{
				bgTopOffset_base = parseInt(basebg.css('backgroundPosition').split(' ')[1]);
				bgTopOffset_icon = parseInt(iconbg.css('backgroundPosition').split(' ')[1]);
				bgTopOffset_about = parseInt(aboutbg.css('backgroundPosition').split(' ')[1]);
				bgTopOffset_technology1 = parseInt(technology1bg.css('backgroundPosition').split(' ')[1]);
				bgTopOffset_technology2 = parseInt(technology2bg.css('backgroundPosition').split(' ')[1]);
			}

		}, 1000);     
	   
				
		var scroll = function()
		{				
			scrollDif = lastScrollTop - _docu.scrollTop();
			bgOffset = scrollDif / parallax;

			if (!isNaN(bgOffset)) {
				bgTopOffset_base += bgOffset;
				bgTopOffset_icon += bgOffset * 2;
				bgTopOffset_technology1 += bgOffset * 10;
				bgTopOffset_technology2 += bgOffset * 7.5;                    
												
				bgTopOffset_about += bgOffset*1.75;
				if (bgTopOffset_about>0) {
					bgTopOffset_about = 0;
				}
			}

			//console.log(bgTopOffset_technology1);
				
			if(iconbg.css('backgroundPositionY')) 
			{
				basebg.css('backgroundPositionY',  bgTopOffset_base + 'px');
				iconbg.css('backgroundPositionY',  bgTopOffset_icon + 'px');
				aboutbg.css('backgroundPositionY',  bgTopOffset_about + 'px');
				technology1bg.css('backgroundPositionY',  bgTopOffset_technology1 + 'px');
				technology2bg.css('backgroundPositionY',  bgTopOffset_technology2 + 'px');
			}
			else
			{
				basebg.css('backgroundPosition', 'center ' + parseInt(bgTopOffset_base) + 'px');
				iconbg.css('backgroundPosition', 'center ' + parseInt(bgTopOffset_icon) + 'px');
				aboutbg.css('backgroundPosition', 'center ' + parseInt(bgTopOffset_about) + 'px');
				technology1bg.css('backgroundPosition',  'center ' + parseInt(bgTopOffset_technology1) + 'px');
				technology2bg.css('backgroundPosition',  'center ' + parseInt(bgTopOffset_technology2) + 'px');
			}

			lastScrollTop = _docu.scrollTop();
		};
		
		$(window).scroll(function()
		{			
			scroll();			
		});                    
	};
	
	var checkCaptcha = function() {

		var captchaResponse = $("#g-recaptcha-response");
		if(captchaResponse.val().length == 0)
		{
			$('#captchaAlert').show();

			return false;
		}
		 if(captchaResponse.val().length != 0)
		 {
			$('#captchaAlert').hide();
			return true; 
		 }
	}

	var changeLang = function(lang) {
		document.cookie = 'lang='+lang;
		window.location = window.location;
		window.location.reload(true);
	};		
	
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
    return "";
}
	
	