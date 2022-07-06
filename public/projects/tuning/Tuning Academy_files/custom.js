/* =========================================================
Comment Form
============================================================ */
jQuery(document).ready(function(){
    if(jQuery("#contact-form").length > 0){
        // get front validate localization
        var validateLocalization = kopa_custom_front_localization.validate;

    // Validate the contact form
      jQuery('#contact-form').validate({
    
        // Add requirements to each of the fields
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        
        // Specify what error messages to display
        // when the user does something horrid
        messages: {
            name: {
                required: validateLocalization.name.required,
                minlength: jQuery.format(validateLocalization.name.minlength)
            },
            email: {
                required: validateLocalization.email.required,
                email: validateLocalization.email.email
            },
            url: {
                required: validateLocalization.url.required,
                url: validateLocalization.url.url
            },
            message: {
                required: validateLocalization.message.required,
                minlength: jQuery.format(validateLocalization.message.minlength)
            }
        },
        
        // Use Ajax to send everything to processForm.php
        submitHandler: function(form) {
            jQuery("#submit-contact").attr("value", validateLocalization.form.sending);
            jQuery(form).ajaxSubmit({
                success: function(responseText, statusText, xhr, $form) {
                    jQuery("#response").html(responseText).hide().slideDown("fast");
                    jQuery("#submit-contact").attr("value", validateLocalization.form.submit);
                }
            });
            return false;
        }
      });
    }
});

/* =========================================================
Sub menu
==========================================================*/
(function($){ //create closure so we can safely use $ as alias for jQuery

    jQuery(document).ready(function(){

        // initialise plugin
        var example = jQuery('#main-menu').superfish({
            //add options here if required
            disableHI: true // Fix: Superfish conflicts with WP admin bar for WordPress < 3.6
        });
    });

})(jQuery);

/* =========================================================
Mobile menu
============================================================ */
jQuery(document).ready(function () {
     
    jQuery('#mobile-menu > span').click(function () {
 
        var mobile_menu = jQuery('#toggle-view-menu');
 
        if (mobile_menu.is(':hidden')) {
            mobile_menu.slideDown('300');
            jQuery(this).children('span').html('-');    
        } else {
            mobile_menu.slideUp('300');
            jQuery(this).children('span').html('+');    
        }
        
        
         
    });
    
    jQuery('#toggle-view-menu li').click(function () {
 
        var text = jQuery(this).children('div.menu-panel');
 
        if (text.is(':hidden')) {
            text.slideDown('300');
            jQuery(this).children('span').html('-');    
        } else {
            text.slideUp('300');
            jQuery(this).children('span').html('+');    
        }
        
        jQuery(this).toggleClass('active');
         
    });
 
});

/* =========================================================
Flex slider
============================================================ */
jQuery(window).load(function(){

  jQuery('.home-slider').each(function () {
    var $this = jQuery(this),
        dataAnimation = $this.data('animation'),
        dataDirection = $this.data('direction'),
        dataSlideshowSpeed = $this.data('slideshow_speed'),
        dataAnimationSpeed = $this.data('animation_speed'),
        dataIsAutoPlay = $this.data('autoplay');

    $this.flexslider({
        animation: dataAnimation,
        direction: dataDirection,
        slideshowSpeed: dataSlideshowSpeed,
        animationSpeed: dataAnimationSpeed,
        slideshow: dataIsAutoPlay,
        start: function(slider){
            slider.removeClass('loading');
        }
    });
  });

  jQuery('.kp-post-slider').flexslider({
    animation: "slide",
    slideshow: false,
    start: function(slider){
        slider.removeClass('small-loading');
    }
  });

  if( jQuery(".kp-featured-news-slider").length > 0){
      jQuery('.kp-featured-news-slider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        slideshow: false,
        start: function(slider){
          slider.removeClass('loading');
        }
      });
  }
});

