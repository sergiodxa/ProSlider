function establecerAlto(){var a=window.innerHeight;$(".seccion").css("height",a+"px")}$(document).on("ready",function(){establecerAlto(),$(".desplegar-menu").on("click",function(){$(".menu-navegacion").toggleClass("desplegado")})}),$(window).on("resize",function(){establecerAlto()});

var horizontalSlide = new proSlider({
  direction     : 'horizontal',
  element       : '#slider-horizontal ul li',
  keys          : true,
  minis         : true,
  minisContainer: '.minis',
  navContainer  : '#slider-horizontal .nav',
  navigation    : true,
  nextBtn       : '#next-horizontal',
  prevBtn       : '#prev-horizontal',
  responsive    : true,
  speed         : 0.5,
  touch         : true
});
horizontalSlide.initialize();

var verticalSlide = new proSlider({
  direction   : 'vertical',
  element     : '#slider-vertical ul li',
  navContainer: '#slider-vertical .nav',
  navigation  : true,
  nextBtn     : '#next-vertical',
  prevBtn     : '#prev-vertical',
  responsive  : true,
  speed       : 0.5,
  touch       : true
});
verticalSlide.initialize();