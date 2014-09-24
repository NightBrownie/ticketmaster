(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var jwt = require('jsonwebtoken');
    var secret = require('../config/secret');

    var UserDAO = require('../models/user');

    router.post('/user/login', function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            return res.send(400);
        }

        UserDAO.findOne({username: username}, {_id: 0}, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(500);
            } else {
                if (!user) {
                    UserDAO.findOne({email: username}, {_id: 0}, function(err, user) {
                        if (err) {
                            return res.send(500);
                        } else {
                            if (user) {
                                user.comparePassword(password, function (isMatch) {
                                    if (!isMatch) {
                                        console.log("Attempt failed to login with email " + user.username);
                                        return res.send(401);
                                    }

                                    var token = jwt.sign(user, secret.jwt.keyPhrase, { expiresInMinutes: 60 });

                                    return res.json({token: token});
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

                        var token = jwt.sign(user, secret.jwt.keyPhrase, { expiresInMinutes: 60 });

                        return res.json({token: token});
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
        var username = req.body.username || '';

        if (username === '') {
            return res.send(400);
        }

        UserDAO.findOne({username: username}, function(err, user) {
            if (err) {
                return res.send(500);
            }

            if(!user) {
                return res.send({ result: true });
            } else {
                return res.send({ result: false });
            }
        });
    });

    router.post('/user/emailallowed', function(req, res) {
        var email = req.body.email || '';

        if (email === '') {
            return res.send(400);
        }

        UserDAO.findOne({ email: email }, function(err, user) {
            if (err) {
                return res.send(500);
            }

            if (!user) {
                return res.send({ result: true });
            } else {
                return res.send({ result: false });
            }
        });
    });

    router.post('/user/getUserInfo', function(req, res) {

    });

    module.exports = router;
})(module);