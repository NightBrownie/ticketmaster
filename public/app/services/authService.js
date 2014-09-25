(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', '$window', '$http', '$rootScope', 'accessLevels', 'endpointListService',
             'customEvents',
        function($q, $window, $http, $rootScope, accessLevels, endpointListService, customEvents) {
        //use $window.sessionStorage to store user token

        var defaultUserInfo = {
                username: '',
                email: '',
                role: accessLevels.userRoles.user
            },
            currentUserInfo = defaultUserInfo;

        return {
            login: function(userInfo) {
                var deferred = $q.deferred();

                var endpoint = endpointListService.loginUser(userInfo);
                $http(endpoint)
                    .success(function(result) {
                        $rootScope.$broadcast(customEvents.authEvents.loginSuccess);
                        deferred.resolve(result);
                    })
                    .fail(function(error) {
                        $rootScope.$broadcast(customEvents.authEvents.loginSuccess);
                        deferred.reject(error);
                    });

                return deferred;
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
            },
            setDefaultUserInfo: function() {
                currentUserInfo = defaultUserInfo;
            }
        };
    }]);
})(window);