angular.module('foodGenerator.mealPlanner', ['ngResource', 'ui.router', 'dndLists'])

    .config(function ($stateProvider) {
        $stateProvider
            .state('mealPlanner', {
                parent: 'root',
                url: '/meal-planner',
                views: {
                    "content": {
                        templateUrl: "views/meal-planner/meal-planner.html",
                        controller: 'MealPlannerCtrl'
                    }
                }
            })
    })

    .controller('MealPlannerCtrl', function ($scope, $filter, $uibModal, currentUser, recipeStorageService, mealPlanService) {
        resetMealPlan();

        $scope.loggedIn = false;
        $scope.markedRecipes = recipeStorageService.getMarkedRecipes();
        $scope.recentRecipes = recipeStorageService.getRecentlyViewedRecipes();

        $scope.open = open;

        $scope.saveMealPlan = saveMealPlan;
        $scope.resetMealPlan = resetMealPlan;

        $scope.addMealList = addMealList;
        $scope.removeListCallback = removeListCallback;

        $scope.removeMarkedRecipeCallback = removeMarkedRecipeCallback;

        $scope.$watch(function () {
            return currentUser.loggedIn();
        }, function (loggedIn) {
            $scope.loggedIn = loggedIn;
            if (loggedIn && !$scope.user) {
                $scope.user = currentUser.getUser();
            }
        });

        //////////////////////////////////

        function addMealList() {
            var mealPlan = $scope.mealPlan;
            var newMealList = {
                title: calculateMealListTitle(mealPlan, $filter),
                order: mealPlan.mealLists.length,
                meals: []
            };
            mealPlan.mealLists.push(newMealList);
        }

        function open(type) {
            var modalInstance;
            if (type == 'load') {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/load-save-dialog/load-save-dialog.html',
                    controller: 'LoadSaveCtrl',
                    resolve: {
                        activeTab: function () {
                            return 'load';
                        },
                        mealPlan: function () {
                            return $scope.mealPlan;
                        }
                    }
                });
            } else if (type == 'save') {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/load-save-dialog/load-save-dialog.html',
                    controller: 'LoadSaveCtrl',
                    resolve: {
                        activeTab: function () {
                            return 'save';
                        },
                        mealPlan: function () {
                            return $scope.mealPlan;
                        }
                    }
                });
            }

            if (modalInstance) {
                modalInstance.result.then(function (updatedMealPlan) {
                    if (updatedMealPlan) {
                        $scope.mealPlan = updatedMealPlan;
                    }
                });
            }
        }

        function saveMealPlan() {
            if ($scope.mealPlan._id) {
                mealPlanService.update($scope.mealPlan);
            } else {
                $scope.open('save');
            }
        }

        function resetMealPlan() {
            $scope.mealPlan = getEmptyMealPlan();
            addMealList();
        }

        function removeListCallback(mealList) {
            var mealListIndex;
            for (var index in $scope.mealPlan.mealLists) {
                //noinspection JSUnfilteredForInLoop
                if ($scope.mealPlan.mealLists[index] === mealList) {
                    mealListIndex = index;
                }
            }
            if (mealListIndex) {
                $scope.mealPlan.mealLists.splice(mealListIndex, 1);
                for (index in $scope.mealPlan.mealLists) {
                    //noinspection JSUnfilteredForInLoop
                    $scope.mealPlan.mealLists[index].order = index;
                }
            }
        }

        function removeMarkedRecipeCallback(recipe) {
            removeRecipeFromList(recipe, $scope.markedRecipes);
            recipeStorageService.removeMarkedRecipe(recipe);
        }

        ////////////////////////

        function removeRecipeFromList(recipe, list) {
            var recipeIndex;
            for (var index in list) {
                //noinspection JSUnfilteredForInLoop
                if (list[index] === recipe) {
                    recipeIndex = index;
                }
            }
            if (recipeIndex) {
                list.splice(recipeIndex, 1);
            }
        }

        function getEmptyMealPlan() {
            return {
                title: undefined,
                mealLists: []
            };
        }

        function calculateMealListTitle(mealPlan, $filter) {
            var mealLists = mealPlan.mealLists;
            var date = new Date();
            if (mealLists && mealLists.length) {
                // if the last item has a date as caption, increment it by one day
                var lastTitle = mealLists[mealLists.length - 1].title;
                if (parseDate(lastTitle)) {
                    date = parseDate(lastTitle);
                    date.setDate(date.getDate() + 1);
                }
            }
            return $filter('date')(date, 'dd.MM.yyyy');
        }

        function parseDate(dateString) {
            var date = dateString.split(".");
            if (date.length == 3) {
                var day = date[0];
                var month = date[1];
                var year = date[2];
                var dateStringISO = year + "-" + month + "-" + day;
                return new Date(dateStringISO);
            }
            return undefined;
        }

    })
;