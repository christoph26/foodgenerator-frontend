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

    .controller('AccountCtrl', function ($scope, $state, currentUser) {
        var loggedIn = currentUser.loggedIn();
        $scope.$watch(function () {
            return currentUser.loggedIn();
        }, function (isLoggedIn) {
            if (loggedIn != isLoggedIn) {
                // check if state really changed to avoid endless reloading
                loggedIn = isLoggedIn;
                $scope.loggedIn = isLoggedIn;
                $state.go($state.current.name, $state.params, {reload: true});
            }
        });
    })
;