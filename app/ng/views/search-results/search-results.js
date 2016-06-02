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
            var supermarkets = SUPERMARKETS;        // "SUPERMARKETS" will be replaced by a function parameter as soon as the backend is connected

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

var SUPERMARKETS = [
    {
        "_id": "smID_01",
        "title": "ALDI SUED",
        "icon": "http://icons.iconarchive.com/icons/kyo-tux/aeon/256/Sign-LogOff-icon.png"
    },
    {
        "_id": "smID_02",
        "title": "LIDL",
        "icon": "http://icons.iconarchive.com/icons/kyo-tux/aeon/256/Sign-LogOff-icon.png"
    },
    {
        "_id": "smID_03",
        "title": "REAL",
        "icon": "http://icons.iconarchive.com/icons/kyo-tux/aeon/256/Sign-LogOff-icon.png"
    }
];

var EXAMPLE_RECIPES = [
    {
        "_id": "recipe_574b05eaddd8a4376a358c87",
        "title": "recipe_Manning",
        "skill": "Handable",
        "description": "Exercitation ea amet cupidatat aliquip ut quis ex tempor ut. Aute enim nostrud duis est exercitation quis duis duis velit occaecat Lorem est id qui. In labore laborum occaecat sint sunt adipisicing anim aliquip exercitation sint in velit ipsum elit. Pariatur irure exercitation voluptate voluptate Lorem esse ea. Sit duis dolore ea elit anim officia enim proident elit officia.\r\n",
        "vegan": true,
        "vegetarian": true,
        "ingredientList": [
            {
                "amount": 9,
                "ingredient": [
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea7eae2359d095cde6"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05eab0ef0cb47b8971bf"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea8a7963de772b08bc"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea021207cf779ab591"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea70836963865efff7"
                    }
                ]
            },
            {
                "amount": 6,
                "ingredient": [
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea020faf79a8ef4193"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05eac8925482c81b90e2"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea4004da85719f1db4"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea3d97c2b1b6880bab"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05eaabb2c984dec62799"
                    }
                ]
            },
            {
                "amount": 5,
                "ingredient": [
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea3d209fac630adfcc"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea67683593cb11ab4a"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea7f66abd791e4964e"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea4bb284710bfdab22"
                    },
                    {
                        "type": "mongoose.Schema.Types.ObjectId",
                        "ref": "ingredientID_574b05ea6d34915ea798bc17"
                    }
                ]
            }
        ],
        "recipefamily": [
            {
                "type": "mongoose.Schema.Types.ObjectId",
                "ref": "recipefamilyID_574b05ea58e938f0ad49b784"
            }
        ]
    },
    {
        "_id": "recipe_574b05eac9dcafd23d8daaac",
        "title": "recipe_Shelly",
        "skill": "Easy",
        "description": "Do anim est eiusmod ut eu in occaecat excepteur et irure ipsum reprehenderit irure. Est id mollit irure ipsum incididunt occaecat magna. Eiusmod velit non eiusmod tempor amet excepteur voluptate non do minim elit. Occaecat eu est reprehenderit esse. Ullamco minim aute consectetur culpa qui quis proident est elit deserunt. Reprehenderit enim consectetur velit magna ullamco esse dolor elit cupidatat ad reprehenderit aliqua do.\r\n",
        "vegan": false,
        "vegetarian": false,
        "ingredientList": [],
        "recipefamily": [
            {
                "type": "mongoose.Schema.Types.ObjectId",
                "ref": "recipefamilyID_574b05ea3cd829c845969ce9"
            }
        ]
    },
    {
        "_id": "recipe_574b05ea80671e04acdf7616",
        "title": "recipe_Shields",
        "skill": "Handable",
        "description": "Velit pariatur commodo exercitation sit ullamco consequat mollit voluptate nulla laboris elit excepteur. Culpa cillum consequat cillum aliquip enim excepteur sit fugiat. Non quis quis deserunt anim aliquip.\r\n",
        "vegan": false,
        "vegetarian": false,
        "ingredientList": [],
        "recipefamily": [
            {
                "type": "mongoose.Schema.Types.ObjectId",
                "ref": "recipefamilyID_574b05ea15911f05e656b7fc"
            }
        ]
    }
];