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
            };
        var currentUserInfo = defaultUserInfo;

        var loadUserInfo = function() {

        };

        var setDefaultUserInfo = function() {
            currentUserInfo = defaultUserInfo;
        };

        var setAuthToken = function(token) {
            if ($window.sessionStorage && token) {
                $window.sessionStorage.authToken = token;
            }
        };

        var getAuthToken = function() {
            if ($window.sessionStorage && $window.sessionStorage.authToken) {
                return $window.sessionStorage.authToken;
            }

            return undefined;
        };

        var clearAuthToken = function() {
            if ($window.sessionStorage && $window.sessionStorage.authToken) {
                $window.sessionStorage.authToken = undefined;
            }
        };

        return {
            login: function(userInfo) {
                var deferred = $q.defer();

                var endpoint = endpointListService.loginUser(userInfo);
                $http(endpoint)
                    .success(function(result) {
                        $rootScope.$broadcast(customEvents.authEvents.loginSuccess);

                        setAuthToken(result.token);

                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        $rootScope.$broadcast(customEvents.authEvents.loginSuccess);
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
            register: function(userInfo) {
                var deferred = $q.defer();
                var endpoint = endpointListService.registerUser(userInfo);
                $http(endpoint)
                    .success(function(result) {
                        $rootScope.$broadcast(customEvents.authEvents.registerSuccess);
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        $rootScope.$broadcast(customEvents.authEvents.registerFailed);
                        deferred.reject(error);
                    });

                return deferred.promise;
            },
            logout: function() {

            },

            getToken: function() {
                return getAuthToken();
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