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
                },
                bindings: {
                    searchTerm: '<'     // read-only access to the searchTerm html attribute
                }
            })
    })

    .controller('SearchResultsCtrl', function ($scope) {
        $scope.exampleField = "Hello World!";
    })
;