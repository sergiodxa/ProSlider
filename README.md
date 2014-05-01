# ProSlider v1.2.0

## Dependencias
Para poder empezar a utilizarlo se necesita cargar [jQuery](http://jquery.com) en su última versión (v1.11.0 a la fecha) y si se quiere utilizar eventos touch se necesita la librería [jQuery touchSwipe](http://labs.rampinteractive.co.uk/touchSwipe/demos).

Al final te tienen que quedar estas líneas para cargar los archivos.

```html
<script src="ruta/jquery.min.js"></script>
<script src="ruta/jquery.touchSwipe.min.js"></script>
<script src="ruta/proSlider.min.js"></script>
```

## Utilización
Para poder empezar a usar proSlider es necesario crear un nuevo objeto usando la clase proSlider que incluye la librería. Para esto se usa el siguiente código:
```javascript
var miSlider = new proSlider();
```
Con esto tenemos un nuevo objeto llamado miSlider hecho en base a la clase proSlider. Luego de esto es necesario inicializar el slider utilizando el método .initialize().
```javascript
miSlider.initialize();
```
Con esto ya tenemos nuestro slider funcionando usando los valores por defecto.

## Personalizar slider
Para poder personalizar el slider (o tener más de uno por página) es necesario cambiar los valores por defecto del slider, para esto hay que empezar a pasarle parámetro al momento de definirlo. Ejemplo:
```javascript
var miSlider = new proSlider({
  direction : 'vertical',
  element   : '#miSlider .slides .li'
});
```
Con esto ya tendríamos un slider que solo funciona con los elementos li dentro de .slides dentro de #miSlider y que funciona en vertical, hay muchos posibles parámetros con sus diferentes usos.

## Parámetros
Esta es una lista de parámetros posibles a usar, sus valores por defecto y una descripción.
```javascript
proSlider({
  controller   : '.js-controller'; // cualquier elemento de html en su notación de CSS
  direction    : 'horizontal|vertical'; // el slides solo funciona en horizontal y vertical;
  element      : '.slider li'; // cualquier elemento de html en su notación de CSS
  keys         : false; // true para activar que se puede mover mediante teclas
  navContainer : '.slider nav';  // cualquier elemento de html en su notación de CSS
  navigation   : false; // true para activar que esten los números de slides para navegar por el slider
  nextBtn      : '.next-btn';  // cualquier elemento de html en su notación de CSS
  pauseBtn     : '.pause-btn'; // cualquier elemento de html en su notación de CSS
  playBtn      : '.play-btn'; // cualquier elemento de html en su notación de CSS
  prevBtn      : '.prev-btn'; // cualquier elemento de html en su notación de CSS
  responsive   : false; // true para activar que sea responsive
  speed        : 0.5; // determina la velocidad de la animación, va en segundos
  timer        : false; // cualquier valor en segundos para activarlo
  touch        : false; // true para activar que funcione con eventos touch (requiere dependencia externa)
});
```

## Métodos
La clase proSlider posee varios métodos públicos que pudes acceder en cualquier momento y te permiten programar interacción con el slider. Para esto tienes que llamarlos de una forma similar a .initialize(). A continuación una lista de métodos con su función:

### .setSize()
Permite calcular el alto/ancho total del slider dependiendo de si es horizontal o vertical. Se ejecuta al usar .initialize() y cada vez que se redimensione el navegador si esta el responsive activado.

### .goToSlide()
Recibe el slide objetivo al que se quiere ir y cambia a ese slide.

### .nextSlide() y .prevSlide()
Métodos similiares que sirven para pasar al siguiente y anterior slide respectivamente. Se asigan a nextBtn y prevBtn al usar .initialize() y calculan cual es el slide actual, cual es el objetivo y llaman al método .goToSlide().

### .setAutoSlide() y .clearAutoSlide()
Permiten activar que el slider funcione solo cada X tiempo o detener este funcionamiento. El primero recibe un parámetro de tipo Int en milisegundos para determinar cada cuanto pase al siguiente slide.

### .setControllers()
Asigna a playBtn y pauseBtn los métodos .setAutoSlide() y .clearAutoSlide(). Este método puede recibir un Int en segundos para pasarle a .setAutoSlide() en milisegundos, si no lo recibe utiliza el parámetro timer del objeto (en caso de ser false usa 1.5s).

### .activeTouch()
Activa la detección de eventos swipe en left y right para un slider horizontal o up y down para un slider vertical y ejecuta el método .nextSlide() o .prevSlide() según cual se realice.

### .setNavigation()
Crea un paginador con números que identifican a cada slider y permiten navegar por el slider facilmente.

### .clearNavigation()
Borra el paginador creado con .setNavigation().

### .setKeys()
Asigna los métodos .nextSlide() y .prevSlide() a las flechas derecha/abajo e izquierda/arriba respectivamente dependiendo de si el slider es horizontal o vertical.

### .disabledKeys()
Desliga los métodos .nextSlide() y .prevSlide() de las flechas asignadas con .setKeys(), este métodos afecta a todos los sliders de la página.

### .initialize()
Asigna o ejecuta los anteriores métodos dependiendo de los parámetros pasados.