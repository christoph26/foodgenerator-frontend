angular.module('foodGenerator.search.recipes', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('search.recipes', {
                parent: 'search',
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
    })
;
