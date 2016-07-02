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

                if ($scope.bartype == 'recipes') {
                    //Properties of recipe search
                    $scope.recipeSearchBarInput = SearchService.searchTermRecipe;
                    $scope.vegan = SearchService.veganRecipe;
                    $scope.vegetarian = SearchService.vegetarianRecipe;
                    $scope.effortLow = SearchService.effortLowRecipe;
                    $scope.effortMedium = SearchService.effortMediumRecipe;
                    $scope.effortHigh = SearchService.effortHighRecipe;
                    $scope.supermarketFilter = SearchService.supermarketFilterRecipe;
                } else if ($scope.bartype == 'ingredients') {
                    //Properties of ingredient search
                    $scope.ingredientSearchBarInput = SearchService.searchTermIngredient;
                    $scope.vegan = SearchService.veganIngredient;
                    $scope.vegetarian = SearchService.vegetarianIngredient;
                    $scope.effortLow = SearchService.effortLowIngredient;
                    $scope.effortMedium = SearchService.effortMediumIngredient;
                    $scope.effortHigh = SearchService.effortHighIngredient;
                    $scope.supermarketFilter = SearchService.supermarketFilterIngredient;
                }


                $scope.updateGlyphicon = function () {
                    if ($scope.expanded == "down") {
                        $scope.expanded = "up";     // let glyphicon point upwards if options are displayed
                    } else {
                        $scope.expanded = "down";   // let glyphicon point downwards if options are hidden
                    }
                };

                $scope.setTermAndPerformRecipeSearch = function () {
                    // propagate the current search term to the search service
                    SearchService.searchTermRecipe = this.recipeSearchBarInput;
                    SearchService.veganRecipe = this.vegan;
                    SearchService.vegetarianRecipe = this.vegetarian;
                    SearchService.effortLowRecipe = this.effortLow;
                    SearchService.effortMediumRecipe = this.effortMedium;
                    SearchService.effortHighRecipe = this.effortHigh;
                    SearchService.supermarketFilterRecipe = this.supermarketFilter;

                    // redirect the user to the search results page
                    if ($state.current.name == 'search.recipes') {
                        $state.go($state.current.name, $state.params, {reload: true});
                    } else {
                        $state.go('search.recipes');
                    }
                };

                $scope.setTermAndPerformIngredientSearch = function () {

                    //Go through ingredientSearchBar and add all tags, which are added without the autocomplete feature (and thus are no valid ingredients)
                    for (var i = 0; i < this.ingredientSearchBarInput.length; i++) {
                        if (!this.ingredientSearchBarInput[i]._id) {
                            this.ingredientSearchBarInput.splice(i, i + 1)
                        }
                    }

                    SearchService.searchTermIngredient = this.ingredientSearchBarInput;
                    SearchService.veganIngredient = this.vegan;
                    SearchService.vegetarianIngredient = this.vegetarian;
                    SearchService.effortLowIngredient = this.effortLow;
                    SearchService.effortMediumIngredient = this.effortMedium;
                    SearchService.effortHighIngredient = this.effortHigh;
                    SearchService.supermarketFilterIngredient = this.supermarketFilter;

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
                        this.supermarketFilter.splice(this.supermarketFilter.indexOf(id), 1);
                    } else {
                        this.supermarketFilter.push(id);
                    }
                    SearchService.supermarketFilterRecipe;
                    SearchService.supermarketFilterIngredient;
                };

                $scope.checkImgClass = function (id) {
                    if (this.supermarketFilter.indexOf(id) >= 0) {
                        return "searchbarsupermarket";
                    } else {
                        return "searchbarsupermarket picture-grayscale";
                    }
                };

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
