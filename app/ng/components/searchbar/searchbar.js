'use strict';

angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '='
            },
            controller: function ($scope) {
                // do nothing yet
            }
        }
    })
;