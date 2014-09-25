(function(module, undefined) {
    'use strict';

    module.exports = {
        validateUsername: function(value) {
            return /^[A-Za-z0-9_-]{3,16}$/.test(value);
        },
        validatePassword: function(value) {
            return /^[A-Za-z0-9_-]{6,18}$/.test(value);
        },
        validateEmail: function(value) {
            return /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([A-Za-z\.]{2,6})$/.test(value);
        }
    };
})(module);
