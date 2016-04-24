'use strict';

angular.module('myApp.movies')

    .constant('movieListState', {
        name: 'movies.list',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/movies' (because '/movies' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/list/movie-list.html',
                    controller: 'MovieListCtrl',
                },
                'outside@root': {
                    templateUrl: 'views/list/movie-list-buttons.html',
                    controller: 'movieListButtonCtrl'
                }
            },

            ncyBreadcrumb: {
                label: "Movies"
            }

        }

    })

    .controller('MovieListCtrl', function($scope, Movie) {
        $scope.movies = Movie.query();

        $scope.$on('movieCreated', function(ev, movie){
            $scope.movies.push(movie);
        });


    })

    .controller('movieListButtonCtrl', function($scope, $mdMedia, $mdDialog, $mdToast, currUser){

        $scope.createMovieDialog = createMovieDialog;
        $scope.authed = false;

        $scope.$watch(function(){
            return currUser.loggedIn();
        }, function(loggedIn){
            $scope.authed = loggedIn;
        });

        ////////////////////////////////////

        function createMovieDialog(ev) {
            var useFullScreen = ( $mdMedia('xs'));
            $mdDialog.show({
                    controller: "CreateMovieCtrl",
                    templateUrl: 'components/create-movie/create-movie.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen,
                    preserveScope:true
                })
                .then(function(answer) {

                    if (answer) {
                        showSimpleToast('Movie saved successfully');
                    } else {
                        showSimpleToast('An Error occured!');
                    }
                }, function() {
                    showSimpleToast('Movie creation cancelled');
                });

        }

        function showSimpleToast(txt){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(txt)
                    .position('bottom right')
                    .hideDelay(3000)

            );
        }
    });