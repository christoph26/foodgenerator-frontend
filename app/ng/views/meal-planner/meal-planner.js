angular.module('foodGenerator.mealPlanner', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('mealPlanner', {
                parent: 'root',
                url: '/meal-planner',
                views: {
                    "content": {
                        templateUrl: "views/meal-planner/meal-planner.html",
                        controller: 'MealPlannerCtrl'
                    }
                }
            })
    })

    .controller('MealPlannerCtrl', function ($scope) {
        $scope.exampleField = "Hello World!";
        $scope.mealPlan = {};
        $scope.markedRecipes = markedExampleRecipes;
        $scope.recentRecipes = viewedExampleRecipes;
    })
;

var markedExampleRecipes = [
    {
        "_id": "333300000000000000000001",
        "title": "Spaghetti Bolognese Classic",
        "effort": 1,
        "description": "Preperation is simple and done in 30 minutes.",
        "vegan": false,
        "vegetarian": false,
        "picture": "img/recipes/spaghetti-bolognese-classic.jpg",
        "ingredientList": "222200000000000000000001",
        "recipeFamily": "444400000000000000000001"
    },
    {
        "_id": "333300000000000000000002",
        "title": "Rammstein Spaghetti Bolognese",
        "effort": 3,
        "description": "HOT as Hell.",
        "vegan": false,
        "vegetarian": false,
        "picture": "img/recipes/spaghetti-bolognese-rammstein.jpg",
        "ingredientList": "222200000000000000000002",
        "recipeFamily": "444400000000000000000001"
    }
];

var viewedExampleRecipes = [
    {
        "_id": "333300000000000000000003",
        "title": "Chili Con Carne",
        "effort": 1,
        "description": "Hot & Spicy",
        "vegan": false,
        "vegetarian": false,
        "picture": "img/recipes/chili-con-carne.jpg",
        "ingredientList": "222200000000000000000003",
        "recipeFamily": "444400000000000000000002"
    },
    {
        "_id": "333300000000000000000004",
        "title": "Avocado Salad",
        "effort": 1,
        "description": "Delicious Healthy Salat for Vegan People",
        "vegan": true,
        "vegetarian": true,
        "picture": "img/recipes/avocado-salad.jpg",
        "ingredientList": "222200000000000000000004",
        "recipeFamily": "444400000000000000000003"
    },
    {
        "_id": "333300000000000000000005",
        "title": "Avocado Salad Feta",
        "effort": 1,
        "description": "Delicious Healthy Salat for Vegetarian People",
        "vegan": false,
        "vegetarian": true,
        "picture": "img/recipes/avocado-salad-feta.jpg",
        "ingredientList": "222200000000000000000005",
        "recipeFamily": "444400000000000000000003"
    }
];