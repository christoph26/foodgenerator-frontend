(function () {

    angular.module('foodGenerator')
        .service('mealPlanService', mealPlanService);

    function mealPlanService(BASEURL, $http, $resource, currentUser) {

        this.create = createPlan;
        this.read = readPlan;
        this.update = updatePlan;
        this.delete = deletePlan;
        this.listAll = listAllPlans;

        this.loggedIn = auth.isAuthed;
        this.logout = logout;
        this.getUser = getUser;

        ////////////////

        function createPlan(mealPlan) {
            var user = currentUser.getUser();
            if (user) {
                console.log("Creating a new meal plan for user '" + user.email + "'.");
                return $http.post(BASEURL + '/mealplans', mealPlan);
            } else {
                //TODO implement not logged in behaviour
                console.log("not logged in, cannot create!");
            }
        }

        function readPlan(mealPlanId) {
            var user = currentUser.getUser();
            if (user) {
                console.log("Loading meal plan with id '" + mealPlanId + "'.");
                return $http.get(BASEURL + '/mealplans/' + mealPlanId);
            } else {
                //TODO implement not logged in behaviour
                console.log("not logged in, cannot read!");
            }
        }

        function updatePlan(mealPlan) {
            var user = currentUser.getUser();
            if (user) {
                console.log("Updating meal plan with id '" + mealPlan._id + "'.");
                return $http.put(BASEURL + '/mealplans/', mealPlan);
            } else {
                //TODO implement not logged in behaviour
                console.log("not logged in, cannot update!");
            }
        }

        function deletePlan(mealPlan) {
            var user = currentUser.getUser();
            if (user) {
                console.log("Deleting meal plan with id '" + mealPlan._id + "'.");
                return $http.delete(BASEURL + '/mealplans/' + mealPlan._id);
            } else {
                //TODO implement not logged in behaviour
                console.log("not logged in, cannot delete!");
            }
        }

        function listAllPlans() {
            var user = currentUser.getUser();
            if (user) {
                console.log("Listing all meal plans for user '" + user.email + "'.");
                return $http.delete(BASEURL + '/mealplans/' + mealPlan._id);
            } else {
                //TODO implement not logged in behaviour
                console.log("not logged in, cannot list all!");
            }
        }

    }

})();
