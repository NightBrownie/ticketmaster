(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    router.get('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.query);
        });

    //create film
    router.post('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.body);
        });

    //update film info
    router.put('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {

        });

    router.delete('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.query);
        });

    module.exports = router;
})(module);