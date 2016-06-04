(function () {

    angular.module('foodGenerator')
        .factory('Supermarket', function (BASEURL, $resource) {
            return $resource(BASEURL + '/supermarkets/:supermarketId', {supermarketId: '@_id'});
        });

})();
