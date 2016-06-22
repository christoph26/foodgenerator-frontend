/**
 * Created by Stefan on 22.06.2016.
 */
angular.module('foodGenerator.contact', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('contact', {
                parent: 'search',
                url: '/contact',
                views: {
                    "content": {
                        templateUrl: "views/contact/contact.html",
                    }
                }
            })
    })