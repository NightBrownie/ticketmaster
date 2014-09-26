(function(module, undefined) {
    var mongoose = require('mongoose');
    var mongoConfig = require('./mongoConfig');

    try {
        mongoose.connect(mongoConfig.mongoConnectionString);
    } catch(err) {
        console.log('Mongo connection wasn\'t established, exiting application');
        process.exit(1);
    }

    module.exports = mongoose;
})(module);