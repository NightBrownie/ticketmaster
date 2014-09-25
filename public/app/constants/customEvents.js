(function(window, undefined) {
    'use strict';

    angular.module('constants')
        .constant('customEvents', {
           authEvents: {
               loginSuccess: 'auth-login-success',
               loginFailed: 'auth-login-failed',
               logoutSuccess: 'auth-logout-success',
               sessionTimeout: 'auth-session-timeout',
               notAuthenticated: 'auth-not-authenticated',
               notAuthorized: 'auth-not-authorized'
           }
        });
})(window);