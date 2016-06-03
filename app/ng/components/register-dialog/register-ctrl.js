angular.module('foodGenerator')
// .controller("RegisterCtrl", function ($scope, currUser, $uibModal) {
    .controller("RegisterCtrl", function ($scope, $uibModal) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.pwdConfirm = '';
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            var currUser = {};
            currUser.register($scope.username, $scope.pwd).then(function () {
                $uibModal.close();
            }, function (response) {
                debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $uibModal.dismiss();
        }
    });
