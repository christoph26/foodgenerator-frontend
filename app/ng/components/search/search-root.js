angular.module('foodGenerator.search', ['ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                parent: 'root',
                views: {
                    "content": {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
    })

    .controller("SearchCtrl", function ($scope) {
        $scope.myDirectiveVar = "This should work now from search-root!";
    })
;
