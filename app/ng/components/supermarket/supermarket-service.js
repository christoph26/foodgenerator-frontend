(function () {

    angular.module('foodGenerator')
        .service('currentUser', supermarketService);

    function supermarketService(BASEURL, $http) {

        this.getAll = getAll;

        ////////////////

        function getAll() {
            return $http.get(BASEURL + '/supermarkets');
        }

    }

})();
