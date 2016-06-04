'use strict';

angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            bindings: {
                bartype: '<',               // read-only access to the bartype html attribute
                searchTerm: '<',            // read-only access to the searchTerm html attribute
                onSearchTermChange: '&'     // write-only access to the onSearchTermChange html attribute
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

                $scope.setTermAndPerformSearch = function () {
                    // propagate the current search term to the parent component
                    $scope.onSearchTermChange({$event: {searchTerm: $scope.searchTerm}});
                    // redirect the user to the search results page
                    //TODO implement redirection
                    console.log("Would now redirect to results page.");
                };
            }
        }
    })
;