(function () {

    angular.module('foodGenerator')
        .service('currentUser', currentUserService);

    function currentUserService(BASEURL, $http, auth) {

        this.register = register;
        this.login = login;
        this.loggedIn = auth.isAuthed;
        this.logout = auth.deleteToken;
        this.getUser = getUser;

        ////////////////

        function register(email, pass, firstName, lastName) {
            return $http.post(BASEURL + '/signup', {
                email: email,
                password: pass,
                firstName: firstName,
                lastName: lastName
            });
        }

        function login(email, pass) {
            return $http.post(BASEURL + '/login', {
                email: email,
                password: pass
            });
        }

        function getUser() {
            var token = auth.getToken();
            return token ? auth.parseJwt(token).user : {};
        }
    }

})();
