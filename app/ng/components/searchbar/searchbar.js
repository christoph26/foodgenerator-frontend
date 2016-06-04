'use strict';

angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '='
            },
            controller: function ($scope, Supermarket) {
                $scope.supermarkets = Supermarket.query();

                $scope.expanded = "down";

                $scope.adjustGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";
                    } else {
                        $scope.expanded = "down";
                    }
                }

            }
        }
    })
;