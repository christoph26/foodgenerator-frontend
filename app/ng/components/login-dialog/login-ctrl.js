angular.module('foodGenerator')
    .controller("LoginCtrl", function ($scope, $uibModalInstance) {
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            console.log("Performing login with email '" + $scope.email + "' and password '" + $scope.password + "'.");
            // var currUser = {};
            // currUser.login($scope.username, $scope.password).then(function () {
            //     $uibModalInstance.close();
            // }, function (response) {
            //     if (response.status == 400 || response.status == 401) {
            //         $scope.errorText = "Wrong username or password.";
            //     } else {
            //         $scope.errorText = "An unknown error occured. please try again later.";
            //     }
            // });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
