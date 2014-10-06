(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var async = require('async');

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    var FilmDAO = require('../models/film');

    var CommentDAO = require('../models/comment');
    var EventDAO = require('../models/event');
    var LikeDAO = require('../models/like');

    router.get('/film',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id || (req.query.limit !== undefined && req.query.skip !== undefined)) {
                if (req.query.id) {
                    FilmDAO.findById(req.query.id,
                        {
                            __v: 0
                        },
                        function(error, film) {
                            if (error) {
                                res.send(500);
                            }

                            res.json(film);
                        });
                } else {
                    async.parallel([
                            function(cb) { FilmDAO.count({}, cb); },
                            function(cb) {
                                FilmDAO.find({})
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

    //create film
    router.post('/film',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            var film = new FilmDAO(req.body.film);

            if (film) {
                film.save(function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    res.send(200);
                });
            } else {
                return res.send(400);
            }
        });

    //update film info
    router.put('/film',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            var film = new FilmDAO(req.body.film);

            if (film) {
                film.update(function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    res.send(200);
                });
            } else {
                return res.send(400);
            }
        });

    router.delete('/film',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.id !== undefined) {
                async.parallel([
                    //remove dependencies
                    function(cb) {
                        CommentDAO.find({filmId: req.query.id}).remove().exec(cb);
                    },
                    function(cb) {
                        LikeDAO.find({filmId: req.query.id}).remove().exec(cb);
                    },
                    function(cb) {
                        EventDAO.find({filmId: req.query.id}).remove().exec(cb);
                    }
                ], function(error) {
                    if (error) {
                        return res.send(500);
                    }

                    FilmDAO.findById(req.query.id)
                        .remove()
                        .exec(function(error, data) {
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
