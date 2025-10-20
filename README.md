# **NOTAS DE ANGULAR JS**

# Capítulo 1.1 - Comenzando con AngularJS

## ¿Qué es AngularJS?

AngularJS es un framework JavaScript estructurado que permite crear aplicaciones web dinámicas extendiendo HTML con nuevas etiquetas (directivas) y enlazando datos mediante expresiones.

## Cargar AngularJS

Incluimos AngularJS desde un CDN:

```html
<script src="https://code.angularjs.org/1.5.8/angular.min.js"></script>
```

## Ejemplo completo
```
<!DOCTYPE html>
<html ng-app>
<head>
  <script src="https://code.angularjs.org/1.5.8/angular.min.js"></script>
</head>
<body>

  <div ng-init="saludo='Hola'">
    <p>{{ saludo }}</p>
  </div>

  <div ng-init="nombre='Mundo'">
    <p>{{ nombre }}</p>
  </div>

</body>
</html>
```

intro a directivas:
- ng-app: Inicializa una app AngularJS. Sin esto, Angular no sabe que debe actuar sobre el DOM.

- ng-init: Inicializa variables (en este caso nombre). Se recomienda solo para demostraciones rápidas. En general no utilizar.

- ng-model: Enlaza el valor del input con el modelo nombre. Cambiar el input cambia el modelo automáticamente (enlace bidireccional).

- {{ nombre }}: Interpolación. Muestra el valor de nombre directamente en la vista.

- ng-bind="nombre": Alternativa a {{ }} que evita el parpadeo de contenido antes de que AngularJS cargue.

## Enlace bidireccional

AngularJS permite que los cambios en el modelo (JS) se reflejen en la vista (HTML) y viceversa, sin recargar la página. Esto se llama two-way data binding.

# Capítulo 1.2 - Mostrando todas las construcciones comunes de AngularJS

En esta sección se muestra un ejemplo completo que utiliza múltiples características de AngularJS en un solo archivo.

---

## Ejemplo completo:

```html
<!DOCTYPE html>
<html ng-app="miAppDemo">
  <head>
    <style>
      .iniciado {
        background: gold;
      }
    </style>
    <script src="https://code.angularjs.org/1.5.8/angular.min.js"></script>
    <script>
      function ServicioDatosMundos() {
        return {
          obtenerMundos: function () {
            return ["este mundo", "otro mundo"];
          }
        };
      }

      function ControladorDemo(servicioMundos) {
        var vm = this;
        vm.mensajes = servicioMundos.obtenerMundos().map(function (mundo) {
          return "Hola, " + mundo + "!";
        });
      }

      function alIniciar($rootScope, $window) {
        $window.alert("¡Hola usuario! Cargando mundos...");
        $rootScope.yaInicio = true;
      }

      angular.module("miAppDemo", [])
        .service("servicioMundos", [ServicioDatosMundos])
        .controller("controladorDemo", ["servicioMundos", ControladorDemo])
        .config(function () {
          console.log("Configurando aplicación...");
        })
        .run(["$rootScope", "$window", alIniciar]);
    </script>
  </head>
  <body ng-class="{ 'iniciado': yaInicio }" ng-cloak>
    <div ng-controller="controladorDemo as vm">
      <ul>
        <li ng-repeat="mensaje in vm.mensajes">{{ mensaje }}</li>
      </ul>
    </div>
  </body>
</html>
```

## Explicación línea por línea

### ng-app="miAppDemo"

Inicializa la aplicación AngularJS y la asocia con el módulo miAppDemo.

### angular.module(...)

Crea el módulo principal. Podemos encadenar .service(), .controller(), .config() y .run() a este módulo.

.service(): Registra un servicio (inyección de dependencias).

.controller(): Registra un controlador.

.config(): Ejecuta código durante la fase de configuración.

.run(): Ejecuta código cuando la app se ha inicializado completamente.

### Servicio: ServicioDatosMundos

Define una función que retorna un array de mundos. Este servicio será inyectado en el controlador.
```
function ServicioDatosMundos() {
  return {
    obtenerMundos: function () {
      return ["este mundo", "otro mundo"];
    }
  };
}
```

### Controlador: ControladorDemo

Usa el servicio para construir un array de mensajes:
```
function ControladorDemo(servicioMundos) {
  var vm = this;
  vm.mensajes = servicioMundos.obtenerMundos().map(function (m) {
    return "Hola, " + m + "!";
  });
}
```

Se usa el patrón controller as vm para evitar $scope.

vm es alias de view model.

### Método .run()

Se ejecuta al iniciar la aplicación. Muestra un mensaje con alert y cambia el valor de $rootScope.yaInicio.
```
function alIniciar($rootScope, $window) {
  $window.alert("¡Hola usuario! Cargando mundos...");
  $rootScope.yaInicio = true;
}
```
### ng-class="{ 'iniciado': yaInicio }"

