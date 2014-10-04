(function(module, undefined) {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var authenticationChecker = require('../modules/authentication/authenticationChecker');

    router.get('/definitions', authenticationChecker(),  function(req, res) {
        res.json({
            hoursSelectOptions: (function() {
                var array = [];

                for (var i = 0; i < 24; i++) {
                    array.push(i);
                }

                return array;
            })(),
            minutesSelectOptions: (function() {
                var array = [];

                for (var i = 0; i < 60; i++) {
                    array.push(i);
                }

                return array;
            })(),
            secondsSelectOptions: (function() {
                var array = [];

                for (var i = 0; i < 60; i++) {
                    array.push(i);
                }

                return array;
            })(),
            filmProductionYearsSelectOptions: (function() {
                var currentYear = new Date().getFullYear();

                var array = [];

                for (var i = currentYear - 100; i < currentYear + 10; i++) {
                    array.push(i);
                }

                return array;
            })(),
            ageRestrictionsSelectOptions: (function() {
                var array = [];

                for (var i = 3; i < 22; i++) {
                    array.push(i);
                }

                return array;
            })(),
            countriesSelectOptions: [
                'Belarus',
                'USA',
                'UK'
            ]
        });
    });

    module.exports = router;
})(module);