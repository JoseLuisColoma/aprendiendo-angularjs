angular.module("miApp", [])
    .run(function ($rootScope) {
        $rootScope.mensajeGlobal = "¡Hola desde $rootScope!";
    })
    .controller("PadreCtrl", function ($scope) {
        $scope.primitiva = "Texto del padre";
        $scope.datos = { objeto: "Valor original" };
    })
    .controller("HijoCtrl", function ($scope) {
        // No se define nada, el hijo hereda de su padre
    });
