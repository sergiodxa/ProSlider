var Slider = function(propieties) {

  propieties = propieties || {};

  // Parametros
  this.direction      = propieties.direction || 'horizontal';
  this.element        = propieties.element || '.slider li';
  this.keys           = propieties.keys || false;
  this.minis          = propieties.minis || false;
  this.minisContainer = propieties.minisContainer || '.minis';
  this.navContainer   = propieties.navContainer || '.slider-nav';
  this.navigation     = propieties.navigation || false;
  this.nextBtn        = propieties.nextBtn || '.next-btn';
  this.prevBtn        = propieties.prevBtn || '.prev-btn';
  this.responsive     = propieties.responsive || false;
  this.speed          = propieties.speed || 0.5;
  this.timer          = propieties.timer*1000 || false;
  this.touch          = propieties.touch || false;

  // Objetos de jQuery
  var $container    = $(this.element).parent();
  var $element      = $(this.element);
  var $navContainer = $(this.navContainer);
  var $nextBtn      = $(this.nextBtn);
  var $prevBtn      = $(this.prevBtn);


  /* ============================================================= */


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
  }
  // en caso contrario si es vertical definimos axis como Y
  else if (this.direction == 'vertical') {
    axis = 'Y';
  }


  /* ============================================================= */

  var totalHeight,
      totalWidth;

  // definimos el método para calcular el ancho y alto
  this.setSize = function() {
    // calculamos el ancho si el slider es horizontal
    if (axis == 'X') {
      // definimos la variable totalWidth
      totalWidth = parseInt($container.parent().css('width')) * parseInt($element.length);

      /* sumamos el ancho de todos los elementos -> código en desuso, dejado por las dudas
      for (var i = 0; i < $element.length; ++i) {
        totalWidth += parseInt($($element[i]).css('width'));
      }*/

      // le damos a todos los elementos del slider float: left
      $element.css({
        'float': 'left',
        'width': $container.parent().css('width')
      });

      // le colocamos al contenedor el ancho total
      $container.css({
        'width': totalWidth+'px'
      });
    }
    // calculamos el alto si el slider es vertical
    else if (axis == 'Y') {
      // definimos la variable totalHeight
      totalHeight = 0;

      // sumamos el alto de todos los elementos
      for (var i = 0; i < $element.length; ++i) {
        totalHeight += parseInt($($element[i]).css('height'));
      }

      // le colocamos al contenedor el alto total
      $container.css({
        'height': totalHeight+'px'
      });
    }
  }
  var setSize = this.setSize; // asignamos el método setSize para usar de forma interna.


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
      $($element).removeClass('.js-active-slide');

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
      $($element).removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[0]).addClass('.js-active-slide');
    }

    // cambiamos el slider-nav-list-link activo
    var $navListLink = $navContainer.find('.slider-nav-list-link')
    for (var i = 0; i < $navListLink.length; ++i) {
      if (actualSlide == $navListLink.length-1) {
        if ($($navListLink[i]).data('slide') == 0) {
          $navListLink.removeClass('active');
          $($navListLink[i]).addClass('active');
        }
      }
      else {
        if ($($navListLink[i]).data('slide') == actualSlide+1) {
          $navListLink.removeClass('active');
          $($navListLink[i]).addClass('active');
        }
      }
    }
    if (this.timer) {
      clearAutoSlide();
      setAutoSlide();
    }
  }
  var nextSlide = this.nextSlide; // asignamos el método nextSlide para usar de forma interna.


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
      $($element).removeClass('.js-active-slide');

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
      $($element).removeClass('.js-active-slide');

      // al primer elemento le agregamos la clase .js-active-slide
      $($element[$element.length-1]).addClass('.js-active-slide');
    }

    // cambiamos el slider-nav-list-link activo
    var $navListLink = $navContainer.find('.slider-nav-list-link')
    for (var i = 0; i < $navListLink.length; ++i) {
      if (actualSlide == 0) {
        if ($($navListLink[i]).data('slide') == $navListLink.length-1) {
          $navListLink.removeClass('active');
          $($navListLink[i]).addClass('active');
        }
      }
      else {
        if ($($navListLink[i]).data('slide') == actualSlide-1) {
          $navListLink.removeClass('active');
          $($navListLink[i]).addClass('active');
        }
      }
    }
    if (this.timer) {
      clearAutoSlide();
      setAutoSlide();
    }
  }
  var prevSlide = this.prevSlide; // asignamos el método prevSlide para usar de forma interna.


  /* ============================================================= */


  var interval;
  // definimos el método para setear el autoslide
  this.setAutoSlide = function() {
    interval = setInterval(this.nextSlide, this.timer);
  }
  var setAutoSlide = this.setAutoSlide; // asignamos el método setAutoSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para parar el autoslide
  this.clearAutoSlide = function() {
    clearInterval(interval);
  }
  var clearAutoSlide = this.clearAutoSlide; // asignamos el método clearAutoSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para activar el soporte touch
  this.activeTouch = function() {
    // asignamos los métodos nextSlide y prevSlide a los eventos swipe
    if (axis == 'X') {
      // asignamos los eventos a swiperight y swipeleft si el axis es X
      $element.swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
          nextSlide();
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
          prevSlide();
        }
      });
    }
    else if (axis == 'Y') {
      // asignamos los eventos a swipebottom y swipetop si el axis es Y
      $element.swipe({
        swipeDown: function(event, direction, distance, duration, fingerCount) {
          prevSlide();
        },
        swipeUp: function(event, direction, distance, duration, fingerCount) {
          nextSlide();
        }
      });
    }
  }
  var activeTouch = this.activeTouch; // asignamos el método activeTouch para usar de forma interna.


  /* ============================================================= */


  // definimos el método para activar paginador para navegar por los slides facilmente
  this.setNavigation = function() {

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

    // obtenemos todos los slider-nav-list-link dentro de $navContainer
    var $navLinks = $navContainer.find('.slider-nav-list-link');

    // al primer navLink le agregamos la clase active
    $($navLinks[0]).addClass('active');

    // recorremos todos los slider-nav-list-link
    for (var i = 0; i < $navLinks.length; ++i) {

      // le asignamos a cada uno una función onclick
      $($navLinks[i]).on('click', function() {

        // les quitamos la clase active
        $navLinks.removeClass('active');

        // se la agregamos al actual
        $(this).addClass('active');

        // definimos actualSlide como el slide objetivo menos 1
        var actualSlide = $(this).data('slide')-1;

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

        // trasladamos en el eje X/Y el contenido de $container
        $container.css({
          '-webkit-transform': 'translate'+axis+'(-'+nextValue+'px)',
          '-moz-transform': 'translate'+axis+'(-'+nextValue+'px)',
          '-ms-transform': 'translate'+axis+'(-'+nextValue+'px)',
          '-o-transform': 'translate'+axis+'(-'+nextValue+'px)',
          'transform': 'translate'+axis+'(-'+nextValue+'px)',
        });

        // al elemento actual le quitamos la clase .js-active-slide
        $($element).removeClass('.js-active-slide');

        // al siguiente elemento le agregamos la clase .js-active-slide
        if (actualSlide == -1) {
          // si actualSlide es 0 le agregamos la clase al elemento en posición 0
          $($element[0]).addClass('.js-active-slide');
        }
        else {
          // en cualquier otro caso se lo agregamos al siguiente
          $($element[actualSlide]).next().addClass('.js-active-slide');
        }

      });
    }
  }
  var setNavigation = this.setNavigation; // asignamos el método setNavigation para usar de forma interna.


  /* ============================================================= */


  // definimos el método para activar el desplazamiento por teclas
  this.setKeys = function() {
    // detectamos el evento keydown en toda la ventana
    $(window).keydown(function(ev) {
    // comprobamos si el slider es horizontal o vertical
    // si es horizontal
      if (axis == 'X') {
      // comprobamos cual tecla se oprimió
      // si es la tecla 39 (flecha derecha)
        if (ev.which == '39') {
          // evitamos el evento por defecto
          ev.preventDefault();
          // pasamos al siguiente slide
          nextSlide();
        }
        // si es la tecla 37 (flecha izquierda)
        else if (ev.which == '37') {
          // evitamos el evento por defecto
          ev.preventDefault();
          // pasamos al slide anterior
          prevSlide();
        }
      }
      // si es vertical
      else if (axis == 'Y') {
        // comprobamos cual tecla se oprimió
        // si es la tecla 39 (flecha abajo)
        if (ev.which == '40') {
          // evitamos el evento por defecto
          ev.preventDefault();
          nextSlide();
          // pasamos al siguiente slide
        }
        // si es la tecla 38 (flecha arriba)
        else if (ev.which == '38') {
          // evitamos el evento por defecto
          ev.preventDefault();
          // pasamos al slide anterior
          prevSlide();
        }
      }
    });
  }


  /* ============================================================= */


  // definimos el método para iniciar el slider
  this.initialize = function() {

    // seteamos el tamaño del contenedor del slider
    setSize();

    // al primer elemento del slider le agregamos la clase .js-active-slide
    $($element[0]).addClass('.js-active-slide');

    // asignamos los métodos nextSlide y prevSlide al evento click de $nextBtn y $prevBtn
    $nextBtn.on('click', nextSlide);
    $prevBtn.on('click', prevSlide);

    // activamos los eventos touch si está soportado el touch
    if (this.touch) {
      activeTouch();
    }

    // iniciamos el autoslide si esta seteado un timer
    if (this.timer) {
      setAutoSlide();
    }

    // asignamos el método setSize el evento resize si el soporte para responsive esta activado.
    if (this.responsive) {
      $(window).on('resize', function() {
        setSize(); // re calculamos el tamaño
        nextSlide(); // pasamos al siguiente slide
        prevSlide(); // y volvemos al anterior (esto es para que posicione bien el slide)
      })
    }

    // creamos el navigation si esta activado
    if (this.navigation) {
      setNavigation();
    }

    // iniciamos el desplazamiento por teclas si esta activado
    if (this.keys) {
      setKeys();
    }
  }

}