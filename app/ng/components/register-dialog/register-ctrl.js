angular.module('foodGenerator')
    .controller("RegisterCtrl", function ($scope, currentUser, $uibModalInstance) {
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            currentUser.register($scope.email, $scope.password, $scope.firstName, $scope.lastName)
                .then(function () {
                    $uibModalInstance.close();
                    // returned token is automatically saved by auth-interceptor
                }, function (error) {
                    if (error.status == 400 || error.status == 401) {
                        $scope.errorText = "An unknown error occured. Please try again later.";
                    }
                });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
