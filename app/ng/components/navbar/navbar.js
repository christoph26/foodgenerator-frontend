angular.module('foodGenerator')
    .directive('navbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/navbar/navbar.html",
            controller: function ($scope) {
                var currUser = {};

                $scope.user = null;

                $scope.showLoginDialog = showLoginDialog;
                $scope.showSignupDialog = showSignupDialog;
                $scope.logout = logout;

                $scope.$watch(function () {
                    return currUser.loggedIn;
                }, function (loggedIn) {
                    $scope.loggedIn = loggedIn;
                    if (loggedIn && !$scope.user) {
                        $scope.user = currUser.getUser();
                    }
                });

                /////////////////////

                $scope.open = function (type) {
                    var modalInstance;
                    if (type == 'login') {
                        modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'components/login-dialog/login-dialog.html',
                            controller: 'LoginCtrl',
                            resolve: {
                                items: function () {
                                    return $scope.items;
                                }
                            }
                        });
                    } else if (type == 'register') {
                        modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'components/register-dialog/register-dialog.html',
                            controller: 'RegisterCtrl',
                            resolve: {
                                items: function () {
                                    return $scope.items;
                                }
                            }
                        });
                    }

                    // modalInstance.result.then(function (selectedItem) {
                    //     $scope.selected = selectedItem;
                    // }, function () {
                    //     $log.info('Modal dismissed at: ' + new Date());
                    // });
                };

                function showLoginDialog() {
                    // var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'login',
                        templateUrl: 'components/login-dialog/login-dialog.html',
                        clickOutsideToClose: true,
                        // fullscreen: useFullScreen
                    });
                };
                function showSignupDialog() {
                    // var useFullScreen = $mdMedia('xs');
                    $mdDialog.show({
                        controller: 'register',
                        templateUrl: 'components/register-dialog/register-dialog.html',
                        clickOutsideToClose: true,
                        // fullscreen: useFullScreen
                    });
                };

                function logout() {
                    currUser.logout();
                }
            }
        }
    })
;