angular.module('foodGenerator')
    .controller("LoadSaveCtrl", function ($scope, mealPlanService, $uibModalInstance) {
        $scope.errorText = '';

        // $scope.mealPlans = mealPlanService.listAll();
        $scope.currentMealPlan = undefined;

        if ($scope.$resolve.activeTab == 'save') {
            $scope.active = 1;
        } else {
            $scope.active = 0;
        }

        $scope.load = load;
        $scope.save = save;
        $scope.cancel = cancel;

        //////////////////////////

        function load() {

        }

        function save() {

        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    });
