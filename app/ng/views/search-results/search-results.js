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

    .controller('SearchResultsCtrl', function ($scope)
    {
        $scope.exampleField = "Hello World!";
        
    }

)

;