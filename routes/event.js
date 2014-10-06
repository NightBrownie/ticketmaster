(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var async = require('async');

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    var EventDAO = require('../models/event');
    var TicketDAO = require('../models/ticket');

    router.get('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            console.log(req.query);
            res.send(200);
        });

    //create event
    router.post('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id || (req.query.limit !== undefined && req.query.skip !== undefined)) {
                if (req.query.id) {
                    EventDAO.findById(req.query.id,
                        {
                            __v: 0
                        },
                        function(error, event) {
                            if (error) {
                                res.send(500);
                            }

                            //TODO: add loading of dependencies
                            res.json(event);
                        });
                } else {
                    res.send(500);
                }
            } else {
                return res.send(400);
            }
        });

    //update film info
    router.put('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            res.send(200);
        });

    router.delete('/event',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id !== undefined) {
                TicketDAO.find({eventId: req.query.id}).remove().exec(function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    EventDAO.findById(req.query.id)
                        .remove()
                        .exec(function(error) {
                            if (error) {
                                res.send(500);
                            }

                            res.send(200);
                        });
                });
            } else {
                res.send(500);
            }
        });

    module.exports = router;
})(module);