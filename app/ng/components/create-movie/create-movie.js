angular.module('myApp.movies')
    .controller('CreateMovieCtrl', function($scope, Movie, $mdDialog, $rootScope, currUser) {

        $scope.movie = new Movie();
        $scope.ratings = [{
                abbr: "G",
                short_desc: "G – General Audiences",
                long_desc: "All ages admitted. Nothing that would offend parents for viewing by children."
            },
            {
                abbr: "PG",
                short_desc: "PG – Parental Guidance Suggested",
                long_desc: "Some material may not be suitable for children. Parents urged to give \"parental guidance\". May contain some material parents might not like for their young children."
            },
            {
                abbr: "PG-13",
                short_desc: "PG-13 – Parents Strongly Cautioned",
                long_desc: "Some material may be inappropriate for children under 13. Parents are urged to be cautious. Some material may be inappropriate for pre-teenagers."
            },
            {
                abbr: "R",
                short_desc: "R – Restricted",
                long_desc: "Under 17 requires accompanying parent or adult guardian. Contains some adult material. Parents are urged to learn more about the film before taking their young children with them."
            },
            {
                abbr: "NC-17",
                short_desc: "NC-17 – Adults Only",
                long_desc: "No One 17 and Under Admitted. Clearly adult. Children are not admitted."
            }];
        $scope.years;


        //init
        (function(){

            var r = [];
            var now = new Date().getFullYear();
            for (var i = 1892; i <= now; i++) {
                r.push(i);
            }
            $scope.years = r;
            $scope.movie.year = now;
        })();


        $scope.save = function() {
            $scope.movie.user = currUser.getUser()._id;
            $scope.movie.$save()
                .then(function(){
                    $rootScope.$broadcast('movieCreated', $scope.movie);
                    $mdDialog.hide(true);
                }).catch(function(){
                    $mdDialog.hide(false);
                });
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

});