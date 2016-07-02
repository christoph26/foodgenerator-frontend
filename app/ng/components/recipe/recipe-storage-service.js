(function () {

    angular.module('foodGenerator')
        .service('recipeStorageService', recipeStorageService);

    function recipeStorageService($window) {

        this.addMarkedRecipe = addMarkedRecipe;
        this.removeMarkedRecipe = removeMarkedRecipe;
        this.addRecentlyViewedRecipe = addRecentlyViewedRecipe;

        this.getMarkedRecipeIds = getMarkedRecipeIds;
        this.getRecentlyViewedRecipeIds = getRecentlyViewedRecipeIds;

        ////////////////

        function addMarkedRecipe(recipe) {
            console.log("Adding recipe '" + recipe.title + "' to marked recipes.");
            addRecipeToStorage(recipe, 'foodgenerator.recipes.marked');
        }

        function removeMarkedRecipe(recipe) {
            if (removeRecipeFromStorage(recipe, 'foodgenerator.recipes.marked')) {
                console.log("Removed recipe '" + recipe.title + "' from marked recipes.");
            } else {
                console.error("Could not remove recipe '" + recipe.title + "': not contained in marked recipe list.");
            }
        }

        function getMarkedRecipeIds() {
            return $window.localStorage['foodgenerator.recipes.marked'];
        }

        function addRecentlyViewedRecipe(recipe) {
            console.log("Registering new view for recipe '" + recipe.title + "'.");
            addRecipeToStorage(recipe, 'foodgenerator.recipes.recent');
        }

        function getRecentlyViewedRecipeIds() {
            return $window.localStorage['foodgenerator.recipes.recent'];
        }

        function addRecipeToStorage(recipe, storageName) {
            // in case it is contained, remove element from current position
            removeRecipeFromStorage(recipe, storageName);

            // put recipe to the top of the list
            var reorderedStorage = [recipe._id];                            // create a new list with the new recipe as only item
            reorderedStorage.append($window.localStorage[storageName]);     // append other recipes
            $window.localStorage[storageName] = reorderedStorage;
        }

        function removeRecipeFromStorage(recipe, storageName) {
            var recipeStorage = $window.localStorage[storageName];
            var recipeIndex = recipeStorage.indexOf(recipe._id);

            if (recipeIndex > -1) {
                recipeStorage.splice(recipeIndex, 1);
                return true;
            } else {
                return false;
            }
        }

    }

})();
