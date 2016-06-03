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
                $scope.expanded = "down";
                $scope.adustGlyphicon = function() {
                    if($scope.expanded == "down") {
                        $scope.expanded = "up";
                    } else {
                        $scope.expanded = "down";
                    }
                }
            }
        }
    })
;