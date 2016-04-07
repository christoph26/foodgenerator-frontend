'use strict';

angular.module('myApp.movies')

    .directive('mvMovieCard', function() {
        return {
            restrict: 'A',
            scope: {
                movie: '='
            },
            templateUrl: 'components/movie-card/movie-card.html'
        };
    });
