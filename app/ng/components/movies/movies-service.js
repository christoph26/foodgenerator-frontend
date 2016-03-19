'use strict';

angular.module('myApp.moviesService', ['ngResource'])

    .factory('movieService', ['$http', '$resource', function($http, $resource) {
        return $resource('http://localhost:3000/api/movies/:movieId', {}, {

        });


    }]);