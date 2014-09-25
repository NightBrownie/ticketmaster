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

            var loadUserInfo = function() {

            };

            var setDefaultUserInfo = function() {
                currentUserInfo = defaultUserInfo;
            }

        return {
            login: function(userInfo) {
                var deferred = $q.defer();

                var endpoint = endpointListService.loginUser(userInfo);
                $http(endpoint)
                    .success(function(result) {
                        $rootScope.$broadcast(customEvents.authEvents.loginSuccess);
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