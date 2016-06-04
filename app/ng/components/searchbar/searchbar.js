angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '<',               // read-only access to the bartype html attribute
                myDirectiveVar: '=',        // read and write access to the myDirectiveVar html attribute
                searchTerm: '='             // read and write access to the searchTerm html attribute
            },
            controller: function ($scope, $state, Supermarket) {
                console.debug($scope);

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
