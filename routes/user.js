(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var userDAO = require('../models/user');

    router.post('/user/login', function(req, res) {
        console.log('login');

        userDAO.find({}, function(err, data) {
            res.end('queried');
        });
    });

    router.post('/user/register', function(req, res) {

    });

    router.post('/user/getUserInfo', function(req, res) {

    });

    module.exports = router;
})(module);