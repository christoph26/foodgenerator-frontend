angular.module('foodGenerator.search.results', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('search.results', {
                parent: 'search',
                url: '/search-results',
                views: {
                    "content": {
                        templateUrl: "views/search-results/search-results.html",
                        controller: 'SearchResultsCtrl'
                    }
                }
            })
    })

    .controller('SearchResultsCtrl', function ($scope, SearchService) {
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
