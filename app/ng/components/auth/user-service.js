(function(){

    angular.module('myApp')
        .service('currUser', currUserService);

    function currUserService(BASEURL, $http, auth) {

        this.register = register;
        this.login = login;
        this.loggedIn = auth.isAuthed;
        this.logout = auth.deleteToken;
        this.getInfo = getInfo


        function register(user, pass) {
            return $http.post(BASEURL + '/signup', {
                username: user,
                password: pass
            });
        }

        function login(user, pass) {
            return $http.post(BASEURL + '/login', {
                username: user,
                password: pass
            });
        }

        function getInfo() {
            return auth.parseJwt(auth.getToken());
        }
    }

})();
