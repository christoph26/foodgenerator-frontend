'use strict';

angular.module('myApp.movies')

/*
    a generic directive for editable items.

    model:


     */
    .directive('mvEditable', function() {
        return {
            restrict: 'AE',
            transclude:true,
            scope: {
                model: "=",
                saveM: "&onSave",
                cancelM: "&onCancel"
            },

            link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                // this applies the directive' scope to the scope of the transcluded html.
                // further info: http://angular-tips.com/blog/2014/03/transclusion-and-scopes/
                transcludeFn(scope, function(transcludeHtml){ iElement.append(transcludeHtml); });
            },
            controller: function($scope, $timeout){

                resetValue();
                $scope.editing = false;

                $scope.startEditing = function() {
                    $scope.editing = true;
                };

                $scope.save = function(){
                    $scope.editing = false;
                    var changed = ($scope.model != $scope.value);
                    $scope.model = angular.copy($scope.value);

                    //run a digest cycle to update $scope.model before invoking saveM method
                    $timeout( function(){ $scope.saveM({changed:changed}); });
                };

                $scope.cancel = function() {
                    $scope.editing = false;
                    resetValue();
                    //same as obove. invoke digest cycle
                    $timeout( function(){ $scope.cancelM(); });

                };

                function resetValue() {
                    $scope.value = angular.copy($scope.model);
                }

            }
        };
    });
