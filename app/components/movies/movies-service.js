'use strict';

angular.module('myApp.movies.movies-service', ['ngResource'])

    .factory('movieService', ['$resource', function($resource) {

        return $resource('data/:movieId.json', {}, {
            query: {method:'GET', params:{movieId:'movies'}, isArray:true}
        });

    }]);