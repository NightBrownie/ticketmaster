(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', '$window', '$http', '$rootScope', 'accessLevels', 'endpointListService',
             'customEvents',
        function($q, $window, $http, $rootScope, accessLevels, endpointListService, customEvents) {
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
                    //TODO: call api method
                }
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
                    delete $window.sessionStorage.authToken;
                }
            };

            var isCurrentUserAuthenticated = function() {
                return getAuthToken() !== undefined;
            };

            var isCurrentUserAuthorized = function(accessLevel) {
                return typeof accessLevel === 'number'
                    && (currentUserInfo.role & accessLevel);
            };

            setDefaultUserInfo();

            $rootScope.$on(customEvents.authEvents.userInfoNotFound, function() {
                loadUserInfo();
            });

            return {
                login: function(userInfo) {
                    var deferred = $q.defer();

                    var endpoint = endpointListService.loginUser(userInfo);
                    $http(endpoint)
                        .success(function(result) {
                            setAuthToken(result.token);
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
                        clearAuthToken();
                        setDefaultUserInfo();

                        $rootScope.$broadcast(customEvents.authEvents.logoutSuccess);
                    }
                },

                getAuthToken: function() {
                    return getAuthToken();
                },

                isAuthenticated: function() {
                    return isCurrentUserAuthenticated();
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