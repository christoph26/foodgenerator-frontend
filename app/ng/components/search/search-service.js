(function () {

    angular.module('foodGenerator')
        .service('SearchService', searchService);

    function searchService(BASEURL, $http) {

        this.searchTerm = "";
        this.vegan = false;
        this.vegetarian = false;
        this.effortLow = false;
        this.effortMedium = false;
        this.effortHigh = false;
        this.supermarketFilter = [];
        
        
        this.performRecipeSearch = performRecipeSearch;
        this.performIngredientAutocomplete = performIngredientAutocomplete;


        function performRecipeSearch() {

            var searchDirectRecipes = this.vegan || this.vegetarian || this.effortLow || this.effortMedium || this.effortHigh || (this.supermarketFilter.length > 0);
            var searchDTO = {
                searchText: this.searchTerm,
                searchDirectRecipes: searchDirectRecipes,
                supermarketFilter: this.supermarketFilter,
                vegan: this.vegan,
                vegetarian: this.vegetarian,
                effortLow: this.effortLow,
                effortMedium: this.effortMedium,
                effortHigh: this.effortHigh
            };
            return $http.post(BASEURL + '/search/recipesearch', searchDTO);
        }

        function performIngredientAutocomplete(autocompleteDTO) {
            return $http.post(BASEURL + '/ingredients', autocompleteDTO);
        }

    }

})();
