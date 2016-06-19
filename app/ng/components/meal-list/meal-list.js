angular.module('foodGenerator')
    .directive('meallist', function () {
        return {
            restrict: "E",
            templateUrl: "components/meal-list/meal-list.html",
            controller: "MealListCtrl",
            scope: {
                mealList: '='
            }
        }
    })

    .controller("MealListCtrl", function ($scope) {
        $scope.updateMealOrder = function () {
            // update order numbers after inserting element and reordering list
            for (var index in $scope.mealList.meals) {
                $scope.mealList.meals[index].order = index;
            }
        }
    })
;