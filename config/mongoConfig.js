(function(module, undefined) {
    'use strict';

    module.exports = {
        mongoConnectionString: process.env.MONGOURL ||
            'mongodb://admin:admin@loalhost:27017/ticketmaster'
    };
})(module);