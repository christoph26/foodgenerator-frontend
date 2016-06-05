angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '<'               // read-only access to the bartype html attribute
            },
            controller: function ($scope, $state, SearchService, Supermarket) {
                $scope.supermarkets = Supermarket.query();
                $scope.expanded = "down";

                //Input values:
                $scope.searchBarInput = SearchService.searchTerm;
                $scope.vegan = SearchService.vegan;
                $scope.vegetarian = SearchService.vegetarian;
                $scope.effortLow = SearchService.effortLow;
                $scope.effortMedium = SearchService.effortMedium;
                $scope.effortHigh = SearchService.effortHigh;
                $scope.supermarketFilter = SearchService.supermarketFilter;

                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                };

                $scope.setTermAndPerformSearch = function () {
                    // propagate the current search term to the search service
                    SearchService.searchTerm = this.searchBarInput;
                    SearchService.vegan = this.vegan;
                    SearchService.vegetarian = this.vegetarian;
                    SearchService.effortLow = this.effortLow;
                    SearchService.effortMedium = this.effortMedium;
                    SearchService.effortHigh = this.effortHigh;
                    SearchService.supermarketFilter = this.supermarketFilter;

                    // redirect the user to the search results page
                    if ($state.current.name == 'search.results') {
                        $state.go($state.current.name, $state.params, {reload: true});
                    } else {
                        $state.go('search.results');
                    }
                };

                $scope.clickSupermarket = function (id) {
                    if (this.supermarketFilter.indexOf(id) >= 0) {
                        $("img[name=" + id + "]").toggleClass("searchbarsupermarket");
                        this.supermarketFilter.splice(this.supermarketFilter.indexOf(id), 1);
                    } else {
                        var x = $("img[name=" + id + "]");
                        $("img[name=" + id + "]").toggleClass("searchbarsupermarket");
                        this.supermarketFilter.push(id);
                    }


                };

                $scope.checkImgClass = function (id) {
                    if (this.supermarketFilter.indexOf(id) >= 0) {
                        return "";
                    } else {
                        return "searchbarsupermarket";
                    }
                }
            }
        }
    })
;