/* =========================================================
Tabs
============================================================ */
jQuery(document).ready(function() { 
    
    jQuery( '.tabs-1' ).each(function () {
        var $this = jQuery(this),
            firstTabContentID = $this.find('li a').first().attr('href');

        // add active class to first list item
        $this.children('li').first().addClass('active');

        // hide all tabs
        $this.find('li a').each(function () {
            var tabContentID = jQuery(this).attr('href');
            jQuery(tabContentID).hide();    
        });
        // show only first tab
        jQuery(firstTabContentID).show();

        $this.children('li').on('click', function(e) {
            e.preventDefault();
            var $this = jQuery(this),
                $currentClickLink = $this.children('a');

            if ( $this.hasClass('active') ) {
                return;
            } else {
                $this.addClass('active')
                    .siblings().removeClass('active');
            }

            $this.siblings('li').find('a').each(function () {
                var tabContentID = jQuery(this).attr('href');
                jQuery(tabContentID).hide();
            });

            jQuery( $currentClickLink.attr('href') ).fadeIn();

        });
    });

    jQuery( '.tabs-2' ).each(function () {
        var $this = jQuery(this),
            firstTabContentID = $this.find('li a').first().attr('href');

        // add active class to first list item
        $this.children('li').first().addClass('active');

        // hide all tabs
        $this.find('li a').each(function () {
            var tabContentID = jQuery(this).attr('href');
            jQuery(tabContentID).hide();    
        });
        // show only first tab
        jQuery(firstTabContentID).show();

        $this.children('li').on('click', function(e) {
            e.preventDefault();
            var $this = jQuery(this),
                $currentClickLink = $this.children('a');

            if ( $this.hasClass('active') ) {
                return;
            } else {
                $this.addClass('active')
                    .siblings().removeClass('active');
            }

            $this.siblings('li').find('a').each(function () {
                var tabContentID = jQuery(this).attr('href');
                jQuery(tabContentID).hide();
            });

            jQuery( $currentClickLink.attr('href') ).fadeIn();

        });
    });

    jQuery( '.tabs-3' ).each(function () {
        var $this = jQuery(this),
            firstTabContentID = $this.find('li a').first().attr('href');

        // add active class to first list item
        $this.children('li').first().addClass('active');

        // hide all tabs
        $this.find('li a').each(function () {
            var tabContentID = jQuery(this).attr('href');
            jQuery(tabContentID).hide();    
        });
        // show only first tab
        jQuery(firstTabContentID).show();

        $this.children('li').on('click', function(e) {
            e.preventDefault();
            var $this = jQuery(this),
                $currentClickLink = $this.children('a');

            if ( $this.hasClass('active') ) {
                return;
            } else {
                $this.addClass('active')
                    .siblings().removeClass('active');
            }

            $this.siblings('li').find('a').each(function () {
                var tabContentID = jQuery(this).attr('href');
                jQuery(tabContentID).hide();
            });

            jQuery( $currentClickLink.attr('href') ).fadeIn();

        });
    });
    
});

/* =========================================================
Twitter
============================================================ */
jQuery(function(){
    jQuery('.kp-tweets-container').each(function () {
        var $this = jQuery(this),
            dataUsername = $this.data('username'),
            dataLimit = $this.data('limit');

        $this.tweetable({
            username: dataUsername,
            time: true,
            rotate: false,
            speed: 4000,
            limit: dataLimit,
            replies: false,
            position: 'append',
            failed: "Sorry, twitter is currently unavailable for this user.",
            html5: true,
            onComplete:function($ul){
                $this.find('time').timeago();
            }
        });
    });
});

