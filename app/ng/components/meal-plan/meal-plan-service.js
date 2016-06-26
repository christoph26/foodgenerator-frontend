(function () {

    angular.module('foodGenerator')
        .service('mealPlanService', mealPlanService);

    function mealPlanService(BASEURL, $http, auth) {

        this.create = createPlan;
        this.read = readPlan;
        this.update = updatePlan;
        this.delete = deletePlan;
        this.listAll = listAllPlans;

        ////////////////

        function createPlan(mealPlan, user) {
            if (auth.isAuthed()) {
                console.log("Creating a new meal plan for user '" + user.email + "'.");
                mealPlan.user = user._id;
                return $http.post(BASEURL + '/mealplans', mealPlan);
            }
        }

        function readPlan(mealPlanId) {
            if (auth.isAuthed()) {
                console.log("Loading meal plan with id '" + mealPlanId + "'.");
                return $http.get(BASEURL + '/mealplans/' + mealPlanId);
            }
        }

        function updatePlan(mealPlan) {
            if (auth.isAuthed()) {
                console.log("Updating meal plan with id '" + mealPlan._id + "'.");
                return $http.put(BASEURL + '/mealplans/', mealPlan);
            }
        }

        function deletePlan(mealPlan) {
            if (auth.isAuthed()) {
                console.log("Deleting meal plan with id '" + mealPlan._id + "'.");
                return $http.delete(BASEURL + '/mealplans/' + mealPlan._id);
            }
        }

        function listAllPlans() {
            if (auth.isAuthed()) {
                console.log("Listing all meal plans for user '" + mealPlan.user + "'.");
                return $http.get(BASEURL + '/mealplans/list');
            }
        }

    }

})();
