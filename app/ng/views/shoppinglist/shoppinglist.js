angular.module('foodGenerator.shoppingList', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('shoppingList', {
                parent: 'root',
                url: '/shoppinglist',
                views: {
                    "content": {
                        templateUrl: "views/shoppinglist/shoppinglist.html",
                        controller: 'ShoppingListCtrl'
                    }
                }
            })
    })

    .controller('ShoppingListCtrl', function ($scope, recipeStorageService) {
        $scope.shoppingListRecipes = recipeStorageService.getShoppingListRecipes();
    })
;