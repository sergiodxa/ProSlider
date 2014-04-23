var Slider = function(propieties) {

  // Parametros
  this.direction    = propieties.direction || 'horizontal';
  this.element      = propieties.element || '.slider li';
  this.minis        = propieties.minis;
  this.navContainer = propieties.navContainer || '.slider-nav';
  this.navigation   = propieties.navigation || false;
  this.nextBtn      = propieties.nextBtn || '.next-btn';
  this.prevBtn      = propieties.prevBtn || '.prev-btn';
  this.speed        = propieties.speed || 0.5;
  this.timer        = propieties.timer*1000 || false;
  this.touch        = propieties.touch || false;

  // Objetos de jQuery
  var $container    = $(this.element).parent();
  var $element      = $(this.element);
  var $navContainer = $(this.navContainer);
  var $nextBtn      = $(this.nextBtn);
  var $prevBtn      = $(this.prevBtn);


  /* ============================================================= */


  // definimos la variable totalWidth
  var totalWidth = parseInt($container.parent().css('width')) * parseInt($element.length);

  /* sumamos el ancho de todos los elementos
  for (var i = 0; i < $element.length; ++i) {
    totalWidth += parseInt($($element[i]).css('width'));
  }*/

  // definimos la variable totalHeight
  var totalHeight = 0;

  // sumamos el alto de todos los elementos
  for (var i = 0; i < $element.length; ++i) {
    totalHeight += parseInt($($element[i]).css('height'));
  }

  // Le damos al padre del contenedor la propiedad overflow: hidden
  $container.parent().css('overflow', 'hidden');

  // le damos al contenedor el totalWidth y una velocidad de transición
  $container.css({
    '-webkit-transition' : 'all '+this.speed+'s',
    '-moz-transition'    : 'all '+this.speed+'s',
    '-ms-transition'     : 'all '+this.speed+'s',
    '-o-transition'      : 'all '+this.speed+'s',
    'transition'         : 'all '+this.speed+'s'
  });


  /* ============================================================= */


  // definimos la variable axis
  var axis;

  // si la dirección es horizontal definimos axis como X
  if (this.direction == 'horizontal')  {
    axis = 'X';

    // le damos a todos los elementos del slider float: left
    $element.css({
      'float': 'left'
    });

    // le colocamos al contenedor el ancho total
    $container.css({
      'width': totalWidth+'px'
    });
  }
  // en caso contrario si es vertical definimos axis como Y
  else if (this.direction == 'vertical') {
    axis = 'Y';

    // le colocamos al contenedor el alto total
    $container.css({
      'height': totalHeight+'px'
    });
  }


  /* ============================================================= */


  // definimos el método para ir a cualquier slide posible
  this.goToSlide = function(slide) {

    // si el slide es el último
    if (slide == $element.length-1) {
      // definimos la variable sizeValue
      var sizeValue;

      if (axis == 'X') {
      // obtenemos el ancho del último elemento del slide
        var sizeValue = parseInt($($element[slide]).css('width'));
        sizeValue     = totalWidth-sizeValue;
      }

      if (axis == 'Y') {
      // obtenemos el alto del último elemento del slide
        var sizeValue = parseInt($($element[slide]).css('height'));
        sizeValue     = totalHeight-sizeValue;
      }

      // trasladamos en el eje X/Y el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-moz-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-ms-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-o-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        'transform': 'translate'+axis+'(-'+sizeValue+'px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[actualSlide]).removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[$element.length-1]).addClass('.js-active-slide');
    }

    // si el slide es el primero
    else if (slide == 0) {
      // trasladamos en el eje X/Y a 0 el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(0px)',
        '-moz-transform': 'translate'+axis+'(0px)',
        '-ms-transform': 'translate'+axis+'(0px)',
        '-o-transform': 'translate'+axis+'(0px)',
        'transform': 'translate'+axis+'(0px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $('.js-active-slide').removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[0]).addClass('.js-active-slide');
    }

    // cualquier slide intermedio
    else {
      // definimos la variable sizeValue
      var sizeValue;

      if (axis == 'X') {
      // obtenemos el ancho del siguiente elemento del slide
        var sizeValue = parseInt($($element[slide]).next().css('width'));
        sizeValue     = sizeValue*(slide+1);
      }

      if (axis == 'Y') {
      // obtenemos el alto del siguiente elemento del slide
        var sizeValue = parseInt($($element[slide]).next().css('height'));
        sizeValue     = sizeValue*(slide+1);
      }

      // trasladamos en el eje X/Y el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-moz-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-ms-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        '-o-transform': 'translate'+axis+'(-'+sizeValue+'px)',
        'transform': 'translate'+axis+'(-'+sizeValue+'px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[slide]).removeClass('.js-active-slide');

      // al siguiente elemento le agregamos la clase .js-active-slide
      $($element[slide]).next().addClass('.js-active-slide');
    }
  }


  /* ============================================================= */


  // definimos el método para pasar al siguiente slide
  this.nextSlide = function() {

    // definimos la variable actualSlide
    var actualSlide;

    // comprobamos cual slide es el actual y guardamos su posición en la variable actualSlide
    for (var i = 0; i < $element.length; ++i) {
      if ($($element[i]).hasClass('.js-active-slide')) {
        actualSlide = i;
      }
    }

    /*if (actualSlide != $element.length-1) {      
      this.goToSlide(actualSlide+1);
    }
    else {
      this.goToSlide(0);
    }*/
    // comprobamos que el elemento actual no sea el último
    if (actualSlide != $element.length-1) {

      // definimos la variable nextValue
      var nextValue;

      if (axis == 'X') {
      // obtenemos el ancho del siguiente elemento del slide
        var nextValue = parseInt($($element[actualSlide]).next().css('width'));
        nextValue     = nextValue*(actualSlide+1);
      }

      if (axis == 'Y') {
      // obtenemos el alto del siguiente elemento del slide
        var nextValue = parseInt($($element[actualSlide]).next().css('height'));
        nextValue     = nextValue*(actualSlide+1);
      }

      // trasladamos en el eje X el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(-'+nextValue+'px)',
        '-moz-transform': 'translate'+axis+'(-'+nextValue+'px)',
        '-ms-transform': 'translate'+axis+'(-'+nextValue+'px)',
        '-o-transform': 'translate'+axis+'(-'+nextValue+'px)',
        'transform': 'translate'+axis+'(-'+nextValue+'px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[actualSlide]).removeClass('.js-active-slide');

      // al siguiente elemento le agregamos la clase .js-active-slide
      $($element[actualSlide]).next().addClass('.js-active-slide');
    }
    // si es el último
    else {

      // trasladamos en el eje X a 0 el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(0px)',
        '-moz-transform': 'translate'+axis+'(0px)',
        '-ms-transform': 'translate'+axis+'(0px)',
        '-o-transform': 'translate'+axis+'(0px)',
        'transform': 'translate'+axis+'(0px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[actualSlide]).removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[0]).addClass('.js-active-slide');
    }
  }


  /* ============================================================= */


  // definimos el método para volver al anterior slide
  this.prevSlide = function() {

    // definimos la variable actualSlide
    var actualSlide;

    // comprobamos cual slide es el actual y guardamos su posición en la variable actualSlide
    for (var i = 0; i < $element.length; ++i) {
      if ($($element[i]).hasClass('.js-active-slide')) {
        actualSlide = i;
      }
    }

    /*if (actualSlide != 0) {
      this.goToSlide(actualSlide-1);
    }
    else {
     this.goToSlide($element.length-1); 
    }*/
    // comprobamos que el elemento actual no sea el último
    if (actualSlide != 0) {

      // definimos la variable prevValue
      var prevValue;

      if (axis == 'X') {
      // obtenemos el ancho del siguiente elemento del slide
        var prevValue = parseInt($($element[actualSlide]).prev().css('width'));
        prevValue     = prevValue*(actualSlide-1);
      }

      if (axis == 'Y') {
      // obtenemos el alto del siguiente elemento del slide
        var prevValue = parseInt($($element[actualSlide]).prev().css('height'));
        prevValue     = prevValue*(actualSlide-1);
      }

      // trasladamos en el eje X el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(-'+prevValue+'px)',
        '-moz-transform': 'translate'+axis+'(-'+prevValue+'px)',
        '-ms-transform': 'translate'+axis+'(-'+prevValue+'px)',
        '-o-transform': 'translate'+axis+'(-'+prevValue+'px)',
        'transform': 'translate'+axis+'(-'+prevValue+'px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[actualSlide]).removeClass('.js-active-slide');

      // al siguiente elemento le agregamos la clase .js-active-slide
      $($element[actualSlide]).prev().addClass('.js-active-slide');
    }
    // si es el último
    else {

      // definimos la variable lastValue
      var lastValue;

      if (axis == 'X') {
      // obtenemos el ancho del último elemento del slide
        var lastValue = parseInt($($element[$element.length-1]).css('width'));
        lastValue     = totalWidth-lastValue;
      }

      if (axis == 'Y') {
      // obtenemos el alto del último elemento del slide
        var lastValue = parseInt($($element[$element.length-1]).css('height'));
        lastValue     = totalHeight-lastValue;
      }

      // trasladamos en el eje X a 0 el contenido de $container
      $container.css({
        '-webkit-transform': 'translate'+axis+'(-'+lastValue+'px)',
        '-moz-transform': 'translate'+axis+'(-'+lastValue+'px)',
        '-ms-transform': 'translate'+axis+'(-'+lastValue+'px)',
        '-o-transform': 'translate'+axis+'(-'+lastValue+'px)',
        'transform': 'translate'+axis+'(-'+lastValue+'px)',
      });

      // al elemento actual le quitamos la clase .js-active-slide
      $($element[actualSlide]).removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[$element.length-1]).addClass('.js-active-slide');
    }
  }


  /* ============================================================= */


  // definimos el método para setear el autoslide
  this.setAutoSlide = function() {
    setInterval(this.nextSlide, this.timer);
  }


  /* ============================================================= */


  // definimos el método para activar el soporte touch
  this.activeTouch = function() {
    // asignamos los métodos nextSlide y prevSlide a los eventos swipe
    if (axis == 'X') {
      // asignamos los eventos a swiperight y swipeleft si el axis es X
      $element.on('swiperight', this.nextSlide);
      $element.on('swipeleft', this.prevSlide);
    }
    else if (axis == 'Y') {
      // asignamos los eventos a swipebottom y swipetop si el axis es Y
      $element.on('swipebottom', this.nextSlide);
      $element.on('swipetop', this.prevSlide);
    }
  }


  /* ============================================================= */


  /*this.setNavigation = function() {
    if (pepito) {
      var html = '';
      for (i=0;i<=slides;i++) {
        html += '<a data-slide="'+i+'">'+i+'</a>';
      }
      document.querySelector(nav).innerHTML = html;
      links = document.querySelector(nav).childNodes;
      for (i=0;i<=links.length-1;i++) {
        links[i].addEventListener('click', function() {
          for (i=0;i<=links.length-1;i++) {
            links[i].className = '';
          }
          this.className = 'active';
          position = parseInt((this).getAttribute('data-slide'));
          changeSlide();
        });
    }
    // definimos la variable navContent vacía
    var navContent = '';

    // agregamos a navContent un link con el param data-slide por cada elemento
    for (var i = 0; i < $element.length; ++i) {
      navContent += '<a data-slide="'+i+'" class="slider-nav-list-link">'+(i+1)+'</a>';
    }

    // al navContent le agregamos un div que lo contenga para mejor manejo
    navContent = '<div class="slider-nav-list">'+navContent+'</div>';

    // agramos el contenido de navContent a $navContainer
    $navContainer.html(navContent);

    var $navLinks = $('.slider-nav-list-link');

    for (var i = 0; i < $navLinks.length; ++i) {
      $($navLinks[i]).on('click', function() {
        $navLinks.removeClass('active');
        $(this).addClass('active');
        this.goToSlide(i);
      })
    }
  }*/


  /* ============================================================= */


  // definimos el método para inicial el slider
  this.initialize = function() {
    // al primer elemento del slider le agregamos la clase .js-active-slide
    $($element[0]).addClass('.js-active-slide');

    // asignamos los métodos nextSlide y prevSlide al evento click de $nextBtn y $prevBtn
    $nextBtn.on('click', this.nextSlide);
    $prevBtn.on('click', this.prevSlide);

    // activamos los eventos touch si está soportado el touch
    if (this.touch) {
      this.activeTouch();
    }

    // iniciamos el autoslide si esta seteado un timer
    if (this.timer) {
      this.setAutoSlide();
    }
  }

}