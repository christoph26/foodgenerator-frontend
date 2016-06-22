angular.module('foodGenerator.recipeDetail', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('recipeDetail', {
                parent: 'root',
                url: '/recipeDetail',
                views: {
                    "content": {
                        templateUrl: "views/recipe-details/recipe-details.html",
                        controller: 'RecipeCtrl'
                    }
                }
            })
    })

    .controller('RecipeDetailCtrl', function ($scope) {
        $scope.recipe =

        {
            "_id": "333300000000000000000001",
            "title": "Spaghetti Bolognese Classic",
            "effort": 1,
            "description": "Preperation is simple and done in 30 minutes.",
            "vegan": false,
            "vegetarian": false,
            "picture": "img/recipes/spaghetti-bolognese-classic.jpg",
            "ingredientList": [
                {
                    "_id": "111100000000000000000001",
                    "title": "Minced Meat",
                    "supermarkets": [
                        "888800000000000000000001",
                        "888800000000000000000002",
                        "888800000000000000000003"
                    ]
                },
                {
                    "_id": "111100000000000000000002",
                    "title": "Tomato",
                    "supermarkets": [
                        "888800000000000000000001",
                        "888800000000000000000002",
                        "888800000000000000000003"
                    ]
                },
                {
                    "_id": "111100000000000000000003",
                    "title": "Onion",
                    "supermarkets": [
                        "888800000000000000000001",
                        "888800000000000000000002",
                        "888800000000000000000003"
                    ]
                },
                {
                    "_id": "111100000000000000000004",
                    "title": "Garlic",
                    "supermarkets": [
                        "888800000000000000000001",
                        "888800000000000000000002",
                        "888800000000000000000003"
                    ]
                },
                {
                    "_id": "111100000000000000000005",
                    "title": "Oregano",
                    "supermarkets": [
                        "888800000000000000000003"
                    ]
                },
                {
                    "_id": "111100000000000000000006",
                    "title": "Spaghetti",
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
        }
    })
;