angular.module('foodGenerator.mealPlanner', ['ngResource', 'ui.router', 'dndLists'])

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

    .controller('MealPlannerCtrl', function ($scope, $filter) {
        $scope.mealPlan = exampleMealPlan;
        $scope.markedRecipes = markedExampleRecipes;
        $scope.recentRecipes = viewedExampleRecipes;

        $scope.addMealList = function () {
            var mealPlan = $scope.mealPlan;
            var newMealList = {
                title: calculateMealListTitle(mealPlan, $filter),
                order: mealPlan.mealLists.length,
                meals: []
            };
            mealPlan.mealLists.push(newMealList);
        };

        $scope.saveMealPlan = function () {
            
        };

        $scope.saveMealPlanAs = function () {

        };

        $scope.loadMealPlan = function () {

        };
    })
;

function calculateMealListTitle(mealPlan, $filter) {
    var mealLists = mealPlan.mealLists;
    var date = new Date();
    if (mealLists && mealLists.length) {
        // if the last item has a date as caption, increment it by one day
        var lastTitle = mealLists[mealLists.length - 1].title;
        if (parseDate(lastTitle)) {
            date = parseDate(lastTitle);
            date.setDate(date.getDate() + 1);
        }
    }
    return $filter('date')(date, 'dd.MM.yyyy');
}

function parseDate(dateString) {
    var date = dateString.split(".");
    if (date.length == 3) {
        var day = date[0];
        var month = date[1];
        var year = date[2];
        var dateStringISO = year + "-" + month + "-" + day;
        return new Date(dateStringISO);
    }
    return undefined;
}

var markedExampleRecipes = [
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

var exampleMealPlan = {
    title: "myTestPlan",
    mealLists: [{
        title: "24.06.2016",
        order: 0,
        meals: [{
            order: 0,
            recipe: {
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
        }, {
            order: 1,
            recipe: {
                "_id": "333300000000000000000001",
                "title": "Spaghetti Bolognese Classic",
                "effort": 1,
                "description": "Preperation is simple and done in 30 minutes.",
                "vegan": false,
                "vegetarian": false,
                "picture": "img/recipes/spaghetti-bolognese-classic.jpg",
                "ingredientList": "222200000000000000000001",
                "recipeFamily": "444400000000000000000001"
            }
        }]
    }, {
        title: "25.06.2016",
        order: 1,
        meals: [{
            order: 1,
            recipe: {
                "_id": "333300000000000000000003",
                "title": "Chili Con Carne",
                "effort": 1,
                "description": "Hot & Spicy",
                "vegan": false,
                "vegetarian": false,
                "picture": "img/recipes/chili-con-carne.jpg",
                "ingredientList": "222200000000000000000003",
                "recipeFamily": "444400000000000000000002"
            }
        }]
    }]
};