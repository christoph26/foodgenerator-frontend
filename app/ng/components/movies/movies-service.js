'use strict';

angular.module('myApp.movies')

    .factory('Movie', function( $resource) {
        return $resource('http://localhost:3000/api/movies/:movieId', {movieId: '@_id'});

    });