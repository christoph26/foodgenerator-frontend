angular.module('foodGenerator')
    .directive('meallist', function () {
        return {
            restrict: "E",
            templateUrl: "components/meal-list/meal-list.html",
            controller: "MealListCtrl",
            scope: {
                mealList: '=',
                removable: '<',
                removeCallback: '<'
            }
        }
    })

    .controller("MealListCtrl", function ($scope) {
        $scope.updateMealOrder = function () {
            // update order numbers after inserting element and reordering list
            for (var index in $scope.mealList.meals) {
                //noinspection JSUnfilteredForInLoop
                $scope.mealList.meals[index].order = index;
            }
        };

        $scope.removeLabelCallback = removeLabelCallback;

        function removeLabelCallback(recipe) {
            var mealIndex;
            for (var index in $scope.mealList.meals) {
                //noinspection JSUnfilteredForInLoop
                if ($scope.mealList.meals[index].recipe === recipe) {
                    mealIndex = index;
                }
            }
            if (mealIndex) {
                $scope.mealList.meals.splice(mealIndex, 1);
                $scope.updateMealOrder();
            }
        }
    })
;