'use strict';

angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            controller: function ($scope) {
                $scope.searchbar = "SEARCHBAR!";
            }
        }
    })
;