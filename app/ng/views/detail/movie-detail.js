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
                movie: function($state, $stateParams, Movie){
                    var mid = $stateParams.movieId;
                    if (!mid) {
                        $state.go("movies.list");
                        return;
                    }
                    return Movie.get({movieId: mid}, function(movie) {
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
        $scope.updateMovie = updateMovie;
        $scope.cancelEditingMovie = function(){ showSimpleToast("Editing cancelled"); }


        function updateMovie(changed) {debugger;
            if (!changed) {
                showSimpleToast("no change");
                return;
            }
            $scope.movie.$update().then(function(){
                showSimpleToast("update successfull");
            }, function(){
                showSimpleToast("error. please try again later");
            });
        }

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
                    showSimpleToast('Movie deleted successfully');
                }, function() {
                    showSimpleToast("Error. Try again later");
                });
            }, function() {
                showSimpleToast("delete aborted");
            })
        }

        function showSimpleToast(txt) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    });