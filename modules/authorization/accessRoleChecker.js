(function(module, undefined) {
    'use strict';

    var accessLevels = require('./accessLevels');

    module.exports = function(accessLevel) {
        return function (req, res, next) {
            if (accessLevels.hasAccessLevel(req.user.role, accessLevel)) {
                return next();
            }

            res.send(403);
        };
    };
})(module);