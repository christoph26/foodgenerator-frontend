angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '<'               // read-only access to the bartype html attribute
            },
            controller: function ($scope, $state, SearchService, Supermarket) {

                var searchBarInput = SearchService.searchTerm;
                $scope.supermarkets = Supermarket.query();
                $scope.expanded = "down";
                $scope.searchBarInput = searchBarInput;

                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                };

                $scope.setTermAndPerformSearch = function () {
                    var searchTerm = this.searchBarInput;
                    if (searchTerm == undefined) {
                        searchTerm = "";
                    }
                    // propagate the current search term to the search service
                    SearchService.setSearchTerm(searchTerm);
                    // redirect the user to the search results page
                    $state.go('search.results');
                };
            }
        }
    })
;
