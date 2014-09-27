(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .factory('tokenInterceptor', ['$q', '$rootScope', 'customEvents', 'authTokenService',
            function ($q, $rootScope, customEvents, authTokenService) {
                return {
                    //send auth token with each request if it exists for current user
                    request: function (config) {
                        config.headers = config.headers || {};
                        if (authTokenService.getAuthToken()) {
                            config.headers.Authorization = 'Bearer ' + authTokenService.getAuthToken();
                        }
                        return config;
                    },

                    requestError: function(rejection) {
                        return $q.reject(rejection);
                    },

                    response: function (response) {
                        return response || $q.when(response);
                    },

                    /* Handle session timeout, not authenticated and not authorized errors */
                    responseError: function(rejection) {
                        if (rejection != null && (rejection.status === 401 || rejection.status === 403)) {
                            if (rejection.status === 401) {
                                if (authTokenService.getAuthToken() !== undefined) {
                                    $rootScope.$broadcast(customEvents.sessionTimeout);
                                } else {
                                    $rootScope.$broadcast(customEvents.notAuthenticated);
                                }
                            } else if (rejection.status === 403) {
                                $rootScope.$broadcast(customEvents.notAuthorized);
                            }
                        }

                        return $q.reject(rejection);
                    }
                };
            }]);
})(window);