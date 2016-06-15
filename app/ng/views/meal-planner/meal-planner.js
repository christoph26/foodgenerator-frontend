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
    })
;