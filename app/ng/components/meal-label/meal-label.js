angular.module('foodGenerator')
    .directive('meallabel', function () {
        return {
            restrict: "E",
            templateUrl: "components/meal-label/meal-label.html",
            scope: {
                recipe: '=',
                removable: '<',
                removeCallback: '<'
            }
        }
    })
;