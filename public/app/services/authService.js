(function(window, undefined) {
	'use strict';

	angular.module('services')
	.factory('authService', ['$q', 'authTokenService', '$http', '$rootScope', 'accessLevels', 'endpointListService',
             'customEvents',
        function($q, authTokenService, $http, $rootScope, accessLevels, endpointListService, customEvents) {
            var currentUserInfo;
            var userInfoPromise;
            var authorizationPromise;

            var getDefaultUserInfo = function() {
                return {
                    username: '',
                    email: '',
                    role: accessLevels.userRoles.anonymous
                };
            };

            var setUserInfo = function(userInfo) {
                currentUserInfo = userInfo;

                //set Username to root scope
                $rootScope.currentUserInfo = currentUserInfo;
            };

            var setDefaultUserInfo = function() {
                setUserInfo(getDefaultUserInfo());
            };

            var getCurrentUserInfo = function() {
                if (userInfoPromise) {
                    return userInfoPromise;
                }

                var deferred = $q.defer();

                if (isCurrentUserAuthenticated()) {
                    //check if user info is already loaded
                    if (isCurrentUserAuthorized(accessLevels.accessLevel.authenticated)) {
                        deferred.resolve(currentUserInfo);
                    } else {
                        $http(endpointListService.getCurrentUserInfo())
                            .success(function (data, status) {
                                setUserInfo(data);
                                deferred.resolve(currentUserInfo);
                                userInfoPromise = null;
                            })
                            .error(function (error, status) {
                                //remove token because of failure during getting user info process
                                authTokenService.clearAuthToken();
                                setDefaultUserInfo();

                                deferred.resolve(currentUserInfo);
                                userInfoPromise = null;
                            });

                        userInfoPromise = deferred.promise
                    }
                } else {
                    deferred.resolve(currentUserInfo);
                }

                return deferred.promise;
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
                getCurrentUserInfo();
            });

            $rootScope.$on(customEvents.authEvents.sessionTimeout, function() {
                authTokenService.clearAuthToken();
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
                        authTokenService.clearAuthToken();

                        $rootScope.$broadcast(customEvents.authEvents.logoutSuccess);
                    }
                },

                checkAuthorization: function(accessLevel) {
                    if (authorizationPromise) {
                        return authorizationPromise;
                    }

                    var deferred = $q.defer();

                    getCurrentUserInfo.then(function(userInfo){
                        deferred.resolve(isCurrentUserAuthorized(accessLevel));
                        authorizationPromise = null;
                    },function(error) {
                        deferred.reject(error);
                        authorizationPromise = null;
                    });

                    return authorizationPromise = deferred.promise;
                },

                getUserInfo: function() {
                    return getCurrentUserInfo();
                }
            };
    }]);
})(window);