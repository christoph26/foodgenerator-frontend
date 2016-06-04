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

                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                }

            }
        }
    })
;