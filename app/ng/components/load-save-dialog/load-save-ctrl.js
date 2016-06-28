angular.module('foodGenerator')
    .controller("LoadSaveCtrl", function ($scope, currentUser, mealPlanService, $uibModalInstance) {
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
                    $scope.currentMealPlan = response.data;
                    $uibModalInstance.close();
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

        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
