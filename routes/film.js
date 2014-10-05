(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    module.exports = router;
})(module);
