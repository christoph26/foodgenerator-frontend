(function () {

    angular.module('foodGenerator')
        .service('mealPlanService', mealPlanService);

    function mealPlanService(BASEURL, $http, auth, currentUser) {

        this.create = createPlan;
        this.read = readPlan;
        this.update = updatePlan;
        this.delete = deletePlan;
        this.listAll = listAllPlans;

        ////////////////

        function createPlan(mealPlan) {
            if (auth.isAuthed()) {
                return currentUser.getUser().$promise.then(function (user) {
                    console.log("Creating a new meal plan for user '" + user.email + "'.");
                    mealPlan.user = user._id;
                    return $http.post(BASEURL + '/mealplans', mealPlan);
                });
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
                return currentUser.getUser().$promise.then(function (user) {
                    console.log("Listing all meal plans for user " + user.email + ".");
                    return $http.get(BASEURL + '/mealplans/list/' + user._id);
                });
            }
        }

    }

})();
