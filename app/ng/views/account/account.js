angular.module('foodGenerator.account', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                parent: 'root',
                url: '/account',
                views: {
                    "content": {
                        templateUrl: "views/account/account.html",
                        controller: 'AccountCtrl'
                    }
                }
            })
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.exampleField = "Hello World!";

        var currUser;
        currUser = {
            firstName: "Test",
            lastName: "User"
        };

        $scope.isLoggedIn = false;
        if (currUser != null) {
            $scope.isLoggedIn = true;

            $scope.firstName = currUser.firstName;
            $scope.lastName = currUser.lastName;
        }
    })
;