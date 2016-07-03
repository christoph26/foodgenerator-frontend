angular.module('foodGenerator.recipeDetail', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('recipeDetail', {
                parent: 'root',
                url: '/recipeDetail/{recipeId}',
                views: {
                    "content": {
                        templateUrl: "views/recipe-details/recipe-details.html",
                        controller: 'RecipeDetailCtrl'
                    }
                }
            })
    })

    .controller('RecipeDetailCtrl', function ($scope, $stateParams, $http, recipeStorageService, recipeService, BASEURL) {
        $scope.person = 1;

        if ($stateParams.recipeId) {
            recipeService.get($stateParams.recipeId).then(function (response) {
                // load the recipe itself
                $scope.recipe = response.data;

                // load the ingredient list
                $scope.recipe.ingredientList = recipeService.getIngredients($scope.recipe.ingredientList);

                // load the recipe variations
                recipeService.getVariations($scope.recipe._id).then(function (response) {
                    $scope.recipeVariations = response.data;
                }, function () {
                    $scope.recipeVariations = [];
                });

                // track that recipe was viewed
                recipeStorageService.addRecentlyViewedRecipe($scope.recipe);
            });
        }

        $scope.addToMealPlanner = addToMealPlanner;
        $scope.addToShoppingList = addToShoppingList;

        //////////////////////

        function addToMealPlanner(recipe) {
            recipeStorageService.addMarkedRecipe(recipe);
            // TODO disable button and signalize success
        }

        function addToShoppingList(recipe, personCount) {
            recipeStorageService.addToShoppingList(recipe, personCount);
            // TODO disable button and signalize success
        }

    })
;