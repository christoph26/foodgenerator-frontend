angular.module('foodGenerator')
    .directive('recipethumbnail', function () {
        return {
            restrict: "E",
            templateUrl: "components/recipe-thumbnail/recipe-thumbnail.html",
            scope: {
                recipe: '='
            }
        }
    })
;