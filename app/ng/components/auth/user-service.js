(function () {

    angular.module('foodGenerator')
        .service('currentUser', currentUserService);

    function currentUserService(BASEURL, $http, $resource, auth) {

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

        function logout() {
            auth.deleteToken();
        }

        function getUser() {
            var token = auth.getToken();
            if (token) {
                var userId = auth.parseJwt(token).user._id;
                var user = $resource(BASEURL + '/users/:userId', {userId: '@_id'})
                    .get({userId: userId}, function () {
                        return user;
                    });
            } else {
                return {};
            }
        }
    }

})();
