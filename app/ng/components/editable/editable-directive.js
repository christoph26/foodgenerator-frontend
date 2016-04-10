'use strict';

angular.module('myApp')

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


                $scope.editing = false;
                $scope.startEditing = startEditing;
                $scope.save = save;
                $scope.cancel = cancel;

                //init
                resetValue();


                $scope.$watch('model', function(){
                    if (!$scope.editing) {
                        resetValue()
                    }
                });


                ///////////////////////////////////

                function startEditing() {
                    $scope.editing = true;
                };

                function save(){
                    $scope.editing = false;
                    var changed = ($scope.model != $scope.value);
                    $scope.model = angular.copy($scope.value);

                    //run a digest cycle to update $scope.model before invoking saveM method
                    $timeout( function(){ $scope.saveM({changed:changed}); });
                };

                function cancel() {
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
