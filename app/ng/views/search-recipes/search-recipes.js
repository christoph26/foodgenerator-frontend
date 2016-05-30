'use strict';

angular.module('foodGenerator.searchRecipes', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('searchRecipes', {
                parent: 'root',
                url: '/find-recipes',
                views: {
                    "content": {
                        templateUrl: "views/search-recipes/search-recipes.html",
                        controller: 'RecipeCtrl'
                    }
                }
            })
    })

    .controller('RecipeCtrl', function ($scope) {
        $scope.exampleField = "dummyValue";
    })
;