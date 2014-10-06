(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    router.get('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.query);
        });

    //create event
    router.post('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.body);
        });

    //update event info
    router.put('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {

        });

    router.delete('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.query);
        });

    module.exports = router;
})(module);