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
                //we abuse the resolve feature for eventual redirection
                redirect: function($state, $stateParams, Movie, $timeout, $q){
                    var mid = $stateParams.movieId;
                    if (!mid) {
                        //timeout because the transition cannot happen from here
                        $timeout(function(){
                            $state.go("movies.list");
                        });
                        return $q.reject();
                    }
                }
            },
            ncyBreadcrumb: {
                // a bit ugly (and not stable), but ncybreadcrumbs doesn't support direct access
                // to a view controller yet if there are multiple views
                label: "{{$$childHead.$$childHead.movie.title}}",
                parent: "movies.list"
            }

        }
    })
    .controller('MovieDetailCtrl', function($scope, Movie, $mdToast, $mdDialog, $stateParams, $state, currUser) {

        $scope.movie = Movie.get({movieId: $stateParams.movieId});

        $scope.mayDelete;
        $scope.mayEdit = currUser.loggedIn();
        $scope.deleteMovie = deleteMovie;
        $scope.updateMovie = updateMovie;
        $scope.cancelEditingMovie = function(){ showSimpleToast("Editing cancelled"); }

        $scope.movie.$promise.then(function(){
            $scope.mayDelete = $scope.movie.user && $scope.movie.user == currUser.getUser()._id;
        });

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            if (!loggedIn) {
                $scope.mayDelete = false;
                $scope.mayEdit = false;
            } else {
                $scope.mayEdit = true;
                $scope.mayDelete = $scope.movie.user == currUser.getUser()._id;
            }
        });

        ////////////////////


        function updateMovie(changed) {

            if (!changed) {
                showSimpleToast("no change");
                return;
            }

            $scope.movie.$update().then(function(updated){
                $scope.movie = updated;
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