(function () {

    angular.module('foodGenerator')
        .service('recipeService', mealPlanService);

    function mealPlanService(BASEURL, $http) {

        this.get = getRecipe;

        ////////////////

        function getRecipe(recipeId) {
            console.log("Loading recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/' + recipeId);
        }

    }

})();
