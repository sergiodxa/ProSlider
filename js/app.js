function establecerAlto(){var a=window.innerHeight;$(".seccion").css("height",a+"px")}$(document).on("ready",function(){establecerAlto(),$(".desplegar-menu").on("click",function(){$(".menu-navegacion").toggleClass("desplegado")})}),$(window).on("resize",function(){establecerAlto()});

var horizontalSlide = new proSlider({
  direction   : 'horizontal',
  element     : '#slider-horizontal ul li',
  keys        : true,
  navContainer: '#slider-horizontal .nav',
  navigation  : true,
  nextBtn     : '#next-horizontal',
  prevBtn     : '#prev-horizontal',
  responsive  : true,
  speed       : 0.5,
  touch       : true
});
horizontalSlide.initialize();

var verticalSlide = new proSlider({
  direction   : 'vertical',
  element     : '#slider-vertical ul li',
  navigation  : true,
  navContainer: '#slider-vertical .nav',
  nextBtn     : '#next-vertical',
  prevBtn     : '#prev-vertical',
  responsive  : true,
  speed       : 0.5,
  touch       : true
});
verticalSlide.initialize();