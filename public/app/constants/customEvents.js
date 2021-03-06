(function(window, undefined) {
    'use strict';

    angular.module('constants')
        .constant('customEvents', {
           authEvents: {
               loginSuccess: 'auth-login-success',
               loginFailed: 'auth-login-failed',
               registerSuccess: 'auth-register-success',
               registerFailed: 'auth-register-failed',
               logoutSuccess: 'auth-logout-success',
               sessionTimeout: 'auth-session-timeout',
               notAuthenticated: 'auth-not-authenticated',
               notAuthorized: 'auth-not-authorized',
               userInfoNotFound: 'auth-user-info-not-found',
               userInfoUpdated: 'auth-user-info-updated'
           }
        });
})(window);