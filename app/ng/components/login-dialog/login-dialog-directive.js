(function() {

    angular.module('myApp')
        .directive("mvLoginDialog",function(){
            return {
                restrict: "A",
                templateUrl: "components/login-dialog/login-dialog.html",
                controller: lctrl
            }
        });

    function lctrl($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.pwd = '';
        $scope.errorText = '';

        $scope.login = login;
        $scope.cancel = cancel;

        function login() {
            currUser.login($scope.username, $scope.password).then(function(){
                $mdDialog.hide();
            }, function(response){ debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "Wrong username or password.";
                } else {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }

})();