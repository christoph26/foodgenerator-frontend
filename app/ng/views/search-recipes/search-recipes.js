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

            SearchService.performRecipeSearch().then(function (response) {
                console.log(response.data);
                $scope.resultsList = response.data;
                $scope.searchTerm = SearchService.searchTerm;
            }, function (error) {
                console.log(error.data);
                $scope.resultsList([]);
                $scope.searchTerm = SearchService.searchTerm;
            });
        }
    )
;
