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
        var loggedIn = currentUser.loggedIn();

        $scope.delete = function () {
            var r = confirm("Are you sure you want to delete your Account?");
            if (r == true) {
                var deleteform = {};
                deleteform.email = $scope.$parent.user.email;
                deleteform.password = this.update.passwordOld;
                debugger;
                $http.post(BASEURL + '/unregister/', deleteform).then(function (response) {
                    debugger;
                    alert(response);
                    $scope.isLoggedIn = false;
                    location.reload();

                }, function (error) {
                    // hier den fehlerfall behandeln
                    debugger;
                    alert("There was a problem, deleting your user." + error);
                    location.reload();
                });
            } else {
                location.reload();
            }
            location.reload();
        }
//pressing the button "Save Update"
        $scope.toggle = function () {
            var updateform = {}; //all the data which should be updated is added to this json doc.
            var passwordsSame = true; //false if the Wiederholung of the password is not the same as the password entered


            if (this.update !== undefined) {
                if (this.update.firstName !== undefined) {
                    if (this.update.firstName != "") {
                        updateform.firstName = this.update.firstName;
                    }
                }
                if (this.update.lastName !== undefined) {
                    if (this.update.lastName != "") {
                        updateform.lastName = this.update.lastName;
                    }
                }

                if (this.update.email !== undefined) {
                    if (this.update.email != "") {
                        updateform.email = this.update.email;
                    }
                }
                if (this.update.password1 !== undefined || this.update.password2 !== undefined) {
                    if (this.update.password1 != "" || this.update.password2 != "") {
                        if (this.update.password1 === this.update.password2) {
                            updateform.password = this.update.password1;
                        } else {
                            passwordsSame = false;
                        }
                    }
                }
                //debugger;
                console.log(updateform);
                console.log($scope.$parent.user._id);
                if (loggedIn) {
                    if (passwordsSame) {
                        $http.put(BASEURL + '/users/' + $scope.$parent.user._id, updateform).then(function (response) {
                            alert("Update Successful!");
                            // hier den erfolgsfall behandeln

                            location.reload();
                        }, function (error) {
                            // hier den fehlerfall behandeln
                        });

                        location.reload();
                    } else {
                        alert("Your passwords do NOT match! Please try again.");
                        location.reload();
                    }
                }

            }
        }
//checks if the user is logged in
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
                $state.go($state.current.name, $state.params, {reload: true});
            }
        });

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