/* =========================================================
Scroll to top
============================================================ */
jQuery(document).ready(function(){

       
    // fade in #back-top
    jQuery(function () {
        

        // scroll body to 0px on click
        jQuery('#back-top a').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

/* =========================================================
prettyPhoto
============================================================ */
jQuery(document).ready(function(){
    init_image_effect();
});

jQuery(window).resize(function(){
    init_image_effect();
});

function init_image_effect(){    

    var view_p_w = jQuery(window).width();
    var pp_w = 500;
    var pp_h = 344;
    
    if(view_p_w <= 479){
        pp_w = '120%';
        pp_h = '100%';
    }
    else if(view_p_w >= 480 && view_p_w <= 599){
        pp_w = '100%';
        pp_h = '170%';
    }
            
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        show_title: false,
        deeplinking:false,
        social_tools:false,
        default_width: pp_w,
        default_height: pp_h
    });    
}

/* =========================================================
Carousel
============================================================ */
jQuery(window).load(function() {

    if( jQuery(".kopa-related-post-carousel").length > 0){
        jQuery('.kopa-related-post-carousel').each(function() {
            var $this = jQuery(this),
                paginationID = $this.data('pagination-id'),
                dataScrollItems = $this.data('scroll-items'),
                dataColumns = $this.data('columns'),
                dataAutoplay = $this.data('autoplay'),
                dataDuration = $this.data('duration'),
                dataTimeoutDuration = $this.data('timeout-duration');

            if ( undefined === dataScrollItems ) {
                dataScrollItems = 5;
            }
            if ( undefined === dataAutoplay ) {
                dataAutoplay = false;
            }
            if ( undefined === dataDuration ) {
                dataDuration = 500;
            }
            if ( undefined === dataTimeoutDuration ) {
                dataTimeoutDuration = 2500;
            }

            $this.carouFredSel({
                responsive: true,
                pagination: paginationID,
                width: '100%',
                scroll: {
                    items: dataScrollItems,
                    duration: dataDuration
                },
                auto: {
                    play: dataAutoplay,
                    timeoutDuration: dataTimeoutDuration
                },
                items: {
                    width: 156,
                    height: 'auto',
                    visible: {
                        min: 1,
                        max: dataColumns
                    }
                }
            });
        });
    }
});

/* =========================================================
Gallery slideshow
============================================================ */
(function($){
    jQuery('.kopa-images-slideshow').each(function () {
        var self = jQuery(this);
            targetID = self.data('exposure-id'),
            controlsID = self.data('controls-id');

        self.exposure({
            target: targetID,
            controlsTarget : controlsID,
            controls : { prevNext : true, pageNumbers : true, firstLast : false },
            visiblePages : 2,
            onThumb : function(thumb) {
                var li = thumb.parents('li');               
                var fadeTo = li.hasClass(jQuery.exposure.activeThumbClass) ? 1 : 0.3;
                
                thumb.css({display : 'none', opacity : fadeTo}).stop().fadeIn(200);
                
                thumb.hover(function() { 
                    thumb.fadeTo('fast',1); 
                }, function() { 
                    li.not('.' + jQuery.exposure.activeThumbClass).children('img').fadeTo('fast', 0.3); 
                });
            },
            onImage : function(image, imageData, thumb) {
                // Fade out the previous image.
                image.siblings('.' + jQuery.exposure.lastImageClass).stop().fadeOut(500, function() {
                    jQuery(this).remove();
                });
                
                // Fade in the current image.
                image.hide().stop().fadeIn(1000);

                // Fade in selected thumbnail (and fade out others).
                if (self.showThumbs && thumb && thumb.length) {
                    thumb.parents('li').siblings().children('img.' + $.exposure.selectedImageClass).stop().fadeTo(200, 0.3, function() { $(this).removeClass($.exposure.selectedImageClass); });            
                    thumb.fadeTo('fast', 1).addClass($.exposure.selectedImageClass);
                }
            },
            onPageChanged : function() {
                // Fade in thumbnails on current page.
                self.find('li.' + $.exposure.currentThumbClass).hide().stop().fadeIn('fast');
            }
        });
    });
}(jQuery));

/* =========================================================
Accordion
========================================================= */
jQuery(document).ready(function() {
        var acc_wrapper=jQuery('.acc-wrapper');
        if (acc_wrapper.length >0) 
        {
            
            jQuery('.acc-wrapper .accordion-container').hide();
            jQuery.each(acc_wrapper, function(index, item){
                jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();
                
            });
            
            jQuery('.accordion-title').on('click', function(e) {
                kopa_accordion_click(jQuery(this));
                e.preventDefault();
            });
            
            var titles = jQuery('.accordion-title');
            
            jQuery.each(titles,function(){
                kopa_accordion_click(jQuery(this));
            });
        }
        
});

function kopa_accordion_click (obj) {
    if( obj.next().is(':hidden') ) {
        obj.parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
        obj.toggleClass('active').next().slideDown(300);
                            
    }
jQuery('.accordion-title span').html('+');
    if (obj.hasClass('active')) {
        obj.find('span').first().html('-');              
    } 
}

/* =========================================================
Toggle Boxes
============================================================ */
jQuery(document).ready(function () {
     
    jQuery('#toggle-view li').click(function (event) {
        
        var text = jQuery(this).children('div.panel');
 
        if (text.is(':hidden')) {
            jQuery(this).addClass('active');
            text.slideDown('300');
            jQuery(this).children('span').html('-');                 
        } else {
            jQuery(this).removeClass('active');
            text.slideUp('300');
            jQuery(this).children('span').html('+');               
        }
         
    });
 
});

/* =========================================================
Masonry
============================================================ */
jQuery(function(){
    
    if (jQuery('.masonry-container').length > 0) {
        jQuery('.masonry-container').each(function () {
            var $this = jQuery(this),
                itemClass = $this.data('item-class');

            $this.imagesLoaded(function(){
                $this.masonry({
                    itemSelector : '.' + itemClass,
                    columnWidth: 1,
                    isAnimated: !Modernizr.csstransitions,
                    isFitWidth: true
                });
            });
        });
    }
});
