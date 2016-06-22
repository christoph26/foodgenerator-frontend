/**
 * Created by Stefan on 22.06.2016.
 */
angular.module('foodGenerator.about', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('about', {
                parent: 'search',
                url: '/about',
                views: {
                    "content": {
                        templateUrl: "views/about/about.html",
                    }
                }
            })
    })