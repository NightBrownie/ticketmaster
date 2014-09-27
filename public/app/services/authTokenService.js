(function(window, undefined) {
    'use strict';

    angular.module('services')
        .factory('authTokenService', ['$window', '$rootScope', 'customEvents',
            function($window, $rootScope, customEvents) {
                var setAuthToken = function(token) {
                    if ($window.localStorage && token) {
                        $window.localStorage.authToken = token;
                    }
                };

                var getAuthToken = function() {
                    if ($window.localStorage && $window.localStorage.authToken) {
                        return $window.localStorage.authToken;
                    }

                    return undefined;
                };

                var clearAuthToken = function() {
                    if ($window.localStorage && $window.localStorage.authToken) {
                        delete $window.localStorage.authToken;
                    }
                };

                $rootScope.$on(customEvents.authEvents.logoutSuccess, function() {
                    clearAuthToken();
                });

                return {
                    setAuthToken: function(token) {
                        setAuthToken(token);
                    },

                    getAuthToken: function() {
                        return getAuthToken();
                    },

                    clearAuthToken: function() {
                        clearAuthToken();
                    },

                    isCurrentUserAuthenticated: function() {
                        return getAuthToken() !== undefined;
                    }
                };
            }]);
})(window);