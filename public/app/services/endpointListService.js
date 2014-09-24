(function(window, undefined) {
    'use strict';

    angular.module('services')
        .factory('endpointListService', function() {
            return {
                loginUser: function (data) {
                    return {
                        url: '/api/user/login',
                        method: 'POST',
                        data: data
                    };
                },
                registerUser: function (data) {
                    return {
                        url: '/api/user/register',
                        method: 'POST',
                        data: data
                    };
                }
            };
        });
})(window);
