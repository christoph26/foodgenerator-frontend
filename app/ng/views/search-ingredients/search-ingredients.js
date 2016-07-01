angular.module('foodGenerator.search.ingredients', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('search.ingredients', {
                parent: 'search',
                url: '/find-by-ingredients',
                views: {
                    "content": {
                        templateUrl: "views/search-ingredients/search-ingredients.html",
                        controller: 'SearchIngredientsCtrl'
                    }
                }
            })
    })

    .controller('SearchIngredientsCtrl', function ($scope, $http, BASEURL) {

        $scope.performIngredientSearch = function (ingredientsearchParameters, DTOWithFilters) {

            function calculateSearchedIngredientString(ingredients) {
                var ingredientString = ingredients[0].title;
                for (var i = 1; i < ingredients.length; i++) {
                    ingredientString += ", " + ingredients[i].title;
                }

                return ingredientString;
            }

            $scope.searchedIngredients = calculateSearchedIngredientString(ingredientsearchParameters);

            //Add ingredient search parameter to DTO
            DTOWithFilters.ingredients = ingredientsearchParameters.map(function (elem) {
                return elem._id
            });

            $http.post(BASEURL + '/search/ingredientsearch', DTOWithFilters).then(function (response) {

                //Arrange result data in order to display it in rows of four thumbnails.
                function listToMatrix(list, elementsPerSubArray) {
                    var matrix = [], i, k;

                    for (i = 0, k = -1; i < list.length; i++) {
                        if (i % elementsPerSubArray === 0) {
                            k++;
                            matrix[k] = [];
                        }

                        matrix[k].push(list[i]);
                    }
                    return matrix;
                }

                $scope.resultRows = listToMatrix(response.data, 4);


            }, function () {
                $scope.resultRows = [];
            });
        }
    })
;