'use strict';

angular.module('foodGenerator.home', ['ngResource', 'ui.router'])

    .controller('HomeCtrl', function($scope) {
        $scope.greeting = "Welcome home!";
    })

;