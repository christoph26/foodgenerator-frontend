(function () {

    angular.module('foodGenerator')
        .service('recipeService', recipeService);

    function recipeService(BASEURL, $http) {

        this.get = getRecipe;

        ////////////////

        function getRecipe(recipeId) {
            console.log("Loading recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/' + recipeId);
        }

    }

})();
