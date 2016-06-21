angular.module('foodGenerator.recipe', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('recipe', {
                parent: 'root',
                url: '/recipe',
                views: {
                    "content": {
                        templateUrl: "views/recipe-details/recipe-details.html",
                        controller: 'RecipeCtrl'
                    }
                }
            })
    })

    .controller('RecipeCtrl', function ($scope) {
        //TODO: do something in cooperation with searchservice if "search ingredients" is clicked
    })
;