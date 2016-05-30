angular.module('foodGenerator.searchRecipes', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('searchRecipes', {
                parent: 'root',
                url: '/find-recipes',
                views: {
                    "content": {
                        templateUrl: "views/search-recipes/search-recipes.html",
                        controller: 'SearchRecipesCtrl'
                    }
                }
            })
    })

    .controller('SearchRecipesCtrl', function ($scope) {
        $scope.exampleField = "dummyValue";
    })
;