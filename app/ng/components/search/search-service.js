(function () {

    angular.module('foodGenerator')
        .service('SearchService', searchService);

    function searchService(BASEURL, $http) {

        var searchTerm = "";
        var self = this;

        this.searchTerm = searchTerm;
        this.setSearchTerm = setSearchTerm;
        this.performRecipeSearch = performRecipeSearch;

        ////////////////

        function setSearchTerm(searchTerm) {
            self.searchTerm = searchTerm;
            console.log("search term updated: " + self.searchTerm)
        }

        function performRecipeSearch() {
            if (searchTerm == undefined || searchTerm == "") {
                return [];
            }
            var searchDTO = {
                searchText: searchTerm,
                searchDirectRecipes: true      //TODO update according to expansion state of search bar
            };
            $http.post(BASEURL + '/recipesearch', searchDTO).then(function (response) {
                console.log(response);
                debugger;
            }, function (error) {
                console.log(error);
                debugger;
            });
        }

    }

})();
