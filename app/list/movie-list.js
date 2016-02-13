'use strict';

angular.module('myApp.movieList', ['ngRoute','myApp.movies','myApp.movieCard'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'list/movie-list.html',
            controller: 'MovieListCtrl',
            resolve: {
                movies: function(movieService){
                    return movieService.query();
                }
            }
        });
    }])

    .controller('MovieListCtrl', ['$scope', 'movies', function($scope, movies) {
        $scope.movies = movies;
    }]);