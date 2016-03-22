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
                }
            },


            resolve: {
                allMovies: function (Movie) {
                    return Movie.query().$promise.then(function(movies){
                        return movies.filter(function(m){ return !!m.title; });
                    });
                }
            },
            data: {
                breadcrumbName: 'Movies'
            }
        }

    })

    .controller('MovieListCtrl', function($scope, allMovies, $mdMedia, $mdDialog, $mdToast) {
        $scope.movies = allMovies;

        $scope.createMovieDialog = createMovieDialog;


        function createMovieDialog(ev) {
            var useFullScreen = ( $mdMedia('xs'));
            $mdDialog.show({
                    controller: "CreateMovieCtrl",
                    templateUrl: 'components/create-movie/create-movie.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen,
                    preserveScope:true
                })
                .then(function(answer) {

                    if (answer) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Movie saved successfully')
                                .position('bottom right')
                                .hideDelay(3000)
                        );
                    } else {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('An Error Occured!')
                                .position('bottom right')
                                .hideDelay(3000)

                        );
                    }
                }, function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Movie creation cancelled')
                            .position('bottom right')
                            .hideDelay(3000)

                    );
                });

        }
    });