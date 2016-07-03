angular.module('foodGenerator')
    .directive('appfooter', function () {
        return {
            restrict: "E",
            templateUrl: "components/footer/footer.html",
            controller: function ($scope, $state) {
                $scope.isActiveNav = function (state) {
                    return ($state.current.name === state) ? 'active' : '';
                };
            }
        }
    })
;