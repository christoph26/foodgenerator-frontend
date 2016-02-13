'use strict';

angular.module('myApp.movieDetail', ['ngRoute','myApp.movies','myApp.breadcrumbs','myApp.movieDetails'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movies/:movieId', {
            templateUrl: 'detail/movie-detail.html',
            controller: 'MovieDetailCtrl',
            resolve: {
                movie: function($route, movieService,currentMovie){
                    return movieService.get({movieId: $route.current.params.movieId}, function(movie) {
                        currentMovie.set(movie);
                    });
                }
            }
        });
    }])

    .controller('MovieDetailCtrl', ['$scope', 'movie', function($scope, movie) {

        $scope.movie = movie;
    }]);