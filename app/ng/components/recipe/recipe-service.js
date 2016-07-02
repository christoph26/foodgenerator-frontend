(function () {

    angular.module('foodGenerator')
        .service('recipeService', recipeService);

    function recipeService(BASEURL, $http) {

        this.get = getRecipe;
        this.getVariations = getVariations;

        ////////////////

        function getRecipe(recipeId) {
            console.log("Loading recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/' + recipeId);
        }

        function getVariations(recipeId) {
            console.log("Loading variations for recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/recipeFamily/' + recipeId);
        }

    }

})();
