'use strict';

angular.module('myApp.movies')

    .directive('movieDetails', function() {
        return {
            restrict: 'E',
            scope: {
                movie: '='
            },
            templateUrl: 'components/movie-details/movie-details.html'
        };
    });
