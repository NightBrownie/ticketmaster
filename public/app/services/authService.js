(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', '$window', 'accessLevels', function($q, $window, accessLevels) {
        //use $window.sessionStorage to store user token

        var defaultUserInfo = {

        },
            currentUserInfo = defaultUsreInfo;

        return {
            login: function(username, password) {

            },
            register: function(userInfo) {

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