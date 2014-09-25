(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', '$window', 'accessLevels', 'endpointListService',
        function($q, $window, accessLevels, endpointListService) {
        //use $window.sessionStorage to store user token

        var defaultUserInfo = {

        },
            currentUserInfo = defaultUserInfo;

        return {
            login: function(username, password) {
                var endpoint = endpointListService.loginUser(
                    {
                        username: username,
                        password: password
                    });
                return $http(endpoint);
            },
            register: function(userInfo) {
                var endpoint = endpointListService.registerUser(userInfo);
                return $http(endpoint);
            },
            logout: function() {

            },

            getToken: function() {

            },
            clearToken: function() {

            },

            isAuthenticated: function() {
                return false;
            },
            isAuthorized: function(accessLevel) {
                return false;
            },

            getUserInfo: function() {
                return currentUserInfo;
            }
        };
    }]);
})(window);