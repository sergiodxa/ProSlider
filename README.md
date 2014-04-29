# ProSlider

## Dependencias
Para poder empezar a utilizar se necesita cargar jQuery en su última versión (v1.11.0 a la fecha) y si se quiere utilizar eventos touch se necesita la librería [jQuery touchSwipe](http://labs.rampinteractive.co.uk/touchSwipe/demos).

Al final te tienen que quedar estas líneas para cargar los archivos.

```html
<script src="libs/jquery.min.js"></script>
<script src="libs/jquery.touchSwipe.min.js"></script>
<script src="libs/proSlider.min.js"></script>
```

## Utilización
Para poder empezar a usar proSlider es necesario crear un nuevo objeto usando la clase proSlider que incluye la librería. Para esto se usa el siguienté código:
```javascript
var miSlider = new proSlider();
```
Con esto tenemos un nuevo objeto llamado miSlider hecho en base a la clase proSlider. Luego de esto es necesario inicializar 