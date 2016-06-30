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

    .controller('AccountCtrl', function ($scope, $state, currentUser) {
        var loggedIn = currentUser.loggedIn();


//pressing the button "Save Update"
        $scope.toggle = function () {
            var updateform = {}; //all the data which should be updated is added to this json doc.

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
                debugger;
                if (this.update.email !== undefined) {
                    if (this.update.email != "") {
                        updateform.email = this.update.email;
                    }
                }
                if (this.update.password1 !== undefined) {
                    if (this.update.password1 != "") {
                        updateform.password = this.update.password1;
                    }
                }

                console.log(updateform);

                $http.put(BASEURL + '/users/' + user._id, user).then(function (response) {
                    // hier den erfolgsfall behandeln
                }, function (error) {
                    // hier den fehlerfall behandeln
                });
            }


            debugger;

            model.submit = function (isValid) {
                console.log("h");
                if (isValid) {
                    $http.put(BASEURL + '/users/' + user._id, user).then(function (response) {
                        model.message = "updated";
                    }, function (error) {
                        // hier den fehlerfall behandeln
                        model.message = "NOT updated";
                    });

                } else {
                    model.message = "There are still invalid fields";
                }
            };
        }
//checks if the user is logged in
        $scope.$watch(function () {
            return currentUser.loggedIn();
        }, function (isLoggedIn) {
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