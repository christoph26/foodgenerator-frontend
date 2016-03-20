'use strict';

angular.module('myApp')

    .directive('breadcrumbs', function(currentMovie) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/breadcrumbs/breadcrumbs.html',
            link: function (scope) {

                scope.currentMovie = currentMovie.get();


                // listen for the event currentMovieChanged
                scope.$on('currentMovieChanged', function (event, data) {

                    scope.currentMovie = currentMovie.get();

                });

            }
        };
    });
