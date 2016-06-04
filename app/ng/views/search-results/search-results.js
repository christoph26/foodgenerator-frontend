angular.module('foodGenerator.searchResults', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('searchResults', {
                parent: 'root',
                url: '/search-results',
                views: {
                    "content": {
                        templateUrl: "views/search-results/search-results.html",
                        controller: 'SearchResultsCtrl'
                    }
                }
            })
    })

    .controller('SearchResultsCtrl', function ($scope) {
            var resultsList = EXAMPLE_RECIPES;      // "EXAMPLE_RECIPES" will be replaced by a function parameter as soon as the backend is connected
            var ingredientlist = EXAMPLE_IngredientList;
            var ingredients = EXAMPLE_Ingredient;
            var supermarkets = SUPERMARKETS;// "SUPERMARKETS" will be replaced by a function parameter as soon as the backend is connected
            //[RECIPE1[Ingredient[supermarket]], RECIPE2, ..]
        for (var recipe in resultsList) {
                resultsList[recipe].supermarkets = getSupermarketsWithIngredientsAvailable(supermarkets, recipe.ingredientList);
            }

            $scope.resultsList = resultsList;
        }
    )
;

function getSupermarketsWithIngredientsAvailable(supermarkets, ingredients) {
    // TODO implement function that returns only those supermarkets that have all ingredients available
    return supermarkets;
}

var EXAMPLE_RECIPES = [
    {
        "_id": "333300000000000000000001",
        "title": "Spaghetti Bolognese Classic",
        "effort": 1,
        "description": "Preperation is simple and done in 30 minutes.",
        "vegan": true,
        "vegetarian": false,
        "picture": "http://static.chefkoch-cdn.de/ck.de/rezepte/161/161863/732836-960x720-spaghetti-bolognese.jpg",
        "ingredientList": "222200000000000000000001",
        "recipeFamily": "444400000000000000000001"
    },
    {
        "_id": "333300000000000000000002",
        "title": "Rammstein Spaghetti Bolognese",
        "effort": 3,
        "description": "HOT as Hell.",
        "vegan": false,
        "vegetarian": true,
        "picture": "http://static.chefkoch-cdn.de/ck.de/rezepte/62/62122/818606-960x720-rammstein-s-spaghetti-bolognese.jpg",
        "ingredientList": "222200000000000000000002",
        "recipeFamily": "444400000000000000000001"
    }
];

var EXAMPLE_IngredientList = [
    {
        "_id": "222200000000000000000001",
        "ingredients": [
            {
                "amount": 500,
                "unit": "g",
                "ingredient": "111100000000000000000001"
            },
            {
                "amount": 6,
                "unit": "st",
                "ingredient": "111100000000000000000002"
            },
            {
                "amount": 2,
                "unit": "st",
                "ingredient": "111100000000000000000003"
            },
            {
                "amount": 1,
                "unit": "st",
                "ingredient": "111100000000000000000004"
            },
            {
                "amount": 2,
                "unit": "tl",
                "ingredient": "111100000000000000000005"
            },
            {
                "amount": 500,
                "unit": "g",
                "ingredient": "111100000000000000000006"
            }
        ]
    },
    {
        "_id": "222200000000000000000002",
        "ingredients": [
            {
                "amount": 500,
                "unit": "g",
                "ingredient": "111100000000000000000001"
            },
            {
                "amount": 6,
                "unit": "st",
                "ingredient": "111100000000000000000002"
            },
            {
                "amount": 2,
                "unit": "st",
                "ingredient": "111100000000000000000003"
            },
            {
                "amount": 1,
                "unit": "st",
                "ingredient": "111100000000000000000004"
            },
            {
                "amount": 2,
                "unit": "tl",
                "ingredient": "111100000000000000000005"
            },
            {
                "amount": 500,
                "unit": "g",
                "ingredient": "111100000000000000000006"
            },
            {
                "amount": 6,
                "unit": "st",
                "ingredient": "111100000000000000000007"
            }
        ]
    }
];

var EXAMPLE_Ingredient = [
        {
            "_id": "111100000000000000000001",
            "title": "Minced Meat",
            "supermarkets": ["888800000000000000000001", "888800000000000000000002", "888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000002",
            "title": "Tomato",
            "supermarkets": ["888800000000000000000001", "888800000000000000000002", "888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000003",
            "title": "Onion",
            "supermarkets": ["888800000000000000000001", "888800000000000000000002", "888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000004",
            "title": "Garlic",
            "supermarkets": ["888800000000000000000001", "888800000000000000000002", "888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000005",
            "title": "Oregano",
            "supermarkets": ["888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000006",
            "title": "Spaghetti",
            "supermarkets": ["888800000000000000000001", "888800000000000000000002", "888800000000000000000003"]
        },
        {
            "_id": "111100000000000000000007",
            "title": "Pepper Red",
            "supermarkets": "888800000000000000000003"
        }
];

var SUPERMARKETS = [
    {
        "_id": "888800000000000000000001",
        "title": "ALDI SUED",
        "icon": "http://static06.kaufda.de/Geschaefte/Aldi-Sued.v9774.jpg"
    },
    {
        "_id": "888800000000000000000002",
        "title": "Penny",
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Penny-Logo.svg/142px-Penny-Logo.svg.png"
    },
    {
        "_id": "888800000000000000000003",
        "title": "REAL",
        "icon": "http://static05.kaufda.de/Geschaefte/Real.v1111.png"
    }
];