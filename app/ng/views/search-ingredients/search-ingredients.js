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

    .controller('SearchIngredientsCtrl', function ($scope, $http) {

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

            $http.post('http://127.0.0.1:3000/search/ingredientsearch', DTOWithFilters).then(function (response) {
                $scope.resultsList = response.data;
            }, function () {
                $scope.resultsList = [];
            });
        }
    })
;