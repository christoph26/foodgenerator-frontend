angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            bindings: {
                bartype: '<',               // read-only access to the bartype html attribute
                searchTerm: '<',            // read-only access to the searchTerm html attribute
                updateSearchTerm: '&'     // write-only access to the updateSearchTerm html attribute
            },
            controller: function ($scope, $state, Supermarket) {
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
                    console.log("performing search for search term: " + $scope.searchTerm);
                    // propagate the current search term to the parent component
                    // $scope.updateSearchTerm({$event: {searchTerm: $scope.searchTerm}});
                    // redirect the user to the search results page
                    $state.go('search.results');
                };
            }
        }
    })
;