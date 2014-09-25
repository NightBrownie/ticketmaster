(function(window, undefined) {
    'use strict';

    angular.module('constants')
        .factory('validationRegularExpressions', {
                username: /^[a-z0-9_-]{6,16}$/,
                password: /^[a-z0-9_-]{6,18}$/,
                email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            });
})(window);