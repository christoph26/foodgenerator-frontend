(function () {

    angular.module('foodGenerator')
        .service('SearchService', searchService);

    function searchService(BASEURL, $http) {

        this.searchTermRecipe = "";
        this.veganRecipe = "false";
        this.vegetarianRecipe = "false";
        this.effortLowRecipe = "false";
        this.effortMediumRecipe = "false";
        this.effortHighRecipe = "false";
        this.supermarketFilterRecipe = [];

        this.searchTermIngredient = [];
        this.veganIngredient = "false";
        this.vegetarianIngredient = "false";
        this.effortLowIngredient = "false";
        this.effortMediumIngredient = "false";
        this.effortHighIngredient = "false";
        this.supermarketFilterIngredient = [];

        this.ingredientSearchList = [];
        
        
        this.performRecipeSearch = performRecipeSearch;
        this.performIngredientAutocomplete = performIngredientAutocomplete;


        function performRecipeSearch() {
            var searchDirectRecipes = this.veganRecipe || this.vegetarianRecipe || this.effortLowRecipe || this.effortMediumRecipe || this.effortHighRecipe || (this.supermarketFilterRecipe.length > 0);
            var searchDTO = {
                searchText: this.searchTermRecipe,
                searchDirectRecipes: searchDirectRecipes,
                supermarketFilter: this.supermarketFilterRecipe,
                vegan: this.veganRecipe,
                vegetarian: this.vegetarianRecipe,
                effortLow: this.effortLowRecipe,
                effortMedium: this.effortMediumRecipe,
                effortHigh: this.effortHighRecipe
            };
            return $http.post(BASEURL + '/search/recipesearch', searchDTO);
        }

        function performIngredientAutocomplete(autocompleteDTO) {
            return $http.post(BASEURL + '/ingredients', autocompleteDTO);
        }
    }

})();
