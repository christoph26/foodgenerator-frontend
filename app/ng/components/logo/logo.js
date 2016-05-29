'use strict';

angular.module('foodGenerator')
    .directive('logo', function () {
        return {
            restrict: "E",
            templateUrl: "components/logo/logo.html",
            controller: function ($scope) {
                $scope.logo = "LOGO!";
            }
        }
    })
;