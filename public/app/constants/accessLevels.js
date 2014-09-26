(function() {
    'use strict';

    var userRoles = {
        anonymous: 1, //001
        user: 2, //010
        administrator: 4 //100
    };

    angular.module('constants', [])
    .constant('accessLevels', {
        userRoles: userRoles,

        accessLevels: {
            anonymous: userRoles.anonymous, //001

            public: userRoles.anonymous | userRoles.user | userRoles.administrator, //111
            authenticated: userRoles.user | userRoles.administrator,
            user: userRoles.user, //010
            administrator: userRoles.administrator //100
        }
    });
})(window);