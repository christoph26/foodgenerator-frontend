(function(){

    angular.module('myApp')
        .factory("authInterceptor", authInterceptor);

    function authInterceptor(BASEURL, auth) {

        function req(config){
            // automatically attach Authorization header

            if(config.url.indexOf(BASEURL) === 0 && auth.isAuthed()) {
                var token = auth.getToken();
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;

        }

        function res(res){ console.log(res.data.token);
            // If a token was sent back, save it
            if(res.config.url.indexOf(BASEURL) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
            }

            return res;

        }

        return {
            request: req,
            response: res
        };
    }

})();