angular.module('foodGenerator.terms', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('terms', {
                parent: 'terms',
                url: '/terms',
                views: {
                    "content": {
                        templateUrl: "views/terms/terms.html",
                        controller: 'TermsCtrl'
                    }
                }
            })
    })