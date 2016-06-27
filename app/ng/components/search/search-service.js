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

        this.ingredientSearchList = [];
        
        
        this.performRecipeSearch = performRecipeSearch;
        this.performIngredientSearch = performIngredientSearch;
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

        function performIngredientSearch() {

            debugger;
            var ingredientSearchIdList = this.ingredientSearchList.map(function (elem) {
                return elem._id
            });

            var searchDTO = {
                ingredients: ingredientSearchIdList,
                supermarketFilter: this.supermarketFilter,
                vegan: this.vegan,
                vegetarian: this.vegetarian,
                effortLow: this.effortLow,
                effortMedium: this.effortMedium,
                effortHigh: this.effortHigh
            };
            return $http.post(BASEURL + '/search/ingredientsearch', searchDTO);
        }
    }

})();
