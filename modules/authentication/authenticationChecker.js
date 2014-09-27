(function(module, undefined) {
    'use strict';

    var secretConfig = require('../../config/secret');
    var expressJwt = require('express-jwt');

    module.exports = function() {
        return expressJwt({ secret: secretConfig.jwt.keyPhrase });
    }
})(module);