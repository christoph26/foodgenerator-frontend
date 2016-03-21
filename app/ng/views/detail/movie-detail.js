'use strict';

angular.module('myApp.movies')

    .constant('movieDetailsState', {
        name: 'movies.detail',
        options: {
            url: '/{movieId}',

            views: {
                "content@root": {
                    templateUrl: 'views/detail/movie-detail.html',
                    controller: 'MovieDetailCtrl'
                }
            },

            resolve: {
                movie: function($stateParams, Movie){
                    return Movie.get({movieId: $stateParams.movieId}, function(movie) {
                        return movie;
                    }).$promise;
                }
            },
            data: {
                breadcrumbName: '{{movie.title}}'
            }
        }
    })
    .controller('MovieDetailCtrl', ['$scope', 'movie', function($scope, movie) {

        $scope.movie = movie;
    }]);