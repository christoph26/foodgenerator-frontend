angular.module('foodGenerator')
    .controller("LoginCtrl", function ($scope, currentUser, $uibModalInstance) {
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            console.log("Performing login with email '" + $scope.email + "' and password '" + $scope.password + "'.");
            currentUser.login($scope.email, $scope.password).then(function () {
                console.log("closing model. (success?)");
                $uibModalInstance.close();
            }, function (response) {
                if (response.status == 400 || response.status == 401) {
                    console.log("wrong username and pw");
                    $scope.errorText = "Wrong username or password.";
                } else {
                    console.log("unkown error");
                    $scope.errorText = "An unknown error occured. Please try again later.";
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
