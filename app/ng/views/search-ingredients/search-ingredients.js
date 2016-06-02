angular.module('foodGenerator.searchIngredients', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('searchIngredients', {
                parent: 'root',
                url: '/find-by-ingredients',
                views: {
                    "content": {
                        templateUrl: "views/search-ingredients/search-ingredients.html",
                        controller: 'SearchIngredientsCtrl'
                    }
                }
            })
    })

    .controller('SearchIngredientsCtrl', function ($scope) {
        $scope.exampleField = "Hello World!";
    })
;