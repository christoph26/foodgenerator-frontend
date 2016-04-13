angular.module('myApp')
    .controller("register", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.pwdConfirm
        $scope.errorText = '';

        $scope.register = register;
        $scope.cancel = cancel;

        function register() {
            currUser.register($scope.username, $scope.pwd).then(function () {
                $mdDialog.hide();
            }, function (response) {
                debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    });
