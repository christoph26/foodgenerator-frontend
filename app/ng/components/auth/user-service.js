(function () {

    angular.module('foodGenerator')
        .service('currentUser', currentUserService);

    function currentUserService(BASEURL, $http, $resource, auth) {

        this.register = register;
        this.login = login;
        this.loggedIn = auth.isAuthed;
        this.logout = logout;
        this.getUser = getUser;

        ////////////////

        function register(email, pass, firstName, lastName) {
            console.log("Creating a new account for '" + email + "'.");
            var user = {email: email, password: pass, firstName: firstName, lastName: lastName};
            return $http.post(BASEURL + '/signup', user);
        }

        function login(email, pass) {
            console.log("Logging in as user '" + email + "'.");
            var user = {email: email, password: pass};
            return $http.post(BASEURL + '/login', user);
        }

        function logout() {
            auth.deleteToken();
        }

        function getUser() {
            var token = auth.getToken();
            if (token) {
                var userId = auth.parseJwt(token).user._id;
                return $resource(BASEURL + '/users/:userId', {userId: '@_id'}).get({userId: userId});
            } else {
                return {};
            }
        }
    }

})();
