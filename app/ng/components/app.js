'use strict';

// Declare app level module which depends on views, and components
angular.module('foodGenerator', [
    'ui.router',
    'ui.bootstrap',
    'foodGenerator.home',
    'foodGenerator.account',
    'foodGenerator.search',
    'foodGenerator.search.recipes',
    'foodGenerator.search.ingredients',
    'foodGenerator.search.results',
    'foodGenerator.mealPlanner',
    'templates',
    'ngTagsInput'
])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: "views/root/root.html"
            });

        //backend request error interceptor
        $httpProvider.interceptors.push('reqErrInterceptor');
        //auth interceptor
        $httpProvider.interceptors.push('authInterceptor');
    });
