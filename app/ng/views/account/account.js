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
            console.log("123");
            debugger;
            var model = this;


            debugger;
            if (this.update !== undefined) {
                if (this.update.firstName !== undefined) {
                    if (this.update.firstName != "") {
                        model.firstName = this.update.firstName;
                    }
                }
                if (this.update.lastName !== undefined) {
                    if (this.update.lastName != "") {
                        model.lastName = this.update.lastName;
                    }
                }
                debugger;
                if (this.update.email !== undefined) {
                    if (this.update.email != "") {

                        model.email = this.update.email;
                    }
                }
                if (this.update.password1 !== undefined) {
                    if (this.update.password1 != "") {

                        model.password = this.update.password1;
                    }
                }

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