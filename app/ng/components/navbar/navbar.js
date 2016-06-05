angular.module('foodGenerator')
    .directive('navbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/navbar/navbar.html",
            controller: function ($scope, currentUser, $uibModal) {
                $scope.user = null;

                $scope.logout = logout;

                $scope.$watch(function () {
                    return currentUser.loggedIn();
                }, function (loggedIn) {
                    console.log("Detected change in loggedIn state. Value now: " + loggedIn);
                    $scope.loggedIn = loggedIn;
                    if (loggedIn && !$scope.user) {
                        $scope.user = currentUser.getUser();
                        console.log("Updated current user in scope: " + currentUser.getUser());
                    }
                });

                /////////////////////

                $scope.open = function (type) {
                    var modalInstance;
                    if (type == 'login') {
                        modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'components/login-dialog/login-dialog.html',
                            controller: 'LoginCtrl'
                        });
                    } else if (type == 'register') {
                        modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'components/register-dialog/register-dialog.html',
                            controller: 'RegisterCtrl'
                        });
                    }

                    // modalInstance.result.then(function (selectedItem) {
                    //     $scope.selected = selectedItem;
                    // }, function () {
                    //     $log.info('Modal dismissed at: ' + new Date());
                    // });
                };

                function logout() {
                    currentUser.logout();
                    $scope.isLoggedIn = false;
                }
            }
        }
    })
;