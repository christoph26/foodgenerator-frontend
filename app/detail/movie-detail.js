'use strict';

angular.module('myApp.movieDetail', ['ngRoute','myApp.movies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/movies/:movieId', {
            templateUrl: 'detail/movie-detail.html',
            controller: 'MovieDetailCtrl',
            resolve: {
                movie: function($route, movieService){
                    return movieService.get({movieId: $route.current.params.movieId}, function(movie) {
                    });
                }
            }
        });
    }])

    .controller('MovieDetailCtrl', ['$scope', 'movie', function($scope, movie) {
        $scope.movie = movie;
    }]);