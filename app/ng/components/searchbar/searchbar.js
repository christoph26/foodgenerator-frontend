'use strict';

angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            bindings: {
                bartype: '<',       // only read from the bartype property
                searchTerm: '='     // read from and write to the searchTerm property
            },
            controller: function ($scope, Supermarket) {
                $scope.supermarkets = Supermarket.query();
                $scope.expanded = "down";
                $scope.searchTerm = "";

                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                };

                $scope.performSearch = function () {
                    //TODO make sure searchTerm was updated and open the results page
                }
            }
        }
    })
;