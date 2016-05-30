angular.module('foodGenerator')
    .directive('recipeoverview', function () {
        return {
            restrict: "E",
            templateUrl: "components/recipe-overview/recipe-overview.html",
            controller: function ($scope) {
                $scope.exampleField = "Hello World!";
            }
        }
    })
;