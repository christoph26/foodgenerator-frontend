angular.module('foodGenerator')
    .directive('recipethumbnail', function () {
        return {
            restrict: "E",
            templateUrl: "components/recipe-thumbnail/recipe-thumbnail.html",
            controller: function ($scope) {
                $scope.exampleField = "Hello World!";
            }
        }
    })
;