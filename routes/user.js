(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var secret = require('../config/secret');
    var jwt = require('jsonwebtoken');

    var async = require('async');

    var authenticationChecker = require('../modules/authentication/authenticationChecker');
    var accessRoleChecker = require('../modules/authorization/accessRoleChecker');
    var accessLevels = require('../modules/authorization/accessLevels');

    var UserDAO = require('../models/user');

    var getLoggedInUserResponse = function(user) {
        var token = jwt.sign(user, secret.jwt.keyPhrase, { expiresInMinutes: secret.jwt.expiresInMins });

        return {
            token: token,
            userInfo: user
        };
    };

    router.post('/user/login', function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            return res.send(400);
        }

        UserDAO.findOne(
            {
                username: username
            },
            {
                _id: 0,
                password: 0,
                __v: 0
            },
            function (err, user) {
                if (err) {
                    console.log(err);
                    return res.send(500);
                } else {
                    if (!user) {
                        UserDAO.findOne(
                            {
                                email: username
                            },
                            {
                                _id: 0,
                                password: 0,
                                __v: 0
                            },
                            function(err, user) {
                                if (err) {
                                    return res.send(500);
                                } else {
                                    if (user) {
                                        user.comparePassword(password, function (isMatch) {
                                            if (!isMatch) {
                                                console.log("Attempt failed to login with email " + user.username);
                                                return res.send(401);
                                            }

                                            return res.json(getLoggedInUserResponse(user));
                                        });
                                    } else {
                                        return res.send(401);
                                    }
                                }
                        });
                    } else {
                        user.comparePassword(password, function (isMatch) {
                            if (!isMatch) {
                                console.log("Attempt failed to login with username " + user.username);
                                return res.send(401);
                            }

                            return res.json(getLoggedInUserResponse(user));
                        });
                    }
                }
            });
    });

    router.post('/user/register', function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        var email = req.body.email || '';

        if (username === '' || password === '' || email === '') {
            return res.send(400);
        }

        var user = new UserDAO({
            username: username,
            password: password,
            email: email
        });

        user.save(function(err, user) {
            if (err || !user) {
                console.log(err);
                return res.send(500);
            }

            return res.send(200);
        });
    });

    router.post('/user/usernameallowed', function(req, res) {
        var username = req.body.value || '';

        if (username === '') {
            return res.send(400);
        }

        UserDAO.findOne({username: username}, function(err, user) {
            if (err) {
                return res.send(500);
            }

            if (!user) {
                return res.send(200);
            } else {
                return res.send(400);
            }
        });
    });

    router.post('/user/emailallowed', function(req, res) {
        var email = req.body.value || '';

        if (email === '') {
            return res.send(400);
        }

        UserDAO.findOne({ email: email }, function(err, user) {
            if (err) {
                return res.send(500);
            }

            if (!user) {
                return res.send(200);
            } else {
                return res.send(400);
            }
        });
    });

    //get userinfo by username
    router.get('/user/currentuserinfo', authenticationChecker(), function(req, res) {
        //load data from token
        var username = req.user && req.user.username || '';

        UserDAO.findOne({
                username: username
            },
            {
                _id: 0,
                password: 0,
                __v: 0
            },
            function(err, user) {
                if (err) {
                    return res.send(500);
                }

                if (!user) {
                    return res.send(400);
                }

                res.json(user);
            });
    });

    //get one user or user list
    router.get('/user',
        authenticationChecker(), accessRoleChecker(accessLevels.accessLevels.administrator),
        function(req, res) {
            if (req.query.skip && req.query.limit) {
                async.parallel([
                    function(cb) { UserDAO.count({}, cb); },
                    function(cb) {
                        UserDAO.find({})
                            .select('__id username')
                            .skip(req.query.skip)
                            .limit(req.query.limit)
                            .exec(cb);
                    }],
                    function(error, data) {
                        if (error) {
                            res.send(500);
                        }

                        res.json({
                            entities: data,
                            entitiesCount: data.length
                        });
                    });
            } else {
                res.send(500);
            }
        });

    module.exports = router;
})(module);