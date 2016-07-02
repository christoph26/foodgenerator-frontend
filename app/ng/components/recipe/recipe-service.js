(function () {

    angular.module('foodGenerator')
        .service('recipeService', recipeService);

    function recipeService(BASEURL, $http) {

        this.get = getRecipe;
        this.getVariations = getVariations;
        this.getIngredients = getIngredients;

        ////////////////

        function getRecipe(recipeId) {
            console.log("Loading recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/' + recipeId);
        }

        function getVariations(recipeId) {
            console.log("Loading variations for recipe with id '" + recipeId + "'.");
            return $http.get(BASEURL + '/recipes/recipeFamily/' + recipeId);
        }

        function getIngredients(ingredientListId) {
            console.log("Loading ingredient list with id '" + ingredientListId + "'.");
            var ingredients = [];
            $http.get(BASEURL + '/ingredientLists/' + ingredientListId).then(function (listResponse) {
                var ingredientList = listResponse.data.ingredients;
                ingredientList.forEach(function (ingredient) {
                    $http.get(BASEURL + '/ingredients/' + ingredient.ingredient).then(function (ingredientResponse) {
                        ingredient['title'] = ingredientResponse.data.title;
                    });
                    ingredients.push(ingredient);
                });
            });
            return ingredients;
        }

    }

})();
