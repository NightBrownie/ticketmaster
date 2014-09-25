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
                },
                checkUsername: function (username) {
                    return {
                        url: '/api/user/usernameallowed',
                        method: 'POST',
                        data: {
                            value: username
                        }
                    }
                },
                checkEmail: function (email) {
                    return {
                        url: '/api/user/emailallowed',
                        method: 'POST',
                        data: {
                            value: email
                        }
                    }
                }
            };
        });
})(window);
