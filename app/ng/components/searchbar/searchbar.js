angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '<',               // read-only access to the bartype html attribute
                searchTerm: '='             // read and write access to the searchTerm html attribute
            },
            controller: function ($scope, $state, SearchService, Supermarket) {
                $scope.supermarkets = Supermarket.query();
                $scope.expanded = "down";

                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                };

                $scope.setTermAndPerformSearch = function () {
                    if ($scope.searchTerm == undefined) {
                        $scope.searchTerm = "";
                    }
                    console.log("performing search for search term: " + $scope.searchTerm);
                    // propagate the current search term to the search service
                    SearchService.setSearchTerm($scope.searchTerm);
                    // redirect the user to the search results page
                    $state.go('search.results');
                };
            }
        }
    })
;
