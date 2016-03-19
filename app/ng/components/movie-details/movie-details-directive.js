'use strict';

angular.module('myApp.movieDetailsDirective', [])

    .directive('movieDetails', function() {
        return {
            restrict: 'E',
            scope: {
                movie: '='
            },
            templateUrl: 'components/movie-details/movie-details.html'
        };
    });