Añade dinámicamente la clase iniciado al body si $rootScope.yaInicio es verdadero.

### ng-cloak

Evita que se muestre {{mensaje}} antes de que AngularJS lo compile (muy útil para evitar parpadeos de contenido).

### ng-repeat="mensaje in vm.mensajes"

Itera sobre el array de mensajes y los muestra como lista.

### Resultado final esperado

- Se muestra un alert al cargar la página.

- Se muestra una lista con:

	- Hola, este mundo!

	- Hola, otro mundo!

- El fondo se pone dorado por la clase .iniciado.

### Conclusión

Este ejemplo incluye muchas características clave de AngularJS:

* Módulos

* Servicios

* Controladores

* Inyección de dependencias

* Directivas: ng-app, ng-controller, ng-repeat, ng-class, ng-cloak

* Bootstrap automático y eventos de inicio

## PRÁCTICA 1.2 – App AngularJS con servicios, controlador y estilos dinámicos

### Objetivo:

-Crear una app AngularJS completa usando:

-Módulo personalizado
-Servicio
-Controlador (controller as)
-Métodos .config() y .run()
-Directivas: ng-app, ng-controller, ng-class, ng-repeat, ng-cloak


# Capítulo 1.3 - La importancia del $scope

## ¿Qué es `$scope` en AngularJS?

En AngularJS, el `$scope` es **un objeto especial** que actúa como el **puente entre el controlador y la vista (HTML)**. 
Se utiliza para almacenar datos y funciones que pueden ser accedidas desde la interfaz.

Cuando Angular compila la página, crea una jerarquía de scopes que están conectados entre sí como una cadena de herencia (prototype chain).

---

## ¿Dónde vive una variable como `{{ nombre }}`?

Si tienes el siguiente código:

```html
<div ng-app="miApp">
  <h1>Hola {{ nombre }}</h1>
</div>
```
Y defines el módulo así:

```
angular.module("miApp", [])
  .run(function($rootScope) {
    $rootScope.nombre = "Mundo!";
  });
```

Angular crea una instancia global de $rootScope y le agrega la propiedad nombre.
Esto es funcional, pero no recomendado porque estás llenando el scope global.

### Scope local con controlador
Es mejor definir un scope local con un controlador:

```
<div ng-app="miApp">
  <div ng-controller="MiControlador">
    <h1>Hola {{ nombre }}</h1>
  </div>
</div>
```

```
angular.module("miApp", [])
  .controller("MiControlador", function($scope) {
    $scope.nombre = "Mr. Local";
  });
```
  
En este caso, Angular crea un nuevo scope hijo para el controlador y coloca la propiedad nombre allí. 
Esta propiedad solo está disponible dentro del div que usa ese controlador.


### Relación entre $rootScope y $scope
$scope hereda de $rootScope.

Angular utiliza herencia prototípica, por lo tanto si una variable no está en el $scope, la busca en $rootScope.

Ejemplo:

```
angular.module("miApp", [])
  .run(function($rootScope) {
    $rootScope.saludo = "Hola desde root";
  })
  .controller("MiControlador", function($scope) {
    $scope.nombre = "Usuario";
  });
```
  
En la vista puedes usar:

```
<p>{{ saludo }}</p> <!-- viene de $rootScope -->
<p>{{ nombre }}</p> <!-- viene del $scope del controlador -->
```

### Buenas prácticas

- Evita usar $rootScope para pasar datos entre controladores.

- Usa $scope local o servicios para compartir datos.

- Usa la sintaxis controller as y evita $scope si es posible (más común en Angular moderno).

### Importante sobre la herencia
Puedes tener scopes anidados y heredar propiedades, pero si una propiedad primitiva (string, number) es modificada en un scope hijo, no afecta al padre. Esto se llama shadowing.

```
<div ng-controller="PadreCtrl">
  <input ng-model="mensaje"> <!-- mensaje del padre -->

  <div ng-controller="HijoCtrl">
    <input ng-model="mensaje"> <!-- shadow: crea otro mensaje -->
  </div>
</div>
```

```
$scope.mensaje = "Hola desde el padre";
```

En el hijo, si escribes algo, no cambia el mensaje del padre, a menos que trabajes con objetos compartidos:

```
$scope.datos = { mensaje: "Hola compartido" };
```

### Conclusión
- $scope es el puente entre JS y HTML.

- Se hereda jerárquicamente.

- $rootScope está en la cima de la cadena.

- Prefiere scopes locales o controller as.

- Usa servicios para compartir datos entre controladores.


## PRÁCTICA 0.2 – Explorando $scope y $rootScope en AngularJS

Objetivos:

- Comprender la diferencia entre $rootScope y $scope

- Ver cómo funciona la herencia de scopes

- Observar el comportamiento de primitivas vs. objetos al ser modificados desde scopes hijos