(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var async = require('async');

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    var TheaterDAO = require('../models/theater');
    var EventDAO = require('../models/event');

    router.get('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id || (req.query.limit !== undefined && req.query.skip !== undefined)) {
                if (req.query.id) {
                    TheaterDAO.findById(req.query.id,
                        {
                            __v: 0
                        },
                        function(error, theater) {
                            if (error) {
                                res.send(500);
                            }

                            res.json(theater);
                        });
                } else {
                    async.parallel([
                            function(cb) { TheaterDAO.count({}, cb); },
                            function(cb) {
                                TheaterDAO.find({})
                                    .select('_id name')
                                    .skip(req.query.skip)
                                    .limit(req.query.limit)
                                    .exec(cb);
                            }],
                        function(error, data) {
                            if (error) {
                                res.send(500);
                            }

                            res.json({
                                entities: data[1],
                                entitiesCount: data[0]
                            });
                        });
                }
            } else {
                return res.send(400);
            }
        });

    //create theater
    router.post('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            var theater = new TheaterDAO(req.body.theater);

            if (theater) {
                theater.save(function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    res.send(200);
                });
            } else {
                return res.send(400);
            }
        });

    //update theater info
    router.put('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            var theaterRequest = req.body.theater;

            if (theaterRequest && theaterRequest._id) {
                var condition = { _id: theaterRequest._id };
                delete theaterRequest._id;

                var theater = new TheaterDAO(theaterRequest);

                TheaterDAO.findOneAndUpdate(condition, theaterRequest, function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    res.send(200);
                });
            } else {
                return res.send(400);
            }
        });

    router.delete('/theater',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id !== undefined) {
                EventDAO.find({theaterId: req.query.id}).remove().exec(function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    TheaterDAO.findById(req.query.id)
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