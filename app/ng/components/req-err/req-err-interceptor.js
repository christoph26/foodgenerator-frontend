(function () {

    angular.module('foodGenerator')
        .factory("reqErrInterceptor", reqErrInterceptor);

    function reqErrInterceptor(BASEURL, $injector, $q) {


        return {
            responseError: responseError
        };

        //////////////////////////////

        function responseError(rej) {
            if ([-1, 404].indexOf(rej.status) !== -1) {
                showAlert({title: 'Connection Error', msg: 'Could not reach the server. Try again later'});
            } else if ([-1, 401].indexOf(rej.status) !== -1) {
                //do nothing, login failed
            } else {
                showAlert({title: 'Unknown Error', msg: 'Unknown error. Try again later'});
            }

            return $q.reject(rej);
        }

        function showAlert(opt) {
            // enable debug error logging here
            //          vvv
            
            // alert(opt.title + ": " + opt.msg);
        }

    }

})();