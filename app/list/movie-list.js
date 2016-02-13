'use strict';

angular.module('myApp.movieList', ['ngRoute','myApp.movieCard','myApp.movies','myApp.breadcrumbs'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'list/movie-list.html',
            controller: 'MovieListCtrl',
            resolve: {
                movies: function(movieService,currentMovie){

                    currentMovie.set(null);

                    return movieService.query();
                }
            }
        });
    }])

    .controller('MovieListCtrl', ['$scope', 'movies', function($scope, movies) {
        $scope.movies = movies;
    }]);