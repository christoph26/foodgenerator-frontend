angular.module('foodGenerator')
    .controller("RegisterCtrl", function ($scope, $uibModalInstance) {
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            console.log("Performing registration with email '" + $scope.email + "' and password '" + $scope.password + "'.");
            // var currUser = {};
            // currUser.register($scope.username, $scope.password).then(function () {
            //     $uibModalInstance.close();
            // }, function (response) {
            //     debugger;
            //     if (response.status == 400 || response.status == 401) {
            //         $scope.errorText = "An unknown error occured. Please try again later.";
            //     }
            // });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
