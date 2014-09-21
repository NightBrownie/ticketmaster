(function(module, undefined) {
    'use strict';

    module.exports = {
        mongoConnectionString: process.env.MONGOHQ ||
            'mongodb://admin:admin@loalhost:27017/ticketmaster'
    };
})(module);