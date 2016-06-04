(function () {

    angular.module('foodGenerator')
        .service('supermarkets', supermarketService);

    function supermarketService(BASEURL, $http) {

        this.getAll = getAll;

        ////////////////

        function getAll() {
            return $http.get(BASEURL + '/supermarkets');
        }

    }

})();
