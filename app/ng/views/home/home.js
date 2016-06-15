angular.module('foodGenerator.home', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'root',
                url: '/home',
                views: {
                    "content": {
                        templateUrl: "views/home/home.html",
                        controller: 'HomeCtrl'
                    }
                }
            })
    })

    .controller('HomeCtrl', function ($scope) {
        $scope.exampleField = "Hello World!";
    })
;