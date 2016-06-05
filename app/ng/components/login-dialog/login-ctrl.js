angular.module('foodGenerator')
    .controller("LoginCtrl", function ($scope, currentUser, $uibModalInstance) {
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            currentUser.login($scope.email, $scope.password).then(function () {
                $uibModalInstance.close();
            }, function (response) {
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. Please try again later.";
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
