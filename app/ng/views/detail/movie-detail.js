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
    .controller('MovieDetailCtrl', function($scope, movie, $mdToast, $mdDialog, $state) {

        $scope.movie = movie;



        $scope.deleteMovie = deleteMovie;


        function deleteMovie(ev) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this movie?')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Abort');

            var toastText;
            $mdDialog.show(confirm).then(function() {
                return $scope.movie.$remove().then(function() {
                    return $state.go('movies.list');
                }).then(function(){
                    toastText = 'Movie deleted successfully';
                }, function() {
                    toastText = "Error. Try again later";
                });
            }, function() {
                toastText = "delete aborted";
            }).finally(function(){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(toastText)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
        };
    });