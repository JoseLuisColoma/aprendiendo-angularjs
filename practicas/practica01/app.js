function ServicioMundos() {
  return {
    obtenerMundos: function () {
      return ['Tierra', 'Mercurio', 'Marte', 'Venus', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'];
    }
  };
}

function ControladorDemo(ServicioMundos) {
  this.mensajes = ServicioMundos.obtenerMundos().map(function (planeta) {
    return 'Saludos desde el planeta ' + planeta + '!';
  });
}

function alIniciar($rootScope, $window) {
  $window.alert("¡Hola usuario! Cargando mundos...");
  $rootScope.yaInicio = true;
}

angular.module('miAppDemo', [])
  .service('ServicioMundos', [ServicioMundos])
  .controller('ControladorDemo', ["ServicioMundos", ControladorDemo])
  .config(function () {
    console.log("Configurando la aplicación...");
  })
  .run(["$rootScope", "$window", alIniciar]);
