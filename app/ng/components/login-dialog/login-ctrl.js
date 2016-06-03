angular.module('foodGenerator')
// .controller("LoginCtrl", function ($scope, currUser, $uibModal) {
    .controller("LoginCtrl", function ($scope, $uibModal) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            var currUser = {};
            currUser.login($scope.username, $scope.password).then(function () {
                $uibModal.close();
            }, function (response) {
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $uibModal.dismiss();
        }
    });
