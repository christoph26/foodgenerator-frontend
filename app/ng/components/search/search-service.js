(function () {

    angular.module('foodGenerator')
        .service('SearchService', searchService);

    function searchService(BASEURL, $http) {

        var searchTermCache = "";

        this.getSearchTerm = getSearchTerm;
        this.setSearchTerm = setSearchTerm;
        this.performRecipeSearch = performRecipeSearch;

        ////////////////

        function setSearchTerm(searchTerm) {
            searchTermCache = searchTerm;
            console.log("search term updated: " + searchTermCache)
        }

        function getSearchTerm() {
            return searchTermCache;
        }

        function performRecipeSearch() {
            if (searchTermCache == undefined || searchTermCache == "") {
                return [];
            }
            var searchDTO = {
                searchText: searchTermCache,
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
