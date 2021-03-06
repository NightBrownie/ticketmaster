(function(module, undefined) {
    'use strict';

    var userRoles = {
        anonymous: 1, //001
        user: 2, //010
        administrator: 4 //100
    };

    module.exports = {
        userRoles: userRoles,

        accessLevels: {
            anonymous: userRoles.anonymous, //001

            public: userRoles.anonymous | userRoles.user | userRoles.administrator, //111
            user: userRoles.user, //010
            administrator: userRoles.administrator //100
        },

        hasAccessLevel: function(role, accessLevel) {
            return typeof accessLevel === 'number' && typeof role === 'number'
                && (role & accessLevel);
        }
    };
})(module);
