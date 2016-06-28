angular.module('foodGenerator')
    .controller("LoadSaveCtrl", function ($scope, currentUser, mealPlanService, recipeService, $uibModalInstance) {
        $scope.errorText = '';
        $scope.currentMealPlan = undefined;
        $scope.selectedMealPlanId = undefined;

        $scope.load = load;
        $scope.save = save;
        $scope.cancel = cancel;

        initialize();

        //////////////////////////

        function initialize() {
            if ($scope.$resolve.activeTab == 'save') {
                $scope.active = 1;
            } else {
                $scope.active = 0;
            }

            mealPlanService.listAll().then(function (response) {
                $scope.mealPlans = response.data;
            }, function (error) {
                if (error.status == 401) {
                    $scope.errorText = "Please log in to use this feature.";
                } else {
                    $scope.errorText = "An unknown error occured. Please try again later.";
                }
            });
        }

        function load() {
            if (this.selectedMealPlanId) {
                mealPlanService.read(this.selectedMealPlanId).then(function (response) {
                    console.log("Successfully loaded meal plan '" + response.data.title + "'.");
                    // Extract entity from response body
                    $scope.currentMealPlan = response.data;

                    // Lazily load the recipe objects for each meal in each meal list
                    angular.forEach($scope.currentMealPlan.mealLists, function (mealList) {
                        angular.forEach(mealList.meals, function (meal) {
                            recipeService.get(meal.recipe).then(function (result) {
                                meal.recipe = result.data;
                            })
                        })
                    });

                    // Close the modal and return the completely loaded entity
                    $uibModalInstance.close($scope.currentMealPlan);
                }, function (error) {
                    if (error.status == 401) {
                        $scope.errorText = "Please log in to use this feature.";
                    } else {
                        $scope.errorText = "An unknown error occured while loading. Please try again later.";
                    }
                });
            }
        }

        function save() {
            if (this.selectedMealPlanId) {
                mealPlanService.read(this.selectedMealPlanId).then(function (response) {
                    console.log("Successfully loaded meal plan '" + response.data.title + "'.");
                    $scope.currentMealPlan = response.data;
                    $uibModalInstance.close(response.data);
                }, function (error) {
                    if (error.status == 401) {
                        $scope.errorText = "Please log in to use this feature.";
                    } else {
                        $scope.errorText = "An unknown error occured while loading. Please try again later.";
                    }
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
