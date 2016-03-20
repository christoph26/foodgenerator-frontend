'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'myApp.movies', 'templates', 'angularUtils.directives.uiBreadcrumbs'])

    .config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /movies
        $urlRouterProvider.otherwise("/movies");


        $stateProvider
            .state('root', {

                abstract: true,
                templateUrl: "views/root/root.html",
            })
    });
