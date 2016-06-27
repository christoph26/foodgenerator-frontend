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

        $scope.performIngSearch = function (searchDTO) {
            debugger;
            $scope.searchedIngredients = searchDTO.ingredients;
            searchDTO.ingredients = $scope.searchedIngredients.map(function (elem) {
                return elem._id
            });

            $http.post('http://127.0.0.1:3000/search/ingredientsearch', searchDTO).then(function (response) {
                debugger;
                $scope.resultsList = response.data;
            }, function () {
                $scope.resultsList = [];
            });
        }
    })
;