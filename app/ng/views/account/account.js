angular.module('foodGenerator.account', ['ngResource', 'ui.router'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                parent: 'root',
                url: '/account',
                views: {
                    "content": {
                        templateUrl: "views/account/account.html",
                        controller: 'AccountCtrl'
                    }
                }
            })
    })

    .controller('AccountCtrl', function ($scope, $state, currentUser, BASEURL, $http) {
        $scope.errorText = "";
        $scope.successText = "";
        var loggedIn = currentUser.loggedIn();
        if (loggedIn) {
            currentUser.getUser().$promise.then(function (user) {
                $scope.update = user;
            });
        }
        $scope.$watch(function () {
            return currentUser.loggedIn();
        }, function (isLoggedIn) {

            if (loggedIn && !$scope.user) {
                $scope.user = currentUser.getUser();
            }

            if (loggedIn != isLoggedIn) {
                // check if state really changed to avoid endless reloading
                loggedIn = isLoggedIn;
                $scope.loggedIn = isLoggedIn;
                $state.go('home');
            }

        });

        $scope.delete = function () {
            var r = confirm("Are you sure you want to delete your Account?");
            if (r == true) {
                var deleteform = {};
                deleteform.email = $scope.$parent.user.email;
                deleteform.password = this.update.passwordOld;
                $http.post(BASEURL + '/unregister/', deleteform).then(function (response) {
                    currentUser.logout();
                }, function (error) {
                    // hier den fehlerfall behandeln
                    $scope.successText = "";
                    $scope.errorText = error.data;
                });
                this.update.passwordOld=undefined;
            }
        };
//pressing the button "Save Update"
        $scope.toggle = function () {
            var updateform = {}; //all the data which should be updated is added to this json doc.
            var passwordsSame = true; //false, if the Wiederholung of the password is not the same as the password entered


            if (this.update !== undefined) {
                if (this.update.firstName !== undefined) {
                    if (this.update.firstName != "") {
                        updateform.firstName = this.update.firstName;
                        $scope.$parent.user.firstName = this.update.firstName;
                    }
                }
                if (this.update.lastName !== undefined) {
                    if (this.update.lastName != "") {
                        updateform.lastName = this.update.lastName;
                        $scope.$parent.user.lastName = this.update.lastName;
                    }
                }

                if (this.update.email !== undefined) {
                    if (this.update.email != "") {
                        updateform.email = this.update.email;
                        $scope.$parent.user.email = this.update.email;
                    }
                }
                if (this.update.password1 !== undefined || this.update.password2 !== undefined) {
                    if (this.update.password1 != "" || this.update.password2 != "") {
                        if (this.update.password1 === this.update.password2) {
                            updateform.password = this.update.password1;
                            passwordsSame = true;
                        } else {
                            passwordsSame = false;
                        }
                    }
                }
                if (loggedIn) {
                    if (passwordsSame) {
                        $http.put(BASEURL + '/users/' + $scope.$parent.user._id, updateform).then(function (response) {
                            // hier den erfolgsfall behandeln
                            $scope.successText = response.data;
                            $scope.errorText = "";
                        }, function (error) {
                            // hier den fehlerfall behandeln
                            $scope.successText = "";
                            $scope.errorText = error.data;
                        });
                    } else {
                        $scope.successText = "";
                        $scope.errorText = "Your passwords do NOT match! Please try again.";
                        this.update.password1=undefined;
                        this.update.password2=undefined;

                    }
                }

            }
        };
//checks if the user is logged in


//compares the input to 2 text input boxes
        var compareTo = function () {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function (scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function (modelValue) {
                        return modelValue == scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function () {
                        ngModel.$validate();
                    });
                }
            };
        };
    })
;