angular.module('foodGenerator.recipeDetail', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('recipeDetail', {
                parent: 'root',
                url: '/recipeDetail',
                views: {
                    "content": {
                        templateUrl: "views/recipe-details/recipe-details.html",
                        controller: 'RecipeDetailCtrl'
                    }
                }
            })
    })

    .controller('RecipeDetailCtrl', function ($scope, $http, recipeStorageService, BASEURL) {
        $scope.person = 1;
        $scope.recipe = exampleRecipe;

        if ($scope.recipe != undefined) {
            $http.get(BASEURL + '/recipes/recipeFamily/' + $scope.recipe._id).then(function (response) {
                $scope.recipeVariations = response.data;
            }, function () {
                $scope.recipeVariations = [];
            });
        }

        $scope.addToMealPlanner = addToMealPlanner;
        $scope.addToShoppingList = addToShoppingList;

        //////////////////////

        function addToMealPlanner(recipe) {
            recipeStorageService.addMarkedRecipe(recipe);
            // TODO disable button and signalize success
        }

        function addToShoppingList(recipe) {
            recipeStorageService.addToShoppingList(recipe);
            // TODO disable button and signalize success
        }

    })
;

var exampleRecipe = {
    "_id": "333300000000000000000001",
    "title": "Spaghetti Bolognese Classic",
    "effort": 1,
    "description": "Preperation is simple and done in 30 minutes.",
    "vegan": false,
    "vegetarian": true,
    "wallpicture": "img/recipes/avocado-salad-wall.jpg",
    "picture": "img/recipes/spaghetti-bolognese-classic.jpg",
    "ingredientList": [
        {
            "_id": "111100000000000000000001",
            "title": "Minced Meat",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000001",
                "888800000000000000000002",
                "888800000000000000000003"
            ]
        },
        {
            "_id": "111100000000000000000002",
            "title": "Tomato",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000001",
                "888800000000000000000002",
                "888800000000000000000003"
            ]
        },
        {
            "_id": "111100000000000000000003",
            "title": "Onion",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000001",
                "888800000000000000000002",
                "888800000000000000000003"
            ]
        },
        {
            "_id": "111100000000000000000004",
            "title": "Garlic",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000001",
                "888800000000000000000002",
                "888800000000000000000003"
            ]
        },
        {
            "_id": "111100000000000000000005",
            "title": "Oregano",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000003"
            ]
        },
        {
            "_id": "111100000000000000000006",
            "title": "Spaghetti",
            "amount": 250,
            "unit": "g",
            "supermarkets": [
                "888800000000000000000001",
                "888800000000000000000002",
                "888800000000000000000003"
            ]
        }
    ],
    "recipeFamily": "444400000000000000000001",
    "availability": [
        {
            "_id": "888800000000000000000003",
            "title": "REAL",
            "icon": "http://static05.kaufda.de/Geschaefte/Real.v1111.png"
        }
    ]
};