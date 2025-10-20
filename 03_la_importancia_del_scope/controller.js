angular.module('miAppDemo', [])
    .controller('ControladorDemo', function ($scope) {
        $scope.nombre = "Jose Luis";
    })
    .run(function ($rootScope) {
        $rootScope.saludo = "¡Hola desde el rootScope!";
    });