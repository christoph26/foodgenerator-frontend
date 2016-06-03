angular.module('foodGenerator')
    .directive('navbar', function () {
        return {
            restrict: "E",
            templateUrl: "components/navbar/navbar.html",
            controller: function ($scope, $uibModal) {
                var currUser = {};

                $scope.user = null;

                $scope.logout = logout;

                $scope.loggedIn = false;
                // $scope.$watch(function () {
                //     return currUser.loggedIn;
                // }, function (loggedIn) {
                //     $scope.loggedIn = loggedIn;
                //     if (loggedIn && !$scope.user) {
                //         $scope.user = currUser.getUser();
                //     }
                // });

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
                    console.log("Performing logout.");
                    $scope.loggedIn = false;
                    // currUser.logout();
                }
            }
        }
    })
;