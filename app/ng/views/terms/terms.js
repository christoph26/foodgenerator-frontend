/**
 * Created by Stefan on 22.06.2016.
 */
angular.module('foodGenerator.terms', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('terms', {
                parent: 'search',
                url: '/terms',
                views: {
                    "content": {
                        templateUrl: "views/terms/terms.html",
                    }
                }
            })
    })