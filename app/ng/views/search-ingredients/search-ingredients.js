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

    .controller('SearchIngredientsCtrl', function ($scope, SearchService) {


        SearchService.performIngredientSearch().then(function (response) {
            $scope.resultsList = response.data;
            debugger;
            $scope.searchedingredients = SearchService.ingredientSearchList;
        }, function () {
            $scope.resultsList = [];
            debugger;
            $scope.ingredientSearchList = SearchService.ingredientSearchList;
        });
    })
;