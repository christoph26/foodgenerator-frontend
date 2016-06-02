angular.module('foodGenerator')
    .directive('recipethumbnail', function () {
        return {
            restrict: "E",
            templateUrl: "components/recipe-thumbnail/recipe-thumbnail.html",
            controller: function ($scope) 
            {
                
                $scope.exampleField = function() {$scope.titlethumb = $scope.resultsofsearch};
                
                $scope.availability =
                    [
                        {supermarket: "Aldi"},
                        {supermarket: "LIDL"}
                    ];
                $scope.thumbproperty =
                    [
                        {type: "organic"},
                        {type: "vegetarian"},
                        {type: "vegan"}
                    ];
            }
        }
    })
;