/**
 * Created by Stefan on 22.06.2016.
 */
angular.module('foodGenerator.privacy', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('privacy', {
                parent: 'search',
                url: '/privacy',
                views: {
                    "content": {
                        templateUrl: "views/privacy/privacy.html",
                    }
                }
            })
    })