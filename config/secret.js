(function(module, undefined) {
    'use strict';

    module.exports = {
        user: {
            SALT_WORK_FACTOR: 10
        },
        session: {
            keyPhrase: 'test key phrase'
        },
        jwt: {
            keyPhrase: 'test key phrase',
            expiresInMins: 60
        }
    };
})(module);