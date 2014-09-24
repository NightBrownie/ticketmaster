(function(module, undefined) {
    'use strict';

    module.exports = {
        validateUsername: function(value) {
            return /^[a-z0-9_-]{6,16}$/.test(value);
        },
        validatePassword: function(value) {
            return /^[a-z0-9_-]{6,18}$/.test(value);
        },
        validateEmail: function(value) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);

        }
    };
})(module);
