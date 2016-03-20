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
            templateUrl: 'views/list/movie-list.html',
            controller: 'MovieListCtrl',

            resolve: {
                allMovies: function (Movie) {
                    return Movie.query();
                }
            },
            data: {
                breadcrumbName: 'Movies'
            }
        }

    })

    .controller('MovieListCtrl', function($scope, allMovies) {
        $scope.movies = allMovies;
    });