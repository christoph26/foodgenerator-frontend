angular.module('foodGenerator')
    .directive('searchbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/searchbar/searchbar.html",
            scope: {
                bartype: '@'               // the evaluated value in the attribute 'bartype' is bound into the scope as String
            },
            controller: function ($scope, $state, SearchService, Supermarket) {
                $scope.supermarkets = Supermarket.query();
                $scope.expanded = "down";

                //Input of recipe search:
                $scope.recipeSearchBarInput = SearchService.searchTerm;

                //Input of ingredient search
                $scope.ingredientSearchBarInput = [];

                //Filter properties
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

                $scope.setTermAndPerformRecipeSearch = function () {
                    // propagate the current search term to the search service
                    SearchService.searchTerm = this.recipeSearchBarInput;
                    SearchService.vegan = this.vegan;
                    SearchService.vegetarian = this.vegetarian;
                    SearchService.effortLow = this.effortLow;
                    SearchService.effortMedium = this.effortMedium;
                    SearchService.effortHigh = this.effortHigh;
                    SearchService.supermarketFilter = this.supermarketFilter;

                    // redirect the user to the search results page
                    if ($state.current.name == 'search.recipes') {
                        $state.go($state.current.name, $state.params, {reload: true});
                    } else {
                        $state.go('search.recipes');
                    }
                };

                $scope.setTermAndPerformIngredientSearch = function () {
                    if (this.ingredientSearchBarInput && this.ingredientSearchBarInput.length > 0) {
                        var searchParameter = this.ingredientSearchBarInput;

                        var filterParameter = {
                            supermarketFilter: this.supermarketFilter,
                            vegan: this.vegan,
                            vegetarian: this.vegetarian,
                            effortLow: this.effortLow,
                            effortMedium: this.effortMedium,
                            effortHigh: this.effortHigh
                        };

                        //Calls method in search-ingredients-view to perform the search and display results.
                        this.$parent.$parent.$parent.performIngredientSearch(searchParameter, filterParameter);
                    }
                };

                $scope.clickSupermarket = function (id) {
                    if (this.supermarketFilter.indexOf(id) >= 0) {
                        $("img[name=" + id + "]").toggleClass("picture-grayscale");
                        this.supermarketFilter.splice(this.supermarketFilter.indexOf(id), 1);
                    } else {
                        var x = $("img[name=" + id + "]");
                        $("img[name=" + id + "]").toggleClass("picture-grayscale");
                        this.supermarketFilter.push(id);
                    }
                };

                $scope.checkImgClass = function (id) {
                    if (this.supermarketFilter.indexOf(id) >= 0) {
                        return "searchbarsupermarket";
                    } else {
                        return "searchbarsupermarket picture-grayscale";
                    }
                }

                $scope.loadIngredient = function (query) {

                    var autocompleteDTO = {
                        searchTerm: query
                    };
                    return SearchService.performIngredientAutocomplete(autocompleteDTO);
                }
            }
        }
    })
;
