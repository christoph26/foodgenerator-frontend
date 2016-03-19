'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'myApp.movieDetail', 'myApp.movieList', 'myApp.breadcrumbs', 'templates'])

    .config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {

        $routeProvider.otherwise({redirectTo: '/movies'});

    }]);
