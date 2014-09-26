(function(module, undefined) {
    var mongoose = require('mongoose');
    var mongoConfig = require('./mongoConfig');

    mongoose.connect(mongoConfig.mongoConnectionString, function(err) {
        console.log('Mongo connection wasn\'t established, exiting application');
        process.exit(1);
    });

    module.exports = mongoose;
})(module);