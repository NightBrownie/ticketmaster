(function(window, undefined) {
    'use strict';

    angular.module('constants')
        .constant('validationRegularExpressions', {
                username: /^[A-Za-z0-9_-]{3,16}$/i,
                loginUsername: /(^[A-Za-z0-9_-]{3,16}$)|(^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([A-Za-z\.]{2,6})$)/,
                password: /^[A-Za-z0-9_-]{6,18}$/i,
                email: /^([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})$/i,
                url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                plainText: /^.{1,50}$/
            });
})(window);