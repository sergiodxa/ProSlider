function establecerAlto(){var a=window.innerHeight;$(".seccion").css("height",a+"px")}$(document).on("ready",function(){establecerAlto(),$(".desplegar-menu").on("click",function(){$(".menu-navegacion").toggleClass("desplegado")})}),$(window).on("resize",function(){establecerAlto()});

/*var horizontalSlide = new Slider({
  direction   : 'horizontal',
  element     : '#slider-horizontal ul li',
  navigation  : true,
  navContainer: '#slider-horizontal .nav',
  nextBtn     : '#next-horizontal',
  prevBtn     : '#prev-horizontal',
  responsive  : true,
  speed       : 0.5,
  touch       : true
});
horizontalSlide.initialize();*/