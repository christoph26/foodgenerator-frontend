(function(){

    angular.module('foodGenerator')
        .factory("authInterceptor", authInterceptor);

    function authInterceptor(BASEURL, auth) {

        function req(config){
            // automatically attach Authorization header
            if(config.url.indexOf(BASEURL) === 0 && auth.isAuthed()) {
                var token = auth.getToken();
                console.log("Adding an auth token: " + token);
                config.headers.Authorization = 'JWT ' + token;
            }

            return config;

        }

        function res(res){

            // If a token was sent back, save it
            if(res && res.config.url.indexOf(BASEURL) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
                console.log("Received an auth token: " + res.data.token);
            }

            return res;

        }

        return {
            request: req,
            response: res
        };
    }

})();