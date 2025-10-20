# Capítulo 1.1 - Comenzando con AngularJS

## ¿Qué es AngularJS?

AngularJS es un framework JavaScript estructurado que permite crear aplicaciones web dinámicas extendiendo HTML con nuevas etiquetas (directivas) y enlazando datos mediante expresiones.

## Cargar AngularJS

Incluimos AngularJS desde un CDN:

```html
<script src="https://code.angularjs.org/1.5.8/angular.min.js"></script>
```
intro a directivas:
- ng-app: Inicializa una app AngularJS. Sin esto, Angular no sabe que debe actuar sobre el DOM.

- ng-init: Inicializa variables (en este caso nombre). Se recomienda solo para demostraciones rápidas. En general no utilizar.

- ng-model: Enlaza el valor del input con el modelo nombre. Cambiar el input cambia el modelo automáticamente (enlace bidireccional).

- {{ nombre }}: Interpolación. Muestra el valor de nombre directamente en la vista.

- ng-bind="nombre": Alternativa a {{ }} que evita el parpadeo de contenido antes de que AngularJS cargue.

## Enlace bidireccional

AngularJS permite que los cambios en el modelo (JS) se reflejen en la vista (HTML) y viceversa, sin recargar la página. Esto se llama two-way data binding.