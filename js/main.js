"use strict";
  
  // preloader
  var interval = 0;
  var timeOut = setInterval(function(){preLoader();}, 1000);
  function preLoader(){  
    if (interval == 1) {
      clearInterval(timeOut);
      $('.preloader').slideDown(1000, function(){
        $(".preloader-bg").css('left', 'auto');
        $(".preloader-bg").css('width', '0');
        $(".preloader-bg").css('right', '0');
      });
      $('.preloader').addClass('preloaderOut');
    }
  }
  function hidepreLoader(){$('.preloader').fadeOut();}
  setTimeout(hidepreLoader, 2000);

$("document").ready(function(){

  interval = 1;
  
  // changing background from html
    $.each($("[data-bg]"), function(){
        if ($(this).attr("data-bg").length > 0){
          $(this).css("background-image", "url("+ $(this).attr("data-bg") +")");
        }
    });

  // add fixed class to top navbar navigation
  if (!$(".navbar-default").hasClass("navbar-fixed-top")) {
    $(window).on("scroll", function() {    
      var scroll = $(window).scrollTop();
      if (scroll >= 120) {
          $(".navbar-default").addClass("navbar-fixed-top");
          $(".categories-content").css("padding-top", "147px");
      } else {
          $(".navbar-default").removeClass("navbar-fixed-top");
          $(".categories-content").css("padding-top", "0");
      }
    });
  }

    // dropdown menu submenu open
    $(".navbar a.dropdown-toggle").on("click hover", function(e) {
        var $el = $(this);
        var $parent = $(this).offsetParent(".dropdown-menu");
        $(this).parent("li").toggleClass("open");
        if(!$parent.parent().hasClass("nav")) {
            $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 0});
        }
        $(".nav li.open").not($(this).parents("li")).removeClass("open");
        return false;
    });

    // adding swipe to slider
    $("#main-carousel, #product-img-carousel").swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == "left") $(this).carousel("next");
        if (direction == "right") $(this).carousel("prev");
      },
      allowPageScroll:"vertical"
    });

    // carousel next/prev controls
    $(".carousel-control.left").on("click",function() {
      $("#main-carousel").carousel("prev");
    });
    $(".carousel-control.right").on("click",function() {
      $("#main-carousel").carousel("next");
    });

  //  home front articles masonry grid
  if ($("#front-articles").width() > 0) {
    $("#front-articles").isotope({
        itemSelector: ".card",
        masonry:{
          columnWidth: ".card",
        }
    });
  }

  // starting sidebar post carousel
  if ($(".sidebar-last-post").width() > 0) {
    $(".sidebar-last-post").owlCarousel({
      loop:true,
      items: 1,
    });
  }

  // testimonials carousel
  if ($(".testimonials-carousel").width() > 0) {
    $(".testimonials-carousel").owlCarousel({
      loop:true,
      items: 1,
      autoplay: true,
    });
  }

  // startinig paralax effect (jaralalx.js)
  $(".article.sticky-post .article-bg").jarallax({
    speed: 0.5,
    videoStartTime: 1
  });

  // gallery lightbox (magnific popup)
  if ($(".popover-lnk").width() > 0) {
    $(".popover-lnk").magnificPopup({
      type: "image",
      gallery:{
        enabled:true
      }
    });
  }

  // smooth scroll to div
    $(function() {
      $("a.comment-reply-link").on("click",function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
          if (target.length) {
            $("html, body").animate({
              scrollTop: target.offset().top - 130
            }, 1000);
            return false;
          }
        }
      });
    });

  // THE SEARCH
  $("#switchSearch").on("click", function(e){
    e.preventDefault();
    $(".navbar").toggleClass("show-search");
  });
  // close search clicking outside
  $(window).on("click",function() {
    $(".navbar").removeClass("show-search");
  });
  $(".search-btn, .top-search").on("click",function(event){
      event.stopPropagation();
  });
  // close the search on pressing esc
  $(document).on("keyup",function(e) { 
    if (e.keyCode == 27) { // esc keycode
      $(".navbar").removeClass("show-search");
    }
  });
  // sumbmit form on press enter key
  $("input").on("keypress",function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $("form").submit();
    }
  });

  // show bottom logo
  if ($("section.about-template .about-bg").width() > 0) {
    $(document).on('scroll', function(ev) {
      var scrollOffset = $(document).scrollTop();
      var containerOffset = $(".about-template").offset().top - window.innerHeight;
      if (scrollOffset > containerOffset) {
        $("section.about-template .about-bg").addClass("visible");
      }
    });
  };
  
  // comming soon countdown
  var clock;
  var date = new Date(2017, 4, 21); //date to event/launch
  var now = new Date();
  var diff = (date.getTime()/1000) - (now.getTime()/1000);
  clock = $('#countdown').FlipClock(diff, {
    clockFace: 'DailyCounter',
    autoStart: false,
  });
  clock.setCountdown(true);
  clock.start();


  // animate cards on scroll
    (function(e) {
        $.fn.visible = function(partial) {
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
      };    
    })($);
    if ($(".card").width() > 0) {
      var win = $(window);
      var allMods = $(".card");
      allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("already-visible"); 
        } 
      });
      win.scroll(function(event) {
        allMods.each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass("come-in"); 
          } 
        });
      });
    }


}); <!-- //end document ready -->

  // autoresize textarea(depend on content) in article.html
  if ($("textarea").width() > 0) {
    var textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", autosize);
    function autosize(){
      var el = this;
      setTimeout(function(){
        el.style.cssText = "height:auto; padding:10";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      },0);
    }
  }

  // video player control about.html
  $("#about-play").on("click", function(){
    $(".video-hover").addClass("show-video");
  });
  $("#about-stop").on("click", function(){
    $(".video-hover").removeClass("show-video");
  });

if ($(".showcase").width() > 0) {
  $(window).on("scroll",startCounter);
    function startCounter() {
      if ($(window).scrollTop() > $(".showcase").offset().top + 200) {
        $(window).off("scroll", startCounter);
        $(".count").each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 3000,
                easing: "swing",
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
      }
    }
}


// mobile
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  
}







