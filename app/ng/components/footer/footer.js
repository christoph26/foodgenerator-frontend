angular.module('foodGenerator')
    .directive('appfooter', function () {
        return {
            restrict: "E",
            templateUrl: "components/footer/footer.html",
            controller: function ($scope) {
                $scope.exampleField = "Hello World!";
            }
        }
    })
;