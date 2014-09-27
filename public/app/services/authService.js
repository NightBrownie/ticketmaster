(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', 'authTokenService', '$http', '$rootScope', 'accessLevels', 'endpointListService',
             'customEvents',
        function($q, authTokenService, $http, $rootScope, accessLevels, endpointListService, customEvents) {
            var currentUserInfo;

            var getDefaultUserInfo = function() {
                return {
                    username: '',
                    email: '',
                    role: accessLevels.userRoles.anonymous
                };
            };

            var setUserInfo = function(userInfo) {
                currentUserInfo = userInfo;
            };

            var setDefaultUserInfo = function() {
                setUserInfo(getDefaultUserInfo());
            };

            var getCurrentUserInfo = function() {
                return currentUserInfo
            };

            var loadUserInfo = function() {
                if (isCurrentUserAuthenticated()) {
                    $http(endpointListService.getCurrentUserInfo())
                        .success(function(data, status) {
                            setUserInfo(data);
                        })
                        .error(function(error, status) {
                            setDefaultUserInfo();
                        });
                }
            };

            var isCurrentUserAuthenticated = function() {
                return authTokenService.isCurrentUserAuthenticated();
            };

            var isCurrentUserAuthorized = function(accessLevel) {
                return typeof accessLevel === 'number'
                    && (currentUserInfo.role & accessLevel);
            };

            setDefaultUserInfo();

            $rootScope.$on(customEvents.authEvents.userInfoNotFound, function() {
                loadUserInfo();
            });

            $rootScope.$on(customEvents.authEvents.sessionTimeout, function() {
                setDefaultUserInfo();
            });

            return {
                login: function(userInfo) {
                    var deferred = $q.defer();

                    var endpoint = endpointListService.loginUser(userInfo);
                    $http(endpoint)
                        .success(function(result) {
                            authTokenService.setAuthToken(result.token);
                            setUserInfo(result.userInfo);

                            $rootScope.$broadcast(customEvents.authEvents.loginSuccess);
                            deferred.resolve(result);
                        })
                        .error(function(error) {
                            $rootScope.$broadcast(customEvents.authEvents.loginFailed);
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
                    if (isCurrentUserAuthenticated()) {
                        setDefaultUserInfo();

                        $rootScope.$broadcast(customEvents.authEvents.logoutSuccess);
                    }
                },

                isAuthorized: function(accessLevel) {
                    return isCurrentUserAuthorized(accessLevel);
                },

                getUserInfo: function() {
                    return getCurrentUserInfo();
                }
            };
    }]);
})(window);