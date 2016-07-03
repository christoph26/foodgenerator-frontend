(function () {

    angular.module('foodGenerator')
        .service('recipeStorageService', recipeStorageService);

    function recipeStorageService($window, recipeService) {

        this.addMarkedRecipe = addMarkedRecipe;
        this.removeMarkedRecipe = removeMarkedRecipe;
        this.getMarkedRecipes = getMarkedRecipes;
        this.clearMarkedRecipes = clearMarkedRecipes;

        this.addRecentlyViewedRecipe = addRecentlyViewedRecipe;
        this.getRecentlyViewedRecipes = getRecentlyViewedRecipes;
        this.clearRecentlyViewedRecipes = clearRecentlyViewedRecipes;

        this.addToShoppingList = addToShoppingList;
        this.removeFromShoppingList = removeFromShoppingList;
        this.getShoppingListRecipes = getShoppingListRecipes;
        this.clearShoppingList = clearShoppingList;

        ////////////////

        // Marked Recipes

        function addMarkedRecipe(recipe) {
            console.log("Adding recipe '" + recipe.title + "' to marked recipes.");
            addRecipeToStorage(recipe._id, 'foodgenerator.recipes.marked');
        }

        function removeMarkedRecipe(recipe) {
            if (removeRecipeFromStorage(recipe._id, 'foodgenerator.recipes.marked')) {
                console.log("Removed recipe '" + recipe.title + "' from marked recipes.");
            } else {
                console.error("Could not remove recipe '" + recipe.title + "': not contained in marked recipe list.");
            }
        }

        function getMarkedRecipes() {
            return getRecipesFromIdList(getRecipeStorage('foodgenerator.recipes.marked'));
        }

        function clearMarkedRecipes() {
            clearRecipeStorage('foodgenerator.recipes.marked');
        }

        // Recently Viewed Recipes

        function addRecentlyViewedRecipe(recipe) {
            console.log("Registering new view for recipe '" + recipe.title + "'.");
            addRecipeToStorage(recipe._id, 'foodgenerator.recipes.recent');
        }

        function getRecentlyViewedRecipes() {
            return getRecipesFromIdList(getRecipeStorage('foodgenerator.recipes.recent'));
        }

        function clearRecentlyViewedRecipes() {
            clearRecipeStorage('foodgenerator.recipes.recent');
        }

        // Shopping List

        function addToShoppingList(recipe, personCount) {
            console.log("Adding recipe '" + recipe.title + ":" + personCount + "' to shopping list.");
            addRecipeToStorage(recipe._id + ":" + personCount, 'foodgenerator.recipes.shopping');
        }

        function removeFromShoppingList(recipe, personCount) {
            if (removeRecipeFromStorage(recipe._id + ":" + personCount, 'foodgenerator.recipes.shopping')) {
                console.log("Removed recipe '" + recipe.title + "' from shopping list.");
            } else {
                console.error("Could not remove recipe '" + recipe.title + "': not contained in shopping list.");
            }
        }

        function getShoppingListRecipes() {
            var recipeStorage = getRecipeStorage('foodgenerator.recipes.shopping');
            var recipeIds = [];

            // split the recipe ids from the persisted string "<recipeId>:<personCount>"
            recipeStorage.forEach(function (recipeStorageItem) {
                recipeIds.push(recipeStorageItem.split(":")[0]);
            });

            // load the actual recipes from the backend and append the person count
            var recipes = getRecipesFromIdList(recipeIds);
            for (var index in recipes) {
                //noinspection JSUnfilteredForInLoop
                recipes[index]["persons"] = recipeStorage[index].split(":")[1];
            }

            return recipes;
        }

        function clearShoppingList() {
            clearRecipeStorage('foodgenerator.recipes.shopping');
        }

        // Generic Functions

        function addRecipeToStorage(recipeString, storageName) {
            // in case it is contained, remove element from current position
            removeRecipeFromStorage(recipeString, storageName);

            // create a new list with the new recipe as only item
            var reorderedStorage = [recipeString];

            // append other recipes if defined
            var recipeStorage = getRecipeStorage(storageName);
            if (recipeStorage) {
                reorderedStorage.push.apply(reorderedStorage, recipeStorage);
            }

            // save back to local storage
            setRecipeStorage(storageName, reorderedStorage);
        }

        function removeRecipeFromStorage(recipeString, storageName) {
            var recipeStorage = getRecipeStorage(storageName);
            if (recipeStorage && recipeStorage.length) {
                var recipeIndex = recipeStorage.indexOf(recipeString);

                if (recipeIndex > -1 && recipeStorage.length == 1) {
                    // clear if it is the only element
                    clearRecipeStorage(storageName);
                    return true;
                } else if (recipeIndex > -1) {
                    // remove if list not empty and not a single element
                    recipeStorage.splice(recipeIndex, 1);
                    setRecipeStorage(storageName, recipeStorage);
                    return true;
                }
            }
            return false;
        }

        function getRecipeStorage(storageName) {
            var recipeStorage = $window.localStorage[storageName];
            if (recipeStorage == undefined) {
                return [];
            }
            console.log("Returning recipe storage '" + storageName + "': " + recipeStorage);
            return recipeStorage.split(",");
        }

        function setRecipeStorage(storageName, recipeStorage) {
            var storageString = "";
            for (var index in recipeStorage) {
                //noinspection JSUnfilteredForInLoop
                storageString += recipeStorage[index] + ",";
            }
            storageString = storageString.slice(0, -1);
            $window.localStorage[storageName] = storageString;
        }

        function clearRecipeStorage(storageName) {
            $window.localStorage.removeItem(storageName);
        }

        function getRecipesFromIdList(recipeIds) {
            var recipes = [];
            for (var index in recipeIds) {
                //noinspection JSUnfilteredForInLoop
                recipeService.get(recipeIds[index]).then(function (response) {
                    recipes.push(response.data);
                })
            }
            return recipes;
        }

    }

})();
