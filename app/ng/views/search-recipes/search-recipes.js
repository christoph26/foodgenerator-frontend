angular.module('foodGenerator.search.recipes', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('search.recipes', {
                parent: 'search',
                url: '/search-recipes',
                views: {
                    "content": {
                        templateUrl: "views/search-recipes/search-recipes.html",
                        controller: 'SearchRecipesCtrl'
                    }
                }
            })
    })

    .controller('SearchRecipesCtrl', function ($scope, SearchService) {
            $scope.searchTerm = SearchService.searchTerm;

        if ($scope.searchTerm && $scope.searchTerm != "") {
            SearchService.performRecipeSearch().then(function (response) {

                //Arrange result data in order to display it in rows of four thumbnails.
                function listToMatrix(list, elementsPerSubArray) {
                    var matrix = [], i, k;

                    for (i = 0, k = -1; i < list.length; i++) {
                        if (i % elementsPerSubArray === 0) {
                            k++;
                            matrix[k] = [];
                        }

                        matrix[k].push(list[i]);
                    }
                    return matrix;
                }

                $scope.resultsList = listToMatrix(response.data, 4);
                
            }, function () {
                $scope.resultsList = [];
            });
        }
        }
    )
;
