(function () {

    angular.module('foodGenerator')
        .service('recipeStorageService', recipeStorageService);

    function recipeStorageService($window) {

        this.addMarkedRecipe = addMarkedRecipe;
        this.removeMarkedRecipe = removeMarkedRecipe;
        this.getMarkedRecipeIds = getMarkedRecipeIds;
        this.clearMarkedRecipes = clearMarkedRecipes;

        this.addRecentlyViewedRecipe = addRecentlyViewedRecipe;
        this.getRecentlyViewedRecipeIds = getRecentlyViewedRecipeIds;
        this.clearRecentlyViewedRecipes = clearRecentlyViewedRecipes;

        this.addToShoppingList = addToShoppingList;
        this.removeFromShoppingList = removeFromShoppingList;
        this.getShoppingList = getShoppingList;
        this.clearShoppingList = clearShoppingList;

        ////////////////

        // Marked Recipes

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

        function clearMarkedRecipes() {
            clearRecipeStorage('foodgenerator.recipes.marked');
        }

        // Recently Viewed Recipes

        function addRecentlyViewedRecipe(recipe) {
            console.log("Registering new view for recipe '" + recipe.title + "'.");
            addRecipeToStorage(recipe, 'foodgenerator.recipes.recent');
        }

        function getRecentlyViewedRecipeIds() {
            return $window.localStorage['foodgenerator.recipes.recent'];
        }

        function clearRecentlyViewedRecipes() {
            clearRecipeStorage('foodgenerator.recipes.marked');
        }

        // Shopping List

        function addToShoppingList(recipe) {
            console.log("Adding recipe '" + recipe.title + "' to shopping list.");
            addRecipeToStorage(recipe, 'foodgenerator.recipes.shopping');
        }

        function removeFromShoppingList(recipe) {
            if (removeRecipeFromStorage(recipe, 'foodgenerator.recipes.shopping')) {
                console.log("Removed recipe '" + recipe.title + "' from shopping list.");
            } else {
                console.error("Could not remove recipe '" + recipe.title + "': not contained in shopping list.");
            }
        }

        function getShoppingList() {
            return $window.localStorage['foodgenerator.recipes.shopping'];
        }

        function clearShoppingList() {
            clearRecipeStorage('foodgenerator.recipes.shopping');
        }

        // Generic Functions

        function addRecipeToStorage(recipe, storageName) {
            var recipeStorage = $window.localStorage[storageName];

            // in case it is contained, remove element from current position
            removeRecipeFromStorage(recipe, storageName);

            // create a new list with the new recipe as only item
            var reorderedStorage = [recipe._id];
            if (recipeStorage != undefined) {
                // append other recipes if defined
                reorderedStorage.append(recipeStorage);
            }
            $window.localStorage[storageName] = reorderedStorage;
        }

        function removeRecipeFromStorage(recipe, storageName) {
            var recipeStorage = $window.localStorage[storageName];
            if (recipeStorage) {
                var recipeIndex = recipeStorage.indexOf(recipe._id);

                if (recipeIndex > 0) {
                    // remove if list not empty and not a single element
                    recipeStorage.splice(recipeIndex, 1);
                    return true;
                } else if (recipeIndex == 0) {
                    // clear if it the only element
                    clearRecipeStorage(storageName);
                } else {
                    return false;
                }
            }
        }

        function clearRecipeStorage(storageName) {
            $window.localStorage.removeItem(storageName);
        }

    }

})();
