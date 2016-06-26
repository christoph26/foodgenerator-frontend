angular.module('foodGenerator')
    .controller("LoadSaveCtrl", function ($scope, mealPlanService, $uibModalInstance) {
        $scope.errorText = '';

        // $scope.mealPlans = mealPlanService.listAll();
        $scope.currentMealPlan = undefined;

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
