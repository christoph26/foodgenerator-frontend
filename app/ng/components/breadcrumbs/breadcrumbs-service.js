'use strict';

angular.module('myApp.breadcrumbsService', [])

    .factory('currentMovie', ['$rootScope', function($rootScope) {

        var currentMovie = null;

        return {
            get : function() {
                return currentMovie;
            },
            set : function(movie) {
                currentMovie = movie;
                $rootScope.$broadcast("currentMovieChanged");
            }
        }

    }]);