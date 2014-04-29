var proSlider = function(propieties) {

  propieties = propieties || {};

  // Parametros
  this.controler      = propieties.controller || '.js-controller';
  this.direction      = propieties.direction || 'horizontal';
  this.element        = propieties.element || '.slider li';
  this.keys           = propieties.keys || false;
  this.minis          = propieties.minis || false;
  this.minisContainer = propieties.minisContainer || '.minis';
  this.navContainer   = propieties.navContainer || '.slider-nav';
  this.navigation     = propieties.navigation || false;
  this.nextBtn        = propieties.nextBtn || '.next-btn';
  this.pauseBtn       = propieties.pauseBtn || '.pause-btn';
  this.playBtn        = propieties.playBtn || '.play-btn';
  this.prevBtn        = propieties.prevBtn || '.prev-btn';
  this.responsive     = propieties.responsive || false;
  this.speed          = propieties.speed || 0.5;
  this.timer          = propieties.timer*1000 || false;
  this.touch          = propieties.touch || false;

  // Objetos de jQuery
  var $container    = $(this.element).parent();
  var $controller   = $(this.controller);
  var $element      = $(this.element);
  var $navContainer = $(this.navContainer);
  var $nextBtn      = $(this.nextBtn);
  var $pauseBtn     = $(this.pauseBtn);
  var $playBtn      = $(this.playBtn);
  var $prevBtn      = $(this.prevBtn);

  // Definición de variables
  var axis;
  var interval;
  var sizeValue;
  var targetSlide;
  var timer = this.timer || 1500;
  var totalSize;


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


  // si la dirección es horizontal definimos axis como X
  if (this.direction == 'horizontal')  {
    axis = 'X';
  }
  // en caso contrario si es vertical definimos axis como Y
  else if (this.direction == 'vertical') {
    axis = 'Y';
  }


  /* ============================================================= */


  // definimos el método para calcular el ancho y alto
  this.setSize = function() {
    // calculamos el ancho si el slider es horizontal
    if (axis == 'X') {
      // calculamos el tamaño total en ancho del contenedor
      totalSize = parseInt($container.parent().css('width')) * parseInt($element.length);

      // le damos a todos los elementos del slider float: left
      $element.css({
        'float': 'left',
        'width': $container.parent().css('width')
      });

      // le colocamos al contenedor el ancho total
      $container.css({
        'width': totalSize+'px'
      });
    }
    // calculamos el alto si el slider es vertical
    else if (axis == 'Y') {

      // calculamos el tamaño total en altura del contenedor
      totalSize = parseInt($container.parent().css('height')) * parseInt($element.length);

      // le colocamos al contenedor el alto total
      $container.css({
        'height': totalSize+'px'
      });
    }
  }
  var setSize = this.setSize; // asignamos el método setSize para usar de forma interna.


  /* ============================================================= */


  this.goToSlide = function(slide) {
    if (axis == 'X') {
      // obtenemos el ancho del siguiente elemento del slide
      sizeValue = parseInt($($element[slide]).css('width'));
    }

    if (axis == 'Y') {
      // obtenemos el alto del siguiente elemento del slide
      sizeValue = parseInt($($element[slide]).css('height'));
    }

    sizeValue = sizeValue*(slide);

    // trasladamos en el eje X/Y el contenido de $container
    $container.css({
      '-webkit-transform': 'translate'+axis+'(-'+sizeValue+'px)',
      '-moz-transform': 'translate'+axis+'(-'+sizeValue+'px)',
      '-ms-transform': 'translate'+axis+'(-'+sizeValue+'px)',
      '-o-transform': 'translate'+axis+'(-'+sizeValue+'px)',
      'transform': 'translate'+axis+'(-'+sizeValue+'px)',
    });

    // al elemento actual le quitamos la clase .js-active-slide
    $($element).removeClass('.js-active-slide');

    // al slide actual le agregamos la clase .js-active-slide
    $($element[slide]).addClass('.js-active-slide');

    // obtenemos la lsita de links del nav
    var $navListLink = $navContainer.find('.slider-nav-list-link');

    // les quitamos la clase active
    $navListLink.removeClass('active');

    // y al que corresponde con el slide actual le agregamos la clase active
    $($navListLink[slide]).addClass('active');
  }
  var goToSlide = this.goToSlide; // asignamos el método goToSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para pasar al siguiente slide
  this.nextSlide = function() {

    // comprueba cual es el slide actual y se guarda en la variable targetSlide cual es el slide siguiente
    for (var i = 0; i < $element.length; ++i) {
      if ($($element[i]).hasClass('.js-active-slide')) {
        if (i >= $element.length-1) {
          targetSlide = 0;
        }
        else {
          targetSlide = i + 1;
        }
      }
    }

    // llamamos al método goToSlide para ir al slide siguiente
    goToSlide(targetSlide);

  }
  var nextSlide = this.nextSlide; // asignamos el método nextSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para volver al anterior slide
  this.prevSlide = function() {

    // comprueba cual es el slide actual y se guarda en la variable targetSlide cual es el slide anterior
    for (var i = 0; i < $element.length; ++i) {
      if ($($element[i]).hasClass('.js-active-slide')) {
        if (i <= 0) {
          targetSlide = $element.length-1;
        }
        else {
          targetSlide = i - 1;
        }
      }
    }

    // llamamos al método goToSlide para ir al slide anterior
    goToSlide(targetSlide);

  }
  var prevSlide = this.prevSlide; // asignamos el método prevSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para setear el autoslide
  this.setAutoSlide = function(timer) {
    interval = setInterval(nextSlide, timer);
  }
  var setAutoSlide = this.setAutoSlide; // asignamos el método setAutoSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para parar el autoslide
  this.clearAutoSlide = function() {
    clearInterval(interval);
  }
  var clearAutoSlide = this.clearAutoSlide; // asignamos el método clearAutoSlide para usar de forma interna.


  /* ============================================================= */


  // definimos el método para setear los controladores de play y pausa
  this.setControllers = function(personalizedTimer) {

    personalizedTimer = personalizedTimer*1000 || timer;
    $pauseBtn.on('click', function() {
      clearAutoSlide();
    });
    $playBtn.on('click', function() {
      setAutoSlide(personalizedTimer);
    });
  }
  var setControllers = this.setControllers; // asignamos el método setControllers para usar de forma interna.


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

    // les asignamos a los links del nav que al hacer click se objeta el data-slide y se vaya a ese slide
    $($navLinks).on('click', function() {
      // obtenemos el targetSlide
      targetSlide = $(this).data('slide');

      // llamamos al método goToSlide para ir al slide objetivo
      goToSlide(targetSlide);
    });
  }
  var setNavigation = this.setNavigation; // asignamos el método setNavigation para usar de forma interna.


  /* ============================================================= */


  this.clearNavigation = function() {
    $navContainer.html('');
  }
  var clearNavigation = this.clearNavigation; // asignamos el método clearNavigation para usar de forma interna.


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
  var setKeys = this.setKeys; // asignamos el método setKeys para usar de forma interna.


  /* ============================================================= */


  this.disabledKeys = function() {
    $(window).unbind('keydown');
  }
  var disabledKeys = this.disabledKeys; // asignamos el método disabledKeys para usar de forma interna.


  /* ============================================================= */


  // definimos el método para activar las miniaturas
  this.setMiniatures = function() {}
  var setMiniatures = this.setMiniatures; // asignamos el método setMiniatures para usar de forma interna. 


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
      setAutoSlide(this.timer);
      setControllers();
    }

    // asignamos el método setSize el evento resize si el soporte para responsive esta activado.
    if (this.responsive) {
      $(window).on('resize', function() {
        setSize(); // re calculamos el tamaño
        nextSlide(); // pasamos al siguiente slide
        prevSlide(); // y volvemos al anterior (esto es para que posicione bien el slide)
      });
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