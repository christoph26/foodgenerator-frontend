(function () {

    angular.module('foodGenerator')
        .service('recipeStorageService', recipeStorageService);

    function recipeStorageService() {

        this.addMarkedRecipe = addMarkedRecipe;
        this.removeMarkedRecipe = removeMarkedRecipe;
        this.addRecentlyViewedRecipe = addRecentlyViewedRecipe;

        ////////////////

        function addMarkedRecipe(recipe) {
            console.log("Adding recipe '" + recipe.title + "' to marked recipes.");
            // TODO implement
        }

        function removeMarkedRecipe(recipe) {
            console.log("Removed recipe '" + recipe.title + "' from marked recipes.");
            // TODO implement
        }

        function addRecentlyViewedRecipe(recipe) {
            console.log("Registering new view for recipe '" + recipe.title + "'.")
            // TODO implement
        }

    }

})();
