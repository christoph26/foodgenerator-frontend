angular.module('foodGenerator')
    .directive('meallist', function () {
        return {
            restrict: "E",
            templateUrl: "components/meal-list/meal-list.html",
            scope: {
                mealList: '='
            }
        }
    })
;