angular.module('foodGenerator')
    .directive('recipethumbnail', function () {
        return {
            restrict: "E",
            templateUrl: "components/recipe-thumbnail/recipe-thumbnail.html",
            scope: {
                recipe: '='
            },
            controller: function ($scope, $state, SearchService, Supermarket) {
                $scope.generateMissingIngredientsString = function (ingredientList) {
                    debugger;
                    if (ingredientList.length == 0) {
                        return "";
                    }
                    var missingIngredientsstring = ingredientList[0].title;

                    for (var i = 1; i < ingredientList.length; i++) {
                        missingIngredientsstring += ', ' + ingredientList[i].title;
                    }

                    return missingIngredientsstring;

                };
            }
        }
    })
